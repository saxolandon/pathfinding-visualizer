export default class Cell {
  private readonly row: number
  private readonly col: number
  private isAWall: boolean = false
  private isStartCell: boolean = false
  private isEndCell: boolean = false
  private hasBeenVisited: boolean = false
  private gridCell: HTMLTableCellElement

  constructor(row: number, col: number, gridCell: HTMLTableCellElement) {
    this.row = row
    this.col = col
    this.gridCell = gridCell
  }

  public addClassToCell(className: string) {
    this.gridCell.classList.add(className)
  }

  public removeClassFromCell(className: string) {
    this.gridCell.classList.remove(className)
  }

  public setIsAWall(isAWall: boolean) {
    this.isAWall = isAWall 
  }

  public getIsAWall() {
    return this.isAWall
  }

  public setIsStartCell(isStartCell: boolean) {
    this.isStartCell = isStartCell
  }

  public getIsStartCell() {
    return this.isStartCell
  }

  public setIsEndCell(isEndCell: boolean) {
    this.isEndCell= isEndCell
  }

  public getIsEndCell() {
    return this.isEndCell
  }

  public setHasBeenVisited(hasBeenVisited: boolean) {
    this.hasBeenVisited= hasBeenVisited
  }

  public getHasBeenVisited() {
    return this.hasBeenVisited
  }

  public getGridCell() {
    return this.gridCell
  }
}