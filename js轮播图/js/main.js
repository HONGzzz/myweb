let wrap = document.getElementsByClassName('wrap')[0];
let prev = wrap.getElementsByClassName('prev')[0];
let next = wrap.getElementsByClassName('next')[0];
let imgsDiv = wrap.getElementsByClassName('imgs')[0];
let img = imgsDiv.children[0];
let btns = document.getElementsByClassName('btn')[0].getElementsByTagName('li');

// 自动播放
let maxIndex = imgsDiv.offsetWidth / img.offsetWidth - 1;
let index = 0;

imgsDiv.style.left = 0 + 'px';

// 更新按钮状态
function updateButtons() {
  for (let a of btns) {
    a.className = "";
  }
  btns[index].className = "on";
}

// 按钮事件监听
for (let i = 0; i < btns.length; i++) {
  let btn = btns[i];
  btn.setAttribute('data-index', i);
  btn.addEventListener('click', function () {
    for (let a of btns) {
      a.className = "";
    }
    this.className = "on";
    let index = this.getAttribute('data-index');
    let target = -img.offsetWidth * index;
    imgsDiv.style.left = target + 'px';
  })
}

let timer = setInterval(function () {
  move('right');
}, 3000);

wrap.addEventListener('mouseout', function () {
  timer = setInterval(function () {
    move('right');
  }, 3000);
});

// 指的时候停止滚动
wrap.addEventListener('mouseover', function () {
  clearInterval(timer);
});


function move(type) {
  if (type === 'right') {
    index++;
  } else if (type === 'left') {
    index--;
  }
  if (index === maxIndex) {
    index = 0;
  }
  if (index < 0) {
    index = maxIndex - 1;
  }
  let target = -index * img.offsetWidth;
  imgsDiv.style.left = target + 'px';
  updateButtons();
}

// 左按钮
prev.addEventListener('click', function () {
  move('left');
});

// 右按钮
next.addEventListener('click', function () {
  move('right');
});

