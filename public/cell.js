export default class Cell {
    constructor(row, col, gridCell) {
        this.isAWall = false;
        this.isStartCell = false;
        this.isEndCell = false;
        this.hasBeenVisited = false;
        this.row = row;
        this.col = col;
        this.gridCell = gridCell;
    }
    addClassToCell(className) {
        this.gridCell.classList.add(className);
    }
    removeClassFromCell(className) {
        this.gridCell.classList.remove(className);
    }
    setIsAWall(isAWall) {
        this.isAWall = isAWall;
    }
    getIsAWall() {
        return this.isAWall;
    }
    setIsStartCell(isStartCell) {
        this.isStartCell = isStartCell;
    }
    getIsStartCell() {
        return this.isStartCell;
    }
    setIsEndCell(isEndCell) {
        this.isEndCell = isEndCell;
    }
    getIsEndCell() {
        return this.isEndCell;
    }
    setHasBeenVisited(hasBeenVisited) {
        this.hasBeenVisited = hasBeenVisited;
    }
    getHasBeenVisited() {
        return this.hasBeenVisited;
    }
    getGridCell() {
        return this.gridCell;
    }
}
