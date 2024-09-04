const board = document.querySelector('.board');
let currentPlayer = 'X';
let cells = Array(9).fill(null);

const handleClick = (e) => {
    const cellIndex = e.target.dataset.index;
    
    // Check if the cell is already filled
    if (cells[cellIndex]) return;

    updateCell(cellIndex, currentPlayer);
    const winner = checkWinner();

    if (winner) {
        setTimeout(() => alert(`Player ${winner} wins!`), 100);
        resetGame();
    } else if (cells.every(cell => cell)) {
        setTimeout(() => alert("It's a draw!"), 100);
        resetGame();
    }
};

const updateCell = (index, value) => {
    cells[index] = value; // Update array value
    const cell = board.querySelector(`[data-index="${index}"]`);
    cell.textContent = value;
    cell.classList.add(value === 'X' ? 'player-x' : 'player-o');
    // Switch player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
};

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    return null;
}

const resetGame = () => {
    cells = Array(9).fill(null); // Reset the cells array
    currentPlayer = 'X'; // Reset the starting player to 'X'
    board.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('player-x', 'player-o');
        cell.textContent = '';
    });
}

// Initialize the board cells
cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
});
