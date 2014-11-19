function check(col, row) {
  var cur = map[col][row],
    result = new Object();
  result.nodes = new Array();
  if (col>1
    && cur==map[col-2][row]
    && cur==map[col-1][row]) {
    result.nodes.push({'col': col-2, 'row': row});
    result.nodes.push({'col': col-1, 'row': row});
    result.nodes.push({'col': col, 'row': row});
    result.horizontal = true;
  }
  if (col>0 && col<COLS-1
    && cur==map[col+1][row]
    && cur==map[col-1][row]) {
    if (result.nodes.length==0) {
      result.nodes.push({'col': col-1, 'row': row});
      result.nodes.push({'col': col, 'row': row});
    }
    result.nodes.push({'col': col+1, 'row': row});
    result.horizontal = true;
  }
  if (col<COLS-2
    && cur==map[col+1][row]
    && cur==map[col+2][row]) {
    if (result.nodes.length==0) {
      result.nodes.push({'col': col, 'row': row});
      result.nodes.push({'col': col+1, 'row': row});
    }
    result.nodes.push({'col': col+2, 'row': row});
    result.horizontal = true;
  }
  if (row>1
    && cur==map[col][row-2]
    && cur==map[col][row-1]) {
    if (result.nodes.length==0) {
      result.nodes.push({'col': col, 'row': row});
    }
    result.nodes.push({'col': col, 'row': row-2});
    result.nodes.push({'col': col, 'row': row-1});
    result.vertical = true;
  }
  if (row>0 && row<ROWS-1
    && cur==map[col][row+1]
    && cur==map[col][row-1]) {
    if (result.nodes.length==0) {
      result.nodes.push({'col': col, 'row': row});
    }
    if (!result.vertical) {
      result.nodes.push({'col': col, 'row': row-1});
    }
    result.nodes.push({'col': col, 'row': row+1});
    result.vertical = true;
  }
  if (row<ROWS-2
    && cur==map[col][row+1]
    && cur==map[col][row+2]) {
    if (result.nodes.length==0) {
      result.nodes.push({'col': col, 'row': row});
    }
    if (!result.vertical) {
      result.nodes.push({'col': col, 'row': row+1});
    }
    result.nodes.push({'col': col, 'row': row+2});
    result.vertical = true;
  }
  if (
      (col>1 &&
        col<COLS-2 &&
        map[col-2][row]==map[col][row] &&
        map[col-1][row]==map[col][row] &&
        map[col+1][row]==map[col][row] &&
        map[col+2][row]==map[col][row]) ||
      (col>1 &&
        col<COLS-2 &&
        map[col-2][row]==map[col][row] &&
        map[col-1][row]==map[col][row] &&
        map[col+1][row]==map[col][row] &&
        map[col+2][row]==map[col][row])) {
    result.transformType = '5';
  }
  else if (result.horizontal && result.vertical) {
    result.transformType = 'T';
  }
  else if (result.nodes.length==4) {
    result.transformType = '4';
  }
  if (result.transformType) {
    result.transformNode = {'col': col, 'row': row};
  }
  return result.nodes.length>0 ? result : false;
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

function eliminate(checkResult) {
}

function swap(x, y, direction) {
  var col = colDest = Math.floor(x/RECT_SIZE),
    row = rowDest = Math.floor(y/RECT_SIZE);
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

  animationSwap(col, row, direction, function() {
    var temp = map[col][row];
    map[col][row] = map[colDest][rowDest];
    map[colDest][rowDest] = temp;
    var checkResult,
      results = new Array();
    if (map[col][row]!=map[colDest][rowDest]) {
      if (checkResult = check(col, row)) {
        results.push(checkResult);
      }
      if (checkResult = check(colDest, rowDest)) {
        results.push(checkResult);
      }
    }
    if (results.length==0) {
      animationSwap(col, row, direction, function() {
        temp = map[col][row];
        map[col][row] = map[colDest][rowDest];
        map[colDest][rowDest] = temp;
      });
    }
    else {
      eliminate(results);
    }
  });
  return true;
}
