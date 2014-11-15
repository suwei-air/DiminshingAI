const RECT_SIZE = 50,
  ROWS = 9,
  COLS = 9,
  SENSITIVITY = 10;
var canvas, context;
var map;
var posStart = null;

function swap(x, y, direction) {
  var row = rowDest = Math.floor(y/RECT_SIZE),
    col = colDest = Math.floor(x/RECT_SIZE);
  if ((row==0 && direction=='up')
    || (row==ROWS-1 && direction=='down')
    || (col==0 && direction=='left')
    || (col==COLS-1 && direction=='right')) {
    return false;
  }
  switch (direction) {
    case 'left':
      --colDest;
      break;
    case 'right':
      ++colDest;
      break;
    case 'up':
      --rowDest;
      break;
    case 'down':
      ++rowDest;
      break;
    default:
      return false;
  }
  drawBackground();
  var temp = map[col][row];
  map[col][row] = map[colDest][rowDest];
  map[colDest][rowDest] = temp;
  drawMap();
  return true;
}

window.addEventListener('load', function() {
  canvas = document.getElementById('main');
  canvas.height = ROWS*RECT_SIZE;
  canvas.width = COLS*RECT_SIZE;
  // For screen
  canvas.addEventListener('dragstart', onDragStart);
  canvas.addEventListener('drag', onDrag);
  canvas.addEventListener('dragend', onDragEnd);
  canvas.addEventListener('dragover', onDragOver);
  // For mobile
  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchmove', onTouchMove, false);
  canvas.addEventListener('touchend', onTouchEnd, false);

  context = canvas.getContext('2d');

  map = new Array;
  for (var col=0; col<COLS; ++col) {
    map[col] = new Array;
    for (var row=0; row<ROWS; ++row) {
      map[col][row] = Math.floor(Math.random()*6);
    }
  }

  drawBackground();
  drawMap();
});
