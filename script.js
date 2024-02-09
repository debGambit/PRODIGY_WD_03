let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'player'; // Default game mode is Player vs Player
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        drawBoard();
        if (checkWinner(currentPlayer)) {
            document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            document.getElementById('message').innerText = 'Draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && gameMode === 'ai') {
                setTimeout(() => aiMove(), 500);
            }
        }
    }
}

function drawBoard() {
    board.forEach((value, index) => {
        document.getElementsByClassName('cell')[index].innerText = value;
    });
}

function checkWinner(player) {
    return winningConditions.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function checkDraw() {
    return board.every(cell => {
        return cell !== '';
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('message').innerText = '';
    drawBoard();
}

function changeGameMode() {
    let selectedMode = document.getElementById('gameMode').value;
    if (selectedMode === 'ai') {
        gameMode = 'ai';
        resetGame();
    } else {
        gameMode = 'player';
        resetGame();
    }
}

function aiMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleClick(emptyCells[randomIndex]);
}
