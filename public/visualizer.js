import Grid from './grid.js';
import BFS from './pathfindingAlgos/bfs.js';
const width = Math.trunc(window.innerWidth / 26);
const height = Math.trunc(window.innerHeight / 27);
console.log(width, height);
let grid = new Grid(width, height);
grid.drawGrid();
let bfs = new BFS(grid.getCells(), grid.getWidth(), grid.getHeight(), grid.getStartCellIndex(), grid.getEndCellIndex());
let start = document.querySelector('#visualize-btn');
start.addEventListener('click', (e) => {
    start.disabled = true;
    reset.disabled = true;
    bfs.solve_bfs();
    grid.animateVisitedNodes(bfs.getVisitedNodes(), bfs.getShortestPath());
});
let reset = document.querySelector('#reset-btn');
reset.addEventListener('click', (e) => {
    grid.resetGrid();
    bfs.resetBFS(grid.getCells());
});
