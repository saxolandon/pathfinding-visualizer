import Grid from './grid.js'
import BFS from './pathfindingAlgos/bfs.js'

const width = Math.trunc(window.innerWidth / 26)
const height = Math.trunc(window.innerHeight / 27) 

console.log(width, height)

let grid: Grid = new Grid(width, height)
grid.drawGrid()
let bfs: BFS = new BFS(grid.getCells(), grid.getWidth(), grid.getHeight(), grid.getStartCellIndex(), grid.getEndCellIndex())

let start = document.querySelector('#visualize-btn') as HTMLButtonElement
start.addEventListener('click', (e: Event) => {
  start.disabled = true;
  reset.disabled = true;
  bfs.solve_bfs()
  grid.animateVisitedNodes(bfs.getVisitedNodes(), bfs.getShortestPath())
})

let reset = document.querySelector('#reset-btn') as HTMLButtonElement
reset.addEventListener('click', (e: Event) => {
  grid.resetGrid();
  bfs.resetBFS(grid.getCells());
})