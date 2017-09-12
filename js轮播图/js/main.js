
var wrap = document.getElementsByClassName('wrap')[0];
var prev = wrap.getElementsByClassName('prev')[0];
var next = wrap.getElementsByClassName('next')[0];
var imgsDiv = wrap.getElementsByClassName('imgs')[0];
var img = imgsDiv.children[0];
var btns = document.getElementsByClassName('btn')[0].getElementsByTagName('li');

imgsDiv.style.left = 0 + 'px';
imgsDiv.style.transition = 'all 0.5s ease-in-out';

// 自动播放
var timer;

function right() {
    if (imgsDiv.offsetLeft <= -imgsDiv.offsetWidth + img.offsetWidth) {
        imgsDiv.style.transition = 'none';
        imgsDiv.style.left = 0 + 'px';
    }

    setTimeout(function () {
        imgsDiv.style.transition = 'all 0.5s ease-in-out';
        imgsDiv.style.left = imgsDiv.offsetLeft - img.offsetWidth + 'px';
    }, 10);

    setTimeout(function () {
        console.log(imgsDiv.offsetLeft)
        for (var a of btns) {
            a.className = "";
        }
        var index = (-imgsDiv.offsetLeft) / img.offsetWidth;
        console.log(index)
        if (index === 4) {
            index = 0;
        }
        btns[index].className = "on";
    }, 520);

    if (imgsDiv.offsetLeft < -imgsDiv.offsetWidth + img.offsetWidth) {
        imgsDiv.style.transition = 'none';
        imgsDiv.style.left = 0 + 'px';
    }

    timer = setTimeout(right, 3000);
}

timer = setTimeout(right, 3000);

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
        console.log(index);
        imgsDiv.style.left = -img.offsetWidth * index + 'px';
    })
}

// 往左
prev.addEventListener('click', function () {
    prev.disabled = true;
    console.log(imgsDiv.offsetLeft)

    if (imgsDiv.offsetLeft >= 0) {
        imgsDiv.style.transition = 'none';
        imgsDiv.style.left = -imgsDiv.offsetWidth + img.offsetWidth + 'px';
    }

    setTimeout(function () {
        imgsDiv.style.transition = 'all 0.5s ease-in-out';
        imgsDiv.style.left = imgsDiv.offsetLeft + img.offsetWidth + 'px';
    }, 10);

    setTimeout(function () {
        for (var a of btns) {
            a.className = "";
        }
        var index = (-imgsDiv.offsetLeft) / img.offsetWidth;
        btns[index].className = "on";
        prev.disabled = false;
    }, 520);

    //startMove(imgsDiv, { left: imgsDiv.offsetLeft + img.offsetWidth }, function () { prev.disabled = false; });
})

// 往右
next.addEventListener('click', function () {
    next.disabled = true;
    console.log(imgsDiv.offsetLeft)

    if (imgsDiv.offsetLeft <= -imgsDiv.offsetWidth + img.offsetWidth) {
        imgsDiv.style.transition = 'none';
        imgsDiv.style.left = 0 + 'px';
    }

    setTimeout(function () {
        imgsDiv.style.transition = 'all 0.5s ease-in-out';
        imgsDiv.style.left = imgsDiv.offsetLeft - img.offsetWidth + 'px';
    }, 10);

    setTimeout(function () {
        for (var a of btns) {
            a.className = "";
        }
        var index = (-imgsDiv.offsetLeft) / img.offsetWidth;
        if (index === 4) {
            index = 0;
        }
        btns[index].className = "on";
        next.disabled = false;
    }, 520);
    //startMove(imgsDiv, { left: imgsDiv.offsetLeft - img.offsetWidth }, function () { next.disabled = false; });
})

