function check(col, row) {
  var cur = map[col][row];
  if (col>1
    && cur==map[col-2][row]
    && cur==map[col-1][row]) {
    return true;
  }
  if (col>0 && col<COLS-1
    && cur==map[col+1][row]
    && cur==map[col-1][row]) {
    return true;
  }
  if (col<COLS-2
    && cur==map[col+1][row]
    && cur==map[col+2][row]) {
    return true;
  }
  if (row>1
    && cur==map[col][row-2]
    && cur==map[col][row-1]) {
    return true;
  }
  if (row>0 && row<ROWS-1
    && cur==map[col][row+1]
    && cur==map[col][row-1]) {
    return true;
  }
  if (row<ROWS-2
    && cur==map[col][row+1]
    && cur==map[col][row+2]) {
    return true;
  }
  return false;
}

function initCheck(col, row) {
  var cur = map[col][row];
  if (col>1
    && cur==map[col-2][row]
    && cur==map[col-1][row]) {
    return true;
  }
  if (row>1
    && cur==map[col][row-2]
    && cur==map[col][row-1]) {
    return true;
  }
  return false;
}

function initialize() {
  map = new Array;
  for (var col=0; col<COLS; ++col) {
    map[col] = new Array;
    for (var row=0; row<ROWS; ++row) {
      do {
        map[col][row] = Math.floor(Math.random()*6);
      } while (initCheck(col, row));
    }
  }
}

function eliminate() {
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
  var checkResult = check(col,row) || check(colDest, rowDest);
  if (!checkResult) {
    temp = map[col][row];
    map[col][row] = map[colDest][rowDest];
    map[colDest][rowDest] = temp;
    drawMap();
  }
  return true;
}
