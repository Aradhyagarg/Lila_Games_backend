import gameService from '../../services/gameService.js';
import matchmakingService from '../../services/matchmakingService.js';
import leaderboardService from '../../services/leaderboardService.js';
import User from '../../models/Users.js';

const activeGames = new Map();
const activePlayers = new Map();

export default function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on('register', async (data) => {
      try {
        const { nickname } = data;

        let user = await User.findOne({ socketId: socket.id });
        if (!user) {
          user = new User({ nickname, socketId: socket.id });
          await user.save();
        } else {
          user.nickname = nickname;
          user.lastActive = new Date();
          await user.save();
        }

        activePlayers.set(socket.id, {
          userId: user._id,
          nickname,
          socketId: socket.id,
        });

        socket.emit('registered', {
          userId: user._id,
          nickname: user.nickname,
        });

        console.log(`Player registered: ${nickname} (${socket.id})`);
      } catch (error) {
        console.error('Register error:', error);
        socket.emit('error', { message: 'Registration failed' });
      }
    });

    socket.on('findMatch', async () => {
      try {
        const player = activePlayers.get(socket.id);
        if (!player) {
          socket.emit('error', { message: 'Please register first' });
          return;
        }

        matchmakingService.addToQueue(player);
        socket.emit('searching', { queueLength: matchmakingService.getQueueLength() });
        console.log(`${player.nickname} searching for match. Queue: ${matchmakingService.getQueueLength()}`);

        const match = matchmakingService.findMatch();
        if (match) {
          const { player1, player2 } = match;

          const game = await gameService.createGame(player1, player2);
          activeGames.set(game.gameId, game);

          const player1Socket = io.sockets.sockets.get(player1.socketId);
          const player2Socket = io.sockets.sockets.get(player2.socketId);

          if (player1Socket) {
            player1Socket.join(game.gameId);
            player1Socket.emit('matchFound', {
              gameId: game.gameId,
              opponent: player2.nickname,
              yourSymbol: 'X',
              currentTurn: game.currentTurn,
            });
          }

          if (player2Socket) {
            player2Socket.join(game.gameId);
            player2Socket.emit('matchFound', {
              gameId: game.gameId,
              opponent: player1.nickname,
              yourSymbol: 'O',
              currentTurn: game.currentTurn,
            });
          }

          io.to(game.gameId).emit('gameStart', {
            gameId: game.gameId,
            players: game.players,
            board: game.board,
            currentTurn: game.currentTurn,
          });

          console.log(`Match created: ${player1.nickname} vs ${player2.nickname}`);
        }
      } catch (error) {
        console.error('Find match error:', error);
        socket.emit('error', { message: 'Matchmaking failed' });
      }
    });

    socket.on('cancelSearch', () => {
      const removed = matchmakingService.removeFromQueue(socket.id);
      if (removed) {
        socket.emit('searchCancelled');
        console.log(`Player cancelled search: ${socket.id}`);
      }
    });

    socket.on('makeMove', async (data) => {
      try {
        const { gameId, position } = data;

        const game = await gameService.makeMove(gameId, socket.id, position);

        io.to(gameId).emit('moveMade', {
          board: game.board,
          currentTurn: game.currentTurn,
          position,
          player: game.players.find((p) => p.socketId === socket.id).symbol,
        });

        if (game.status === 'finished') {
          const player1 = game.players[0];
          const player2 = game.players[1];

          let result1, result2;
          if (game.isDraw) {
            result1 = result2 = 'draw';
          } else if (game.winner === player1.symbol) {
            result1 = 'win';
            result2 = 'loss';
          } else {
            result1 = 'loss';
            result2 = 'win';
          }

          await Promise.all([
            leaderboardService.updateStats(player1.nickname, result1),
            leaderboardService.updateStats(player2.nickname, result2),
          ]);

          io.to(gameId).emit('gameOver', {
            winner: game.winner,
            winnerNickname: game.winnerNickname,
            isDraw: game.isDraw,
            board: game.board,
          });

          activeGames.delete(gameId);
          console.log(`Game finished: ${gameId}`);
        }
      } catch (error) {
        console.error('Make move error:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('getLeaderboard', async () => {
      try {
        const leaderboard = await leaderboardService.getTopPlayers(10);
        socket.emit('leaderboard', leaderboard);
      } catch (error) {
        console.error('Get leaderboard error:', error);
        socket.emit('error', { message: 'Failed to fetch leaderboard' });
      }
    });

    socket.on('disconnect', () => {
      matchmakingService.removeFromQueue(socket.id);
      activePlayers.delete(socket.id);
      console.log(`Player disconnected: ${socket.id}`);
    });
  });
}
