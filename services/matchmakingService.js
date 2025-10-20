class MatchmakingService {
    constructor() {
      this.queue = [];
    }
  
    addToQueue(player) {
      const existingIndex = this.queue.findIndex(p => p.socketId === player.socketId);
      if (existingIndex !== -1) {
        this.queue.splice(existingIndex, 1);
      }
      
      this.queue.push({
        ...player,
        joinedAt: Date.now()
      });
    }
  
    removeFromQueue(socketId) {
      const index = this.queue.findIndex(p => p.socketId === socketId);
      if (index !== -1) {
        this.queue.splice(index, 1);
        return true;
      }
      return false;
    }
  
    findMatch() {
      if (this.queue.length < 2) {
        return null;
      }
  
      const player1 = this.queue.shift();
      const player2 = this.queue.shift();
  
      return { player1, player2 };
    }
  
    getQueueLength() {
      return this.queue.length;
    }
  
    isInQueue(socketId) {
      return this.queue.some(p => p.socketId === socketId);
    }
  
    clearQueue() {
      this.queue = [];
    }
  }
  
  export default new MatchmakingService();