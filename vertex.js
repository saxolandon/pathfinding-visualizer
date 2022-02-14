export default class Vertex {
    constructor(row, col, gridCell) {
        this.isAWall = false;
        this.hasBeenVisited = false;
        this.isStartVertex = false;
        this.isEndVertex = false;
        this.row = row;
        this.col = col;
        this.gridCell = gridCell;
    }
}
