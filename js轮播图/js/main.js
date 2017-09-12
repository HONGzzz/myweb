var wrap = document.getElementsByClassName('wrap')[0];
var prev = wrap.getElementsByClassName('prev')[0];
var next = wrap.getElementsByClassName('next')[0];
var imgsDiv = wrap.getElementsByClassName('imgs')[0];
var img = imgsDiv.children[0];
var btns = document.getElementsByClassName('btn')[0].getElementsByTagName('li');

imgsDiv.style.left = 0 + 'px';

// 自动播放
var timer;

function right() {
    if (imgsDiv.offsetLeft <= -imgsDiv.offsetWidth + img.offsetWidth) {
        imgsDiv.style.left = 0 + 'px';
    }
    
    var target = imgsDiv.offsetLeft - img.offsetWidth;
    startMove(imgsDiv,{left:target},function(){
        console.log(imgsDiv.offsetLeft)
        for (var a of btns) {
            a.className = "";
        }
        var index = (-imgsDiv.offsetLeft) / img.offsetWidth;
        if (index === 4) {
            index = 0;
        }
        btns[index].className = "on";
    });
    timer = setTimeout(right, 3000);
}

timer = setTimeout(right, 3000);


// 指的时候停止滚动
wrap.addEventListener('mouseover', function () {
    clearTimeout(timer);
});

wrap.addEventListener('mouseout', function () {
    timer = setTimeout(right, 3000);
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
        var target= -img.offsetWidth * index ;
        startMove(imgsDiv,{left:target});
    })
}

// 左按钮
prev.addEventListener('click', function () {
    prev.disabled = true;

    if (imgsDiv.offsetLeft >= 0) {
        imgsDiv.style.left = -imgsDiv.offsetWidth + img.offsetWidth + 'px';
    }

    var target = imgsDiv.offsetLeft + img.offsetWidth;
    startMove(imgsDiv,{left:target},function(){
        for (var a of btns) {
            a.className = "";
        }
        var index = (-imgsDiv.offsetLeft) / img.offsetWidth;
        btns[index].className = "on";
        prev.disabled=false;
    });
})

// 右按钮
next.addEventListener('click', function () {
    next.disabled = true;

    if (imgsDiv.offsetLeft <= -imgsDiv.offsetWidth + img.offsetWidth) {
        imgsDiv.style.left = 0 + 'px';
    }
    
    var target = imgsDiv.offsetLeft - img.offsetWidth;
    startMove(imgsDiv,{left:target},function(){
        for (var a of btns) {
            a.className = "";
        }
        var index = (-imgsDiv.offsetLeft) / img.offsetWidth;
        if (index === 4) {
            index = 0;
        }
        btns[index].className = "on";
        next.disabled=false;
    });
})

