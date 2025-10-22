# TicTacToe Multiplayer Game

A real-time, socket-based multiplayer TicTacToe game where two players can battle live, track their results, and appear on a global leaderboard.

---

## Live Demo

- **Frontend:** [https://lila-games-frontend.vercel.app](https://lila-games-frontend.vercel.app)  
- **Backend:** [https://lila-games-backend-1.onrender.com](https://lila-games-backend-1.onrender.com)

---

## Tech Stack

### Frontend
- React.js  
- CSS3  
- Socket.io-client  

### Backend
- Node.js  
- Express.js  
- Socket.io  

### Hosting
- Vercel (Frontend)  
- Render (Backend)

---

## Project Overview

This project is a **real-time multiplayer TicTacToe game** that allows two players to connect instantly and play against each other live.  
The game features matchmaking, live updates via WebSockets, and a leaderboard that tracks wins, losses, and draws.

---

## Players Can

- Enter a nickname and join matchmaking  
- Get paired with a random opponent  
- Play live TicTacToe in real-time  
- See **turn indicators** (My Turn / Opponent Turn)  
- Instantly view **win/loss/draw results**  
- Access the **leaderboard** showing player stats  

---

## Features Implemented

### Frontend
- Responsive, clean, and minimal UI  
- Real-time updates powered by **Socket.io-client**  
- Smooth board animations and hover effects  
- Dynamic **turn indicators**  
- Matchmaking screen with waiting player logic  
- Leaderboard overlay displaying global rankings  
- Nickname validation before joining a match  

### Backend
- **Socket.io-based real-time communication**  
- Dynamic **room creation** for each match  
- Player **matchmaking algorithm**  
- Game state tracking (turns, moves, winner)  
- Leaderboard update logic after every match  
- Express.js API setup for scalability  

---

## How It Works

### Nickname Entry
- Player enters their nickname  
- Stored locally for the session  

### Matchmaking
- Player joins the matchmaking pool  
- Server pairs them automatically with another waiting player  

### Gameplay
- Players take turns in real time via socket events  
- Both boards update instantly  
- Server validates moves and detects winners/draws  
- Turn indicators reflect current player turn  

### Leaderboard
- Player stats (Win/Loss/Draw) get updated after each game  
- Leaderboard fetched dynamically from backend  

---

## How to Run Locally

### Backend Setup
cd server
npm install
PORT=8000
npm start

### Frontend Setup
cd client
npm install
REACT_APP_API_URL=http://localhost:8000
npm start

---

### Future Enhancements
In-game chat system
Custom room codes to play with friends
AI Bot Mode for solo play
Sound effects & move animations
Account-based leaderboard using MongoDB

### GitHub Repositories
Frontend: https://github.com/Aradhyagarg/Lila_Games_frontend
Backend: https://github.com/Aradhyagarg/Lila_Games_backend
