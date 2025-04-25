// Toggle a cell and its neighbors
function toggle(x, y) {
    if (x >= 0 && x < this.size && y >= 0 && y < this.size) { // Valid x, y
        this.board[x][y] = 1 - this.board[x][y]; // Toggle itself

        // Toggle neighbors
        if (x > 0) this.board[x - 1][y] = 1 - this.board[x - 1][y]; // Above
        if (x < this.size - 1) this.board[x + 1][y] = 1 - this.board[x + 1][y]; // Below
        if (y > 0) this.board[x][y - 1] = 1 - this.board[x][y - 1]; // Left
        if (y < this.size - 1) this.board[x][y + 1] = 1 - this.board[x][y + 1]; // Right
    }
}

function toggleVert(x,y){
    if (y > 0) this.board[x][y-1] = 1 - this.board[x][y-1];
    if (y < this.size - 1) this.board[x][y+1] = 1 - this.board[x][y+1];
}
function toggleHoriz(x,y){
    if (x > 0) this.board[x-1][y] = 1 - this.board[x-1][y];
    if (x < this.size - 1) this.board[x+1][y] = 1 - this.board[x+1][y];
}
function toggleSelf(x, y) {
    this.board[x][y] = 1 - this.board[x][y]; 
}
function toggleAll(x,y){
    this.toggleSelf(x,y);
    this.toggleVert(x,y);
    this.toggleHoriz(x,y);
}
function checkVert(y){
    return y >= 0 && y < this.size;
}
function checkBounds(x,y){
    return this.checkHoriz(x) && this.checkVert(y);
}
toggleinBounds(x,y){
    if (this.checkBounds(x,y)){
        this.toggleAll(x,y);
    }
}