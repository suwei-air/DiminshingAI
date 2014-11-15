var RECT_SIZE = 50,
  ROWS = 9,
  COLS = 9,
  SENSITIVITY = 10;
var canvas, context;
var map;
var posStart = null;

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

  initialize();

  drawBackground();
  drawMap();
});
