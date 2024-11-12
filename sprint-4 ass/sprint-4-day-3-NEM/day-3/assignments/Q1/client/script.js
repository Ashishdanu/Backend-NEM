const socket = io();
let gameId = null;

document.getElementById('restart').addEventListener('click', () => {
    socket.emit('create_game', 'game1');
});

socket.on('game_created', (id) => {
    gameId = id;
    console.log('Game created:', gameId);
});

socket.on('game_started', (data) => {
    updateBoard(data.board);
});

socket.on('board_update', (board) => {
    updateBoard(board);
});

socket.on('game_over', (message) => {
    alert(message);
});

socket.on('error', (message) => {
    alert(message);
});

function updateBoard(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleMove(index));
        boardElement.appendChild(cellElement);
    });
}

function handleMove(index) {
    socket.emit('make_move', { gameId, index });
}
