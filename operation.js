function check(col, row) {
  var cur = map[col][row],
    result = {};
  result.nodes = [];
  if (col>1 && cur==map[col-2][row] && cur==map[col-1][row]) {
    result.nodes.push({'col': col-2, 'row': row});
    result.nodes.push({'col': col-1, 'row': row});
    result.nodes.push({'col': col, 'row': row});
    result.horizontal = true;
  }
  if (col>0 && col<COLS-1 && cur==map[col+1][row] && cur==map[col-1][row]) {
    if (result.nodes.length===0) {
      result.nodes.push({'col': col-1, 'row': row});
      result.nodes.push({'col': col, 'row': row});
    }
    result.nodes.push({'col': col+1, 'row': row});
    result.horizontal = true;
  }
  if (col<COLS-2 && cur==map[col+1][row] && cur==map[col+2][row]) {
    if (result.nodes.length===0) {
      result.nodes.push({'col': col, 'row': row});
      result.nodes.push({'col': col+1, 'row': row});
    }
    result.nodes.push({'col': col+2, 'row': row});
    result.horizontal = true;
  }
  if (row>1 && cur==map[col][row-2] && cur==map[col][row-1]) {
    if (result.nodes.length===0) {
      result.nodes.push({'col': col, 'row': row});
    }
    result.nodes.push({'col': col, 'row': row-2});
    result.nodes.push({'col': col, 'row': row-1});
    result.vertical = true;
  }
  if (row>0 && row<ROWS-1 && cur==map[col][row+1] && cur==map[col][row-1]) {
    if (result.nodes.length===0) {
      result.nodes.push({'col': col, 'row': row});
    }
    if (!result.vertical) {
      result.nodes.push({'col': col, 'row': row-1});
    }
    result.nodes.push({'col': col, 'row': row+1});
    result.vertical = true;
  }
  if (row<ROWS-2 && cur==map[col][row+1] && cur==map[col][row+2]) {
    if (result.nodes.length===0) {
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
      (row>1 &&
        row<ROWS-2 &&
        map[col][row-2]==map[col][row] &&
        map[col][row-1]==map[col][row] &&
        map[col][row+1]==map[col][row] &&
        map[col][row+2]==map[col][row])) {
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
  if (col>1 && cur==map[col-2][row] && cur==map[col-1][row]) {
    return true;
  }
  if (row>1 && cur==map[col][row-2] && cur==map[col][row-1]) {
    return true;
  }
  return false;
}

function initialize() {
  map = [];
  for (var col=0; col<COLS; ++col) {
    map[col] = [];
    for (var row=0; row<ROWS; ++row) {
      do {
        map[col][row] = Math.floor(Math.random()*6);
      } while (initCheck(col, row));
    }
  }
}

function fall() {
  var colNodes;
  for (var col=0; col<COLS; ++col) {
    colNodes = [];
    for (var row=ROWS-1; row>=0; --row) {
      if (map[col][row]>=0) {
        colNodes.push(map[col][row]);
      }
    }
    var curRow = ROWS-1;
    for (var pos in colNodes) {
      map[col][curRow] = colNodes[pos];
      --curRow;
    }
    for (curRow; curRow>=0; --curRow) {
      map[col][curRow] = Math.floor(Math.random()*6);
    }
  }
  drawBackground();
  drawMap();
  // TODO 消除检测
  // TODO 动画效果
  return false;
}

function eliminate(results) {
  animationEliminate(results, function() {
    while (fall());
  });
}

function swap(x, y, direction) {
  var col = Math.floor(x/RECT_SIZE),
    colDest = Math.floor(x/RECT_SIZE),
    row = Math.floor(y/RECT_SIZE),
    rowDest = Math.floor(y/RECT_SIZE);
  if ((row===0 && direction=='up') ||
    (row===ROWS-1 && direction=='down') ||
    (col===0 && direction=='left') ||
    (col===COLS-1 && direction=='right')) {
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
      results = [];
    if (map[col][row]!=map[colDest][rowDest]) {
      checkResult = check(col, row);
      if (checkResult) {
        results.push(checkResult);
      }
      checkResult = check(colDest, rowDest);
      if (checkResult) {
        results.push(checkResult);
      }
    }
    if (results.length===0) {
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
