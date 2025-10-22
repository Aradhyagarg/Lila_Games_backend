TicTacToe Multiplayer Game

Live Demo
Frontend: https://lila-games-frontend.vercel.app
Backend: https://lila-games-backend-1.onrender.com

Tech Stack
Frontend
React.js
CSS3
Socket.io-client

Backend
Node.js
Express.js
Socket.io

Hosting
Vercel (Frontend)
Render (Backend)

Project Overview
This is a real-time multiplayer TicTacToe game where two players can join a match, play live, and view leaderboards.

Players can
Enter nickname & start matchmaking
Get paired with a random opponent
Play live TicTacToe in real-time
See player turn indicators (My Turn / Opponent Turn)
View win/loss/draw status instantly
Access leaderboard showing player stats

Features Implemented

Frontend
Responsive and minimalist UI design
Real-time game updates using Socket.io-client
Dynamic turn indicators for both players
Smooth transition animations
Matchmaking screen with player waiting logic
Leaderboard overlay displaying global player rankings
Nickname entry and validation before joining the match

Backend
Real-time connection management using Socket.io
Dynamic room creation for each match
Player matchmaking logic
Game state tracking (turns, moves, winner detection)
Leaderboard storage and update mechanism
Express.js API integration for future scalability

How It Works
Nickname Entry
Player enters their name on the main screen
Nickname stored in local session
Matchmaking
Player joins matchmaking lobby
Server pairs two available players automatically

Gameplay
Players make moves in real time using socket events
Game board updates instantly for both users
Server checks for a win, draw, or invalid move
Turn indicators show whose turn it is

Leaderboard
After match ends, player stats are updated (Win/Loss/Draw)
Leaderboard fetched dynamically via backend endpoint

How to Run Locally
Backend
cd server
npm install
.env
Set environment variables:
PORT=8000
npm start

Frontend
cd client
npm install
.env
Set API endpoint:
REACT_APP_API_URL=http://localhost:8000
npm start

Future Enhancements
Add Chat System between players during gameplay
Implement Custom Room Codes to play with friends
Introduce AI Bot Mode for solo gameplay
Add Sound Effects & Animations for moves and wins
Enable Account-based leaderboard tracking via MongoDB

Github URL
Frontend - https://github.com/Aradhyagarg/Lila_Games_frontend
Backend - https://github.com/Aradhyagarg/Lila_Games_backend
