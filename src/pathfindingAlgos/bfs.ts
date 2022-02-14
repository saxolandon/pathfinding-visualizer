import Grid from '../grid.js'
import Cell from '../cell.js'
import { GridIndex } from '../types/GridIndex.js'

export default class BFS {
  private row: number 
  private col: number
  private qr: Array<number>
  private qc: Array<number>
  private dr: Array<number>
  private dc: Array<number> 
  private grid: Array<Array<Cell>>
  private visitedNodes: Array<Cell>
  private shortestPath: Array<Cell>
  private prev: Map<Cell, Cell>
  private startCellIndex: GridIndex
  private endCellIndex: GridIndex

  constructor(grid: Array<Array<Cell>>, width: number, height: number, startCellIndex: GridIndex, endCellIndex: GridIndex) {
    this.row = height;
    this.col = width;
    this.dr = [-1, 1, 0, 0];
    this.dc = [0, 0, 1, -1];
    this.grid = grid;
    this.visitedNodes = [];
    this.shortestPath = [];
    this.prev = new Map();
    this.startCellIndex = startCellIndex
    this.endCellIndex = endCellIndex
    this.qr = [this.startCellIndex.row];
    this.qc = [this.startCellIndex.col];
  }

  public solve_bfs(): boolean {
    let r;
    let c;
    let foundEndNode = false;

    while (this.qr.length > 0 && this.qc.length > 0) {
      r = this.qr.shift();
      c = this.qc.shift();

      if (r === undefined || c === undefined) {
        console.error('Current Row or Column is Undefined')
        return false
      }

      if (this.grid[r][c].getIsEndCell() === true) {
        foundEndNode = true;
        break;
      }

      this.exploreNeighbors(r, c)
    }

    if (foundEndNode) {
      this.reconstructPath()
    }

    return true
  }

  private exploreNeighbors(r: number, c: number) {
    let rr: number
    let cc: number

    for (let i = 0; i < 4; i++) {
      rr = r + this.dr[i];
      cc = c + this.dc[i];

      if (rr < 0 || cc < 0) continue;
      if (rr >= this.row || cc >= this.col) continue;

      if (this.grid[rr][cc].getHasBeenVisited() === true) continue;
      if (this.grid[rr][cc].getIsAWall() === true) continue; 

      this.qr.push(rr);
      this.qc.push(cc);

      this.grid[rr][cc].setHasBeenVisited(true)

      if (r == this.startCellIndex.row && c == this.endCellIndex.col) {
        this.prev.set(this.grid[rr][cc], this.grid[23][25]);
      }

      else {
        this.prev.set(this.grid[rr][cc], this.grid[r][c]);
      }

      this.visitedNodes.push(this.grid[rr][cc]);
    }
  }

  private reconstructPath(): void {
    let ex = this.endCellIndex.row;
    let ey = this.endCellIndex.col;

    let curr = this.prev.get(this.grid[ex][ey])

    if (curr === undefined) return

    while (curr.getIsStartCell() !== true) {
      this.shortestPath.push(curr)
      curr = this.prev.get(curr)
      if (curr === undefined) {
        console.error('Visited Node is Undefined')
        return
      }
    }

    this.shortestPath = this.shortestPath.reverse();
  }

  public resetBFS(grid: Array<Array<Cell>>) {
    this.qr = [this.startCellIndex.row];
    this.qc = [this.startCellIndex.col];
    this.grid = grid;
    this.visitedNodes = [];
    this.shortestPath = [];
    this.prev = new Map();
  }

  public getVisitedNodes() {
    return this.visitedNodes
  }

  public getShortestPath() {
    return this.shortestPath
  }
}