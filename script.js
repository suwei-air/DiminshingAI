const RECT_SIZE = 50,
  ROWS = 9,
  COLS = 9,
  SENSITIVITY = 10;
var canvas, context;
var map;
var posStart = null;

function drawBackground() {
  // background
  context.fillStyle = '#CCCCCC';
  context.fillRect(0, 0, COLS*RECT_SIZE, ROWS*RECT_SIZE);
  // lines
  context.beginPath();
  for (var i=1; i<COLS; ++i) {
    context.moveTo(i*RECT_SIZE, 0);
    context.lineTo(i*RECT_SIZE, ROWS*RECT_SIZE);
  }
  for (var i=1; i<ROWS; ++i) {
    context.moveTo(0, i*RECT_SIZE);
    context.lineTo(COLS*RECT_SIZE, i*RECT_SIZE);
  }
  context.lineWidth=1;
  context.strokeStyle='grey';
  context.stroke();
}
function drawOne(x, y, type) {
  switch (type) {
    case 0:
      context.fillStyle = 'yellow';
      break;
    case 1:
      context.fillStyle = 'blue';
      break;
    case 2:
      context.fillStyle = 'red';
      break;
    case 3:
      context.fillStyle = 'brown';
      break;
    case 4:
      context.fillStyle = 'green';
      break;
    case 5:
      context.fillStyle = 'purple';
      break;
    default:
      context.fillStyle = 'white';
  }
  context.fillRect(x+2, y+2, RECT_SIZE-4, RECT_SIZE-4);
}
function drawMap() {
  for (var row=0; row<ROWS; ++row) {
    for (var col=0; col<COLS; ++col) {
      drawOne(col*RECT_SIZE, row*RECT_SIZE, map[col][row]);
    }
  }
}
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

function onDragStart(event) {
  posStart = new Object;
  posStart.x = event.offsetX;
  posStart.y = event.offsetY;
}
function onDrag(event) {
  event.preventDefault();
  var x = event.offsetX,
    y = event.offsetY;
  if (posStart) {
    var direction = null;
    if (posStart.x-x>SENSITIVITY) {
      direction = 'left';
    }
    else if (x-posStart.x>SENSITIVITY) {
      direction = 'right';
    }
    else if (posStart.y-y>SENSITIVITY) {
      direction = 'up';
    }
    else if (y-posStart.y>SENSITIVITY) {
      direction = 'down';
    }
    if (direction && swap(posStart.x, posStart.y, direction)) {
      posStart = null;
    }
  }
}
function onDragEnd(event) {
  posStart = null;
}
function onDragOver(event){
  // 如果没有添加这个，鼠标指针会显示禁止样式，
  // 松开后最后一个onDrag事件会显示鼠标指针自动跑到window的左上角，造成误判
  event.preventDefault();
}
function onTouchStart(event) {
  posStart = new Object;
  posStart.x = event.touches[0].pageX-event.target.offsetLeft;
  posStart.y = event.touches[0].pageY-event.target.offsetTop;
}
function onTouchMove(event) {
  event.preventDefault();
  var x = event.touches[0].pageX-event.target.offsetLeft,
    y = event.touches[0].pageY-event.target.offsetTop;
  if (posStart) {
    var direction = null;
    if (posStart.x-x>SENSITIVITY) {
      direction = 'left';
    }
    else if (x-posStart.x>SENSITIVITY) {
      direction = 'right';
    }
    else if (posStart.y-y>SENSITIVITY) {
      direction = 'up';
    }
    else if (y-posStart.y>SENSITIVITY) {
      direction = 'down';
    }
    if (direction && swap(posStart.x, posStart.y, direction)) {
      posStart = null;
    }
  }
}
function onTouchEnd(event) {
  posStart = null;
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
