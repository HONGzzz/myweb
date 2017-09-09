window.onload = function () {
    waterfall('main', 'box');
    window.onscroll = function () {
        if (checkScrollSlide()) {
            var main = document.getElementById('main');
            main.innerHTML += main.innerHTML;
            waterfall('main', 'box');
        }
    }
}

function waterfall(parent, box) {
    var oParent = document.getElementById(parent);
    var oBoxs = oParent.getElementsByClassName(box);
    //计算列数
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    var mainleft = Math.floor((document.documentElement.clientWidth - cols * oBoxW) / 2);
    //居中
    oParent.style.paddingLeft = mainleft + 'px';
    //设置main宽度
    oParent.style.width = oBoxW * cols + 'px';
    var hArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            //console.log(hArr);
            var index = getMinhIndex(hArr);
            var minH = hArr[index];
            //console.log('m:' + index + ':' + oBoxs[index].offsetLeft)
            hArr[index] += oBoxs[i].offsetHeight;
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
        }
    }
}

//获取高度数组最小值的下标
function getMinhIndex(arr) {
    var min = arr[0];
    var mini = 0;
    for (var i in arr) {
        if (min > arr[i]) {
            mini = i;
            min = arr[i];
        }
    }
    return mini;
}

//滚动加载条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxs = oParent.getElementsByClassName('box');
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
}