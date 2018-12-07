let WINDOW_WIDTH = 1400;
let WINDOW_HEIGHT = 768;
let RADIUS = 8;
let MARGIN_TOP = 80;
let MARGIN_LEFT = 200;
let curShowSeconds = 0;

let balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

let timer = null;
let context = null;
let canvas = null;

window.onload = function () {
    WINDOW_HEIGHT = (document.documentElement.clientHeight || document.body.clientHeight) - 4;
    WINDOW_WIDTH = (document.documentElement.clientWidth || document.body.clientWidth) - 4;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 6);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 6 / 108) -1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 4);

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    //获取时间
    curShowSeconds = getcurShowSeconds();
    timer = requestAnimationFrame(updatePic);
}

window.onresize = function(){
    WINDOW_HEIGHT = (document.documentElement.clientHeight || document.body.clientHeight) - 4;
    WINDOW_WIDTH = (document.documentElement.clientWidth || document.body.clientWidth) - 4;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 6);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 6 / 108) -1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 4);
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
}


function getcurShowSeconds() {
    let curTime = new Date();
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    let ret = curTime.getTime() - today.getTime();
    ret = Math.round(ret / 1000);
    return ret > 0 ? ret : 0;
}

function update() {
    let nextShowSeconds = getcurShowSeconds();

    let nexthours = parseInt(nextShowSeconds / 3600);
    let nextminutes = parseInt(nextShowSeconds / 60 % 60);
    let nextseconds = parseInt(nextShowSeconds % 60);

    let curhours = parseInt(curShowSeconds / 3600);
    let curminutes = parseInt(curShowSeconds / 60 % 60);
    let curseconds = parseInt(curShowSeconds % 60);

    if (nextseconds != curseconds) {

        if (parseInt(curhours / 10) != parseInt(nexthours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curhours / 10));
        }
        if (parseInt(curhours % 10) != parseInt(nexthours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours % 10));
        }

        if (parseInt(curminutes / 10) != parseInt(nextminutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes / 10));
        }
        if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes % 10));
        }

        if (parseInt(curseconds / 10) != parseInt(nextseconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curseconds / 10));
        }
        if (parseInt(curseconds % 10) != parseInt(nextseconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curseconds % 10));
        }

        curShowSeconds = nextShowSeconds;

    }

    updateBalls();
}

//小球运动
function updateBalls() {
    for (let i = 0; i < balls.length; i++) {
        let e = balls[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vy += e.g;

        if (e.y >= WINDOW_HEIGHT - RADIUS) {
            e.y = WINDOW_HEIGHT - RADIUS;
            e.vy = -0.7 * e.vy;
        }
    }
    //小球计数器
    let  cnt = 0;
    for (let i = 0; i < balls.length; i++) {
        let e = balls[i];
        if (e.x - RADIUS < WINDOW_WIDTH && e.x + RADIUS > 0) {
            balls[cnt++] = e;
        }
    }
    while (balls.length > Math.min(1000, cnt)) {
        balls.pop();
    }
}
//设置小球
function addBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                let aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 0.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * (Math.random() * 2 + 4),
                    vy: -10,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    let hours = parseInt(curShowSeconds / 3600);
    let minutes = parseInt(curShowSeconds / 60 % 60);
    let seconds = parseInt(curShowSeconds % 60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);

    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);

    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (let i = 0; i < balls.length; i++) {
        let e = balls[i];
        cxt.fillStyle = e.color;
        cxt.beginPath();
        cxt.arc(e.x, e.y, RADIUS, 0, 2 * Math.PI);
        cxt.closePath();

        cxt.fill();

    }

}

function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "rgb(100,102,153)";

    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

}

function updatePic(){
    render(context);
    update();
    requestAnimationFrame(updatePic);
}