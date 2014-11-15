function drawBackground() {
  // background
  context.fillStyle = '#ccc';
  context.fillRect(0, 0, COLS*RECT_SIZE, ROWS*RECT_SIZE);
  // // lines
  // context.beginPath();
  // for (var i=1; i<COLS; ++i) {
  //   context.moveTo(i*RECT_SIZE, 0);
  //   context.lineTo(i*RECT_SIZE, ROWS*RECT_SIZE);
  // }
  // for (var i=1; i<ROWS; ++i) {
  //   context.moveTo(0, i*RECT_SIZE);
  //   context.lineTo(COLS*RECT_SIZE, i*RECT_SIZE);
  // }
  // context.lineWidth=1;
  // context.strokeStyle='grey';
  // context.stroke();
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
