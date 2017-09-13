var wrap = document.getElementsByClassName('wrap')[0];
var prev = wrap.getElementsByClassName('prev')[0];
var next = wrap.getElementsByClassName('next')[0];
var imgsDiv = wrap.getElementsByClassName('imgs')[0];
var img = imgsDiv.children[0];
var btns = document.getElementsByClassName('btn')[0].getElementsByTagName('li');

// 自动播放
var timer;

var maxindex = imgsDiv.offsetWidth / img.offsetWidth - 1;
var index = -imgsDiv.offsetLeft / img.offsetWidth;

// 更新按钮状态
function updatebutton() {
    for (var a of btns) {
        a.className = "";
    }
    if (index === maxindex) {
        btns[0].className = "on";
    } else {
        btns[index].className = "on";
    }
}

function moveright() {
    index++;
    var target = -index * img.offsetWidth;
    startMove(imgsDiv, { left: target }, function () {
        if (index === maxindex) {
            index = 0;
            imgsDiv.style.left = 0 + 'px';
        }
    });
    updatebutton();
    timer = setTimeout(moveright, 3000);
}

timer = setTimeout(moveright, 3000);


// 指的时候停止滚动
wrap.addEventListener('mouseover', function () {
    clearTimeout(timer);
});

wrap.addEventListener('mouseout', function () {
    timer = setTimeout(moveright, 3000);
})


// 按钮事件监听
for (var i = 0; i < btns.length; i++) {
    btn = btns[i];
    btn.setAttribute('data-index', i);
    btn.addEventListener('click', function () {
        for (var a of btns) {
            a.className = "";
        }
        this.className = "on";
        var index = this.getAttribute('data-index');
        var target = -img.offsetWidth * index;
        startMove(imgsDiv, { left: target });
    })
}

// 左按钮
prev.addEventListener('click', function () {
    index--;
    if (index < 0) {
        index = maxindex;
        imgsDiv.style.left = -index * img.offsetWidth + 'px';
        index--;
    }

    var target = -index * img.offsetWidth;
    startMove(imgsDiv, { left: target });
    updatebutton();
})

// 右按钮
next.addEventListener('click', function () {
    index++;
    if (index > maxindex) {
        index = maxindex;
    }

    var target = -index * img.offsetWidth;
    startMove(imgsDiv, { left: target }, function () {
        if (index === maxindex) {
            index = 0;
            imgsDiv.style.left = 0 + 'px';
        }
    });
    updatebutton();
})

