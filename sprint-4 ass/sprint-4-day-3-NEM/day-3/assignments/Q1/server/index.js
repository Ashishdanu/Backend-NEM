const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const gameLogic=require("./gameLogic")

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let games = {};

app.use(express.static('client'));  

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('create_game', (gameId) => {
        games[gameId] = { players: [socket.id], board: Array(9).fill(null), currentPlayer: 0 };
        socket.emit('game_created', gameId);
    });

    socket.on('join_game', (gameId) => {
        if (games[gameId] && games[gameId].players.length === 1) {
            games[gameId].players.push(socket.id);
            io.to(games[gameId].players[0]).emit('game_started', { gameId, board: games[gameId].board });
            socket.emit('game_started', { gameId, board: games[gameId].board });
        }
    });

    socket.on('make_move', ({ gameId, index }) => {
        const game = games[gameId];
        if (!game) return;

        const player = game.players[game.currentPlayer];
        if (socket.id !== player) {
            socket.emit('error', 'Not your turn');
            return;
        }

        if (game.board[index]) {
            socket.emit('error', 'Wrong Move');
            return;
        }

        game.board[index] = game.currentPlayer === 0 ? 'X' : 'O';
        game.currentPlayer = 1 - game.currentPlayer;

        io.to(game.players[0]).emit('board_update', game.board);
        io.to(game.players[1]).emit('board_update', game.board);

        if (gameLogic.checkWinner(game.board)) {
            io.to(game.players[0]).emit('game_over', 'You win!');
            io.to(game.players[1]).emit('game_over', 'You lose!');
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
