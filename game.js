var Game = {
  pay: pay,
  jump: jump,
  forward: forward,
  backward: backward,
  stop: stop,
  dot: document.querySelector('.dot'),
  maxLeft: document.getElementById('right').offsetWidth - 60,
  maxBottom: document.getElementById('right').offsetHeight - 60,
};

// 跳
function jump(val) {
  updatePos('bottom', val);
}
// 向前
function forward(val) {
  updatePos('left', val)
}
console.log(window.innerWidth)

function backward(val) {
  updatePos('left', -val);
}

function pay() {
  updatePos('bottom', -20);
  setTimeout(() => {
    pay();
  }, 100);
}

function updatePos(pos, val) {
  var old = parseInt(getComputedStyle(Game.dot).getPropertyValue(pos));
  var newVal = val + old;

  if (!checkedExceed(pos, newVal)) return;

  Game.dot.style[pos] = val + old + 'px';
}

function getDotPos(pos) {
  return parseInt(getComputedStyle(Game.dot).getPropertyValue(pos))
}

function setDotPos(pos, val) {
  Game.dot.style[pos] = val + 'px';
}

function checkedExceed(pos, val) {
  switch(pos) {
    case 'left':
      if (val <= 0 ) {
        return false
      } else if (val >= Game.maxLeft) {
        return false;
      } else {
        return true;
      }
      break;
    case 'bottom':
      if (val >= Game.maxBottom) {
        return false;
      } else if (val <= 20) {
        return false;
      } else {
        return true;
      }
      break;
  }
  return true;
}


function stop() {
  // 
}

pay();