function drawBackground() {
  var x = arguments[0]||0,
    y = arguments[1]||0,
    w = arguments[2]||COLS*RECT_SIZE,
    h = arguments[3]||ROWS*RECT_SIZE;
  // background
  context.fillStyle = '#ccc';
  context.fillRect(x, y, w, h);
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
  if (type==6) { // ○
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x+RECT_SIZE/2, y+RECT_SIZE/2, RECT_SIZE/2-2,
      0, Math.PI*2, true);
    context.closePath();
    context.fill();
    return;
  }
  switch (Math.floor(type)) {
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
  switch (Math.floor(type*10)%10) {
    case 0:
      context.fillRect(x+2, y+2, RECT_SIZE-4, RECT_SIZE-4);
      break;
    case 1: // |
      context.fillRect(x+RECT_SIZE/4, y+2, RECT_SIZE/2, RECT_SIZE-4);
      break;
    case 2: // -
      context.fillRect(x+2, y+RECT_SIZE/4, RECT_SIZE-4, RECT_SIZE/2);
      break;
    case 3: // ◇
      context.beginPath();
      context.moveTo(x+RECT_SIZE/2, y+2);
      context.lineTo(x+RECT_SIZE-2, y+RECT_SIZE/2);
      context.lineTo(x+RECT_SIZE/2, y+RECT_SIZE-2);
      context.lineTo(x+2, y+RECT_SIZE/2);
      context.lineTo(x+RECT_SIZE/2, y+2);
      context.closePath();
      context.fill();
      break;
    default:
      context.fillRect(x+2, y+2, RECT_SIZE-4, RECT_SIZE-4);
  }
}

function drawMap() {
  for (var row=0; row<ROWS; ++row) {
    for (var col=0; col<COLS; ++col) {
      drawOne(col*RECT_SIZE, row*RECT_SIZE, map[col][row]);
    }
  }
}

function animationSwap(col, row, direction, onFinish) {
  var frontX = col*RECT_SIZE,
    frontY = row*RECT_SIZE,
    backX = col*RECT_SIZE,
    backY = row*RECT_SIZE,
    frontOne = map[col][row],
    backOne,
    frames = FPS*ANIMATION_SEC,
    movementX = 0,
    movementY = 0,
    backgroundX = frontX,
    backgroundY = frontY,
    backgroundW = RECT_SIZE,
    backgroundH = RECT_SIZE;
  switch (direction) {
    case 'up':
      backOne = map[col][row-1];
      backY -= RECT_SIZE;
      movementY = -RECT_SIZE/frames;
      backgroundY -= RECT_SIZE;
      backgroundH += RECT_SIZE;
      break;
    case 'down':
      backOne = map[col][row+1];
      backY += RECT_SIZE;
      movementY = RECT_SIZE/frames;
      backgroundH += RECT_SIZE;
      break;
    case 'left':
      backOne = map[col-1][row];
      backX -= RECT_SIZE;
      movementX = -RECT_SIZE/frames;
      backgroundX -= RECT_SIZE;
      backgroundW += RECT_SIZE;
      break;
    case 'right':
      backOne = map[col+1][row];
      backX += RECT_SIZE;
      movementX = RECT_SIZE/frames;
      backgroundW += RECT_SIZE;
      break;
  }
  var ani = setInterval(function() {
    drawBackground(backgroundX, backgroundY, backgroundW, backgroundH);
    frontX += movementX;
    frontY += movementY;
    backX -= movementX;
    backY -= movementY;
    drawOne(backX, backY, backOne);
    drawOne(frontX, frontY, frontOne);
    --frames;
    if (0==frames) {
      // finished
      clearInterval(ani);
      onFinish();
    }
  }, 1000/FPS);
}

function animationEliminate(results, onFinish) {
  var result, node, cur;
  for (var posResult in results) {
    result = results[posResult];
    if (result.transformNode) {
      cur = map[result.transformNode.col][result.transformNode.row];
    }
    for (var posNode in result.nodes) {
      node = result.nodes[posNode];
      drawBackground(node.col*RECT_SIZE, node.row*RECT_SIZE,
        RECT_SIZE, RECT_SIZE);
      map[node.col][node.row] = -1;
    }
    if (result.transformNode) {
      switch (result.transformType) {
        case '5':
          map[result.transformNode.col][result.transformNode.row] = 6;
          break;
        case 'T':
          map[result.transformNode.col][result.transformNode.row] = cur+0.3;
          break;
        case '4':
          if (result.vertical) {
            map[result.transformNode.col][result.transformNode.row] = cur+0.2;
          }
          else {
            map[result.transformNode.col][result.transformNode.row] = cur+0.1;
          }
          break;
      }
      drawOne(result.transformNode.col*RECT_SIZE,
        result.transformNode.row*RECT_SIZE,
        map[result.transformNode.col][result.transformNode.row]);
    }
  }
  onFinish();
}
