import Leaderboard from '../models/Leaderboard.js';

class LeaderboardService {
  async updateStats(nickname, result) {
    let entry = await Leaderboard.findOne({ nickname });

    if (!entry) {
      entry = new Leaderboard({ nickname });
    }

    entry.totalGames += 1;

    if (result === 'win') {
      entry.wins += 1;
      entry.rating += 25;
    } else if (result === 'loss') {
      entry.losses += 1;
      entry.rating = Math.max(0, entry.rating - 15);
    } else if (result === 'draw') {
      entry.draws += 1;
      entry.rating += 5;
    }

    entry.winRate = entry.totalGames > 0 
      ? (entry.wins / entry.totalGames) * 100 
      : 0;

    await entry.save();
    return entry;
  }

  async getTopPlayers(limit = 10) {
    return await Leaderboard.find()
      .sort({ rating: -1, wins: -1 })
      .limit(limit);
  }

  async getPlayerStats(nickname) {
    return await Leaderboard.findOne({ nickname });
  }

  async getAllPlayers() {
    return await Leaderboard.find().sort({ rating: -1 });
  }
}

export default new LeaderboardService();