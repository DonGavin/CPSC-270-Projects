class LightsOutGame {
    constructor(size) {
        if (size <= 0 || !Number.isInteger(size)){
            throw new Error ('Invalid board size. Size must be a positive integer.');
        }
        this.size = size; // Board size (e.g., 5x5)
        this.board = [];
        this.initBoard();
        this.createHTMLBoard();
        this.createWinMessage();
    }

    initBoard() {
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = Math.random() > 0.5 ? 1 : 0;
            }
        }
    }

    createHTMLBoard() {
        const container = document.createElement('div');
        container.style.display = 'grid';
        container.style.gridTemplateColumns = `repeat(${this.size}, 50px)`;
        container.style.gap = '5px';

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement('div');
                cell.style.width = '50px';
                cell.style.height = '50px';
                cell.style.backgroundColor = this.board[i][j] === 1 ? 'yellow' : 'black';
                cell.style.border = '1px solid gray';
                cell.style.cursor = 'pointer';

                cell.addEventListener('click', () => this.play(i, j));
                container.appendChild(cell);
            }
        }

        document.body.innerHTML = ''; // Clear existing content
        document.body.appendChild(container);

        // Append the win message element
        const winMessage = document.getElementById('win-message');
        document.body.appendChild(winMessage);
    }

    // Create the hidden win message element
    createWinMessage() {
        const winMessage = document.createElement('div');
        winMessage.id = 'win-message';
        winMessage.textContent = 'Congratulations! You have won the game!';
        winMessage.style.display = 'none';
        winMessage.style.marginTop = '20px';
        winMessage.style.fontSize = '20px';
        winMessage.style.color = 'green';
        winMessage.style.textAlign = 'center';

        document.body.appendChild(winMessage);
    }

    // Toggle a cell and its neighbors
    toggle(x, y) {
        if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
            throw new Error ('Cell coordinates Invalid at: (${x}, ${y})');
        }
            this.board[x][y] = 1 - this.board[x][y]; // Toggle itself
            // Toggle neighbors
            if (x > 0) this.board[x - 1][y] = 1 - this.board[x - 1][y]; // Above
            if (x < this.size - 1) this.board[x + 1][y] = 1 - this.board[x + 1][y]; // Below
            if (y > 0) this.board[x][y - 1] = 1 - this.board[x][y - 1]; // Left
            if (y < this.size - 1) this.board[x][y + 1] = 1 - this.board[x][y + 1]; // Right
        }
    
    // Check if all lights are off
    checkWin() {
        if (!this.board) {
            throw new Error ('Board not initialized');
        }
        return this.board.every(row => row.every(cell => cell === 0));
    }

    // Handle a move
    play(x, y) {
        this.toggle(x, y);
        this.createHTMLBoard();

        if (this.checkWin()) {
            const winMessage = document.getElementById('win-message');
            winMessage.style.display = 'block'; // Reveal the win message
        }
    }
}

// Define the board size as a constant variable
const BOARD_SIZE = 5; // Change this value to set a different board size

// Create and start the game
new LightsOutGame(BOARD_SIZE);