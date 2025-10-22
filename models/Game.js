import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  players: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    nickname: String,
    symbol: String,
    socketId: String
  }],
  board: {
    type: [String],
    default: ['', '', '', '', '', '', '', '', '']
  },
  currentTurn: {
    type: String,
    default: 'X'
  },
  status: {
    type: String,
    enum: ['waiting', 'active', 'finished'],
    default: 'waiting'
  },
  winner: {
    type: String,
    default: null
  },
  winnerNickname: {
    type: String,
    default: null
  },
  isDraw: {
    type: Boolean,
    default: false
  },
  moves: [{
    player: String,
    position: Number,
    timestamp: Date
  }],
  startedAt: Date,
  finishedAt: Date
}, {
  timestamps: true
});

gameSchema.index({ gameId: 1 });
gameSchema.index({ status: 1 });

export default mongoose.model('Game', gameSchema);