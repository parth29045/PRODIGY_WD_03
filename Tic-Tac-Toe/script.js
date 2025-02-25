let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const cells = document.querySelectorAll('.cell');

// Check for winner
const checkWinner = () => {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusDisplay.textContent = `${currentPlayer} Wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a draw!';
    }
};

// Handle cell click
const handleCellClick = (index) => {
    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkWinner();
    
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }
};

// Reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player 1's turn (X)`;

    cells.forEach(cell => cell.textContent = '');
};

// Event Listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);
