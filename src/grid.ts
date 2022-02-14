import Cell from './cell.js'
import { GridIndex } from './types/GridIndex.js'

export default class Grid {
  private width: number
  private height: number
  private startCellIndex: GridIndex
  private endCellIndex: GridIndex
  private cells: Array<Array<Cell>>
  private isMouseDown: boolean
  private isAnimationRunning: boolean

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.cells = []
    this.isMouseDown = false
    this.isAnimationRunning = false
    this.startCellIndex = { row: 0, col: 0}
    this.endCellIndex = { row: 0, col: 0}
    this.setStartAndEndCellIndex()
  }

  private setStartAndEndCellIndex() {

    const startRowIndex = Math.trunc(this.height / 2)
    const startColIndex = Math.trunc(this.width / 2) - Math.trunc(this.width / 4)

    const endRowIndex = Math.trunc(this.height / 2)
    const endColIndex = Math.trunc(this.width / 2) + Math.trunc(this.width / 4)

    this.startCellIndex = { row: startRowIndex, col: startColIndex }
    this.endCellIndex = { row: endRowIndex, col: endColIndex }
  }

  public drawGrid() {
    let body = document.getElementsByTagName('body')[0] as HTMLBodyElement

    let grid = document.createElement('table') as HTMLTableElement
    grid.id = 'grid-container'

    for (let i = 0; i < this.height; i++) {
      let row = document.createElement("tr") as HTMLTableRowElement

      this.cells.push([])

      for (let j = 0; j < this.width; j++) {
        let cell = document.createElement("th") as HTMLTableCellElement
        cell.dataset.row = i.toString()
        cell.dataset.col = j.toString()
        row.appendChild(cell);
        this.cells[i][j] = new Cell(i, j, cell);
        this.cells[i][j].addClassToCell('grid-cell')
        if (i === this.startCellIndex.row && j === this.startCellIndex.col) {
          this.cells[i][j].setIsStartCell(true) 
          this.cells[i][j].addClassToCell('start')
        }

        if (i === this.endCellIndex.row && j === this.endCellIndex.col) {
          this.cells[i][j].setIsEndCell(true)
          this.cells[i][j].addClassToCell('end')
        }
      }
      grid.appendChild(row)
    }

    grid.addEventListener('mousedown', (e: Event) => {
      this.handleMouseDownEvent(e)
    })
    grid.addEventListener('mousemove', (e: Event) => {
      this.handleMouseMoveEvent(e)
    })
    grid.addEventListener('mouseup', (e: Event) => {
      this.handleMouseUpEvent(e)
    }) 

    body.appendChild(grid)
  }

  private handleMouseDownEvent(e: Event) {
    e.preventDefault()

    if (!this.isAnimationRunning) {
      this.isMouseDown = true
      const { target } = e

      if (target !== null && target !== undefined && target instanceof HTMLElement) {
        let row = target.dataset['row']
        let col = target.dataset['col']

        if (row !== undefined && col !== undefined) {
          let numRow = parseInt(row, 10) 
          let numCol = parseInt(col, 10)
          this.cells[numRow][numCol].addClassToCell('wall')
          this.cells[numRow][numCol].setIsAWall(true)
        }
      }
    }
  }

  private isStartOrEndCell(cell: Cell) {
    return cell.getIsStartCell() || cell.getIsEndCell()
  }

  private handleMouseUpEvent(e: Event) {
    e.preventDefault()
    if (this.isMouseDown === false) return

    if (!this.isAnimationRunning) {
      this.isMouseDown = false 
      const { target } = e

      if (target !== null && target !== undefined && target instanceof HTMLElement) {
        let row = target.dataset['row']
        let col = target.dataset['col']

        if (row !== undefined && col !== undefined) {
          let numRow = parseInt(row, 10) 
          let numCol = parseInt(col, 10)

          // checks that the current cell is neither the start or end cell
          if (!this.isStartOrEndCell(this.cells[numRow][numCol])) {
            this.cells[numRow][numCol].addClassToCell('wall')
            this.cells[numRow][numCol].setIsAWall(true)
          }
        }
      }
    }    
  }

  private handleMouseMoveEvent(e: Event) {
    e.preventDefault()
    if (this.isMouseDown === false || this.isAnimationRunning) return

    this.isMouseDown = true
    const { target } = e

    if (target !== null && target !== undefined && target instanceof HTMLElement) {
      let row = target.dataset['row']
      let col = target.dataset['col']

      if (row !== undefined && col !== undefined) {
        let numRow = parseInt(row, 10) 
        let numCol = parseInt(col, 10)

        // checks that the current cell is neither the start or end cell
        if (!this.isStartOrEndCell(this.cells[numRow][numCol])) {
          this.cells[numRow][numCol].addClassToCell('wall')
          this.cells[numRow][numCol].setIsAWall(true)
        }
      }
    }
  }

  public getCells() {
    return this.cells
  }

  public animateVisitedNodes(visitedNodes: Array<Cell>, shortestPath: Array<Cell>) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 10 * i);

        // Enables the buttons
        setTimeout(() => {
          let start = document.querySelector('#visualize-btn') as HTMLButtonElement
          let reset = document.querySelector('#reset-btn') as HTMLButtonElement
          if (start !== null && reset !== null) {
            start.disabled = false 
            reset.disabled = false 
          } 
        }, 11 * i)
        break;
      }

      if (visitedNodes[i].getIsStartCell() || visitedNodes[i].getIsEndCell()) continue;

      setTimeout(() => {
        visitedNodes[i].addClassToCell('visited')
      }, 10 * i);
    }
  }

  public animateShortestPath(shortestPath: Array<Cell>) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        shortestPath[i].removeClassFromCell('visited')
        shortestPath[i].addClassToCell('path')
      }, 50 * i);
    }
  }

  public resetGrid() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.cells[i][j].setIsAWall(false)
        this.cells[i][j].setHasBeenVisited(false)
        this.cells[i][j].removeClassFromCell('visited')
        this.cells[i][j].removeClassFromCell('wall')
        this.cells[i][j].removeClassFromCell('path')
        this.isAnimationRunning = false;
      }
    }
  }

  public getStartCellIndex() {
    return this.startCellIndex
  }

  public getEndCellIndex() {
    return this.endCellIndex
  }

  public getWidth() {
    return this.width
  }

  public getHeight() {
    return this.height
  }
}
