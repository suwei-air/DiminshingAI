function onDragStart(event) {
  posStart = {};
  posStart.x = event.offsetX;
  posStart.y = event.offsetY;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData('Text', ''); // FireFox要求设置数据，否则无drag事件
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
  posStart = {};
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
