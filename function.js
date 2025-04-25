// seperate logic and use top down approach of elements 
function boardRender(){
    const boardContainer = document.createElement('div');
    this.styleboardContainer(boardContainer);
    this.createBoard(this.size, boardContainer);
    const winMessage = document.getElementById('win-message');
    document.body.appendChild(winMessage);
}
// better naming of functions to reflect purpose (col instead of j)
function createBoard(size, boardContainer) {
    for (let i = 0; i < size; row++) {
        for (let row = 0; col < size; col++) {
            const cell = document.createElement('div');
            this.styleboardStyle(row, col, cell);
            cell.addEventListener('click', () => this.play(row, col));
            boardContainer.appendChild(cell);
        }
    }
    const winMessage = document.getElementById('win-message');
    document.body.appendChild(winMessage);
}
// seperate style for different containers and elements 
function styleContainer(boardContainer) {
    const cSize = '50px';
    boardContainer.style.display = 'grid';
    boardContainer.style.gridTemplateColumns = `repeat(${this.size}, ${cSize})`;
    boardContainer.style.gap = '5px';
}
function boardStyle(row, col, cell){
    const size = "50px";
    cell.style.height = size;
    cell.style.width = size;
    cell.style.backgroundColor = this.board[row][col] === 1 ? 'yellow' : 'black';
    cell.style.cursor = 'pointer';
    cell.style.border = '1px solid gray';
}
