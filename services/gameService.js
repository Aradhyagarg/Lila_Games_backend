import Game from '../models/Game.js';
import { v4 as uuidv4 } from 'uuid';

class GameService {
  createGame(player1, player2) {
    const gameId = uuidv4();
    const game = new Game({
      gameId,
      players: [
        {
          userId: player1.userId,
          nickname: player1.nickname,
          symbol: 'X',
          socketId: player1.socketId
        },
        {
          userId: player2.userId,
          nickname: player2.nickname,
          symbol: 'O',
          socketId: player2.socketId
        }
      ],
      status: 'active',
      startedAt: new Date()
    });
    return game.save();
  }

  async makeMove(gameId, socketId, position) {
    const game = await Game.findOne({ gameId, status: 'active' });
    
    if (!game) {
      throw new Error('Game not found or already finished');
    }

    const player = game.players.find(p => p.socketId === socketId);
    if (!player) {
      throw new Error('Player not in this game');
    }

    if (game.currentTurn !== player.symbol) {
      throw new Error('Not your turn');
    }

    if (game.board[position] !== '') {
      throw new Error('Position already taken');
    }

    game.board[position] = player.symbol;
    game.moves.push({
      player: player.symbol,
      position,
      timestamp: new Date()
    });

    const winner = this.checkWinner(game.board);
    const isDraw = !winner && game.board.every(cell => cell !== '');

    if (winner) {
      game.status = 'finished';
      game.winner = winner;
      game.winnerNickname = game.players.find(p => p.symbol === winner).nickname;
      game.finishedAt = new Date();
    } else if (isDraw) {
      game.status = 'finished';
      game.isDraw = true;
      game.finishedAt = new Date();
    } else {
      game.currentTurn = game.currentTurn === 'X' ? 'O' : 'X';
    }

    await game.save();
    return game;
  }

  checkWinner(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  async getGame(gameId) {
    return await Game.findOne({ gameId });
  }

  async getActiveGames() {
    return await Game.find({ status: 'active' });
  }

  async getGameHistory(limit = 10) {
    return await Game.find({ status: 'finished' })
      .sort({ finishedAt: -1 })
      .limit(limit);
  }
}

export default new GameService();