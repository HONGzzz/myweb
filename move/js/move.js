function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //属性是否全部运行完的标志
        var flag = true;
        for (attr in json) {
            //当前的值
            var curattr = 0;
            var target = json[attr];
            if (attr == 'opacity') {
                curattr = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                curattr = parseInt(getStyle(obj, attr));
            }
            //计算速度
            var speed = (target - curattr) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //检测停止
            if (curattr != json[attr]) {
                flag = false;
            }
            if (attr == 'opacity') {
                //obj.style.filter = 'alpha(opacity:' + (curattr + speed) + ')';
                obj.style.opacity = (curattr + speed) / 100;
            }
            else {
                obj.style[attr] = curattr + speed + 'px';
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }
    }, 30);
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}