import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  socketId: {
    type: String,
    required: true
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
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.index({ socketId: 1 });
userSchema.index({ rating: -1 });

export default mongoose.model('User', userSchema);