import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  draws: {
    type: Number,
    default: 0
  },
  totalGames: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 1000
  },
  winRate: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

leaderboardSchema.index({ rating: -1 });
leaderboardSchema.index({ wins: -1 });

export default mongoose.model('Leaderboard', leaderboardSchema);