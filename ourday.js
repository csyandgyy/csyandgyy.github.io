
window.onload = initNumXY(200, 160, 40, 40);
var hour_line = document.getElementById("hour-line");
var minute_line = document.getElementById("minute-line");
var second_line = document.getElementById("second-line");
var date_info = document.getElementById("date-info");
var flip = document.getElementById('flip');
var backNode = document.querySelector('.back');
var frontNode = document.querySelector('.front');

// 当前数字
var count = 0;
// 是否正在翻转（防止翻转未结束就进行下一次翻转）
var isFlipping = false;
/*
var week_day = [
'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
*/
var week_day = [
    'Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'
];
var hour_time = document.getElementById("hour-time");
var minute_time = document.getElementById("minute-time");
var second_time = document.getElementById("second-time");


function flipDown() {
    // 如果处于翻转中，则不执行
    if (isFlipping) {
        return false;
    }
    // 设置前牌的文字
    frontNode.setAttribute('class', 'digital front number' + count);
    // 计算后牌文字（越界判断）
    var nextCount = count >= 9 ? 0 : (count + 1);
    // 设置后牌的文字
    backNode.setAttribute('class', 'digital back number' + nextCount);
    // 添加go，执行翻转动画
    flip.setAttribute('class', 'flip down go');
    // 当翻转态设置为true
    isFlipping = true;
    // 翻转结束后，恢复状态
    setTimeout(function () {
        // 去掉go
        flip.setAttribute('class', 'flip down');
        // 当翻转态设置为false
        isFlipping = false;
        // 设置前牌文字为+1后的数字
        frontNode.setAttribute('class', 'digital front number' + nextCount);
        // 更新当前文字
        count = nextCount;
    }, 1000)
}

/* 时钟代码 */
// 时钟翻牌
class Flipper {
    constructor(config) {
        // 默认配置
        this.config = {
            // 时钟模块的节点
            node: null,
            // 初始前牌文字
            frontText: 'number0',
            // 初始后牌文字
            backText: 'number1',
            // 翻转动画时间（毫秒，与翻转动画CSS 设置的animation-duration时间要一致）
            duration: 600
        };
        // 节点的原本class，与html对应，方便后面添加/删除新的class
        this.nodeClass = {
            flip: 'flip',
            front: 'digital front',
            back: 'digital back'
        };
        // 覆盖默认配置
        Object.assign(this.config, config);
        // 定位前后两个牌的DOM节点
        this.frontNode = this.config.node.querySelector('.front');
        this.backNode = this.config.node.querySelector('.back');
        // 是否处于翻牌动画过程中（防止动画未完成就进入下一次翻牌）
        this.isFlipping = false;
        // 初始化
        this._init();
    }
    // 初始化
    _init() {
        // 设置初始牌面字符
        this._setFront(this.config.frontText);
        this._setBack(this.config.backText);
    }
    // 设置前牌文字
    _setFront(className) {
        this.frontNode.setAttribute('class', this.nodeClass.front + ' ' + className);
    }
    // 设置后牌文字
    _setBack(className) {
        this.backNode.setAttribute('class', this.nodeClass.back + ' ' + className);
    }
    _flip(type, front, back) {
        // 如果处于翻转中，则不执行
        if (this.isFlipping) {
            return false;
        }
        // 设置翻转状态为true
        this.isFlipping = true;
        // 设置前牌文字
        this._setFront(front);
        // 设置后牌文字
        this._setBack(back);
        // 根据传递过来的type设置翻转方向
        var flipClass = this.nodeClass.flip;
        if (type === 'down') {
            flipClass += ' down';
        } else {
            flipClass += ' up';
        }
        // 添加翻转方向和执行动画的class，执行翻转动画
        this.config.node.setAttribute('class', flipClass + ' go');
        // 根据设置的动画时间，在动画结束后，还原class并更新前牌文字
        setTimeout(() => {
            // 还原class
            this.config.node.setAttribute('class', flipClass);
            // 设置翻转状态为false
            this.isFlipping = false;
            // 将前牌文字设置为当前新的数字，后牌因为被前牌挡住了，就不用设置了。
            this._setFront(back);
        }, this.config.duration);
    }
    // 下翻牌
    flipDown(front, back) {
        this._flip('down', front, back);
    }
}

function setTime() {
    var this_day = new Date();
    var startDate = new Date(2020, 8, 25);
    var hour = (this_day.getHours() >= 12) ?
        (this_day.getHours() - 12) : this_day.getHours();
    var minute = this_day.getMinutes();
    var second = this_day.getSeconds();
    var hour_rotate = (hour * 30 - 90) + (Math.floor(minute / 12) * 6);
    var year = this_day.getFullYear();
    var month = ((this_day.getMonth() + 1) < 10) ?
        "0" + (this_day.getMonth() + 1) : (this_day.getMonth() + 1);
    var date = (this_day.getDate() < 10) ?
        "0" + this_day.getDate() : this_day.getDate();
    var day = this_day.getDay();
    hour_line.style.transform = 'rotate(' + hour_rotate + 'deg)';
    minute_line.style.transform = 'rotate(' + (minute * 6 - 90) + 'deg)';
    second_line.style.transform = 'rotate(' + (second * 6 - 90) + 'deg)';
    date_info.innerHTML =
        year + "-" + month + "-" + date + " " + week_day[day];
    hour_time.innerHTML = (this_day.getHours() < 10) ?
        "0" + this_day.getHours() : this_day.getHours();
    minute_time.innerHTML = (this_day.getMinutes() < 10) ?
        "0" + this_day.getMinutes() : this_day.getMinutes();
    second_time.innerHTML = (this_day.getSeconds() < 10) ?
        "0" + this_day.getSeconds() : this_day.getSeconds();
    
    // 获取当前时间
    var flips = clock_flip.querySelectorAll('.flip');
    var flipObjs = [];
    var pass_day = Math.floor((this_day - startDate) / 86400000);
    var day_str = pass_day.toString().padStart(4, '0');
    for (var i = 0; i < flips.length; i++) {
        // 创建6个Flipper实例，并初始化
        flipObjs.push(new Flipper({
            // 每个flipper实例按数组顺序与翻板DOM的顺序一一对应
            node: flips[i],
            // 按数组顺序取时间字符串对应位置的数字
            frontText: 'number' + day_str[i],
            backText: 'number' + day_str[i]
        }));
        
    }

    for (var i = 0; i < flipObjs.length; i++) {
        if (this_day.getHours() === 23 && this_day.getMinutes() === 59 && this_day.getSeconds() === 59) {
            var new_pass_day = pass_day + 1;
            var new_day_str = new_pass_day.toString().padStart(4, '0');
            flipObjs[i].flipDown('number' + new_day_str[i], 'number' + new_day_str[i]);
        }
        else {
            continue;
        }
    }
}
setInterval(setTime, 1000);
function initNumXY(R, r, w, h) {
    var numXY = [
        {
            "left": R + 0.5 * r - 0.5 * w,
            "top": R - 0.5 * r * 1.73205 - 0.5 * h
        },
        {
            "left": R + 0.5 * r * 1.73205 - 0.5 * w,
            "top": R - 0.5 * r - 0.5 * h
        },
        {
            "left": R + r - 0.5 * w,
            "top": R - 0.5 * h
        },
        {
            "left": R + 0.5 * r * 1.73205 - 0.5 * w,
            "top": R + 0.5 * r - 0.5 * h
        },
        {
            "left": R + 0.5 * r - 0.5 * w,
            "top": R + 0.5 * r * 1.732 - 0.5 * h
        },
        {
            "left": R - 0.5 * w,
            "top": R + r - 0.5 * h
        },
        {
            "left": R - 0.5 * r - 0.5 * w,
            "top": R + 0.5 * r * 1.732 - 0.5 * h
        },
        {
            "left": R - 0.5 * r * 1.73205 - 0.5 * w,
            "top": R + 0.5 * r - 0.5 * h
        },
        {
            "left": R - r - 0.5 * w,
            "top": R - 0.5 * h
        },
        {
            "left": R - 0.5 * r * 1.73205 - 0.5 * w,
            "top": R - 0.5 * r - 0.5 * h
        },
        {
            "left": R - 0.5 * r - 0.5 * w,
            "top": R - 0.5 * r * 1.73205 - 0.5 * h
        },
        {
            "left": R - 0.5 * w,
            "top": R - r - 0.5 * h
        }
    ];
    var clock = document.getElementById("clock");
    for (var i = 1; i <= 12; i++) {
        if (i % 3 == 0) {
            clock.innerHTML += "<div class='clock-num em_num'>" + i + "</div>";
        } else {
            clock.innerHTML += "<div class='clock-num'>" + i + "</div>";
        }
    }
    var clock_num = document.getElementsByClassName("clock-num");
    for (var i = 0; i < clock_num.length; i++) {
        clock_num[i].style.left = numXY[i].left + 'px';
        clock_num[i].style.top = numXY[i].top + 'px';
    }
    for (var i = 0; i < 60; i++) {
        clock.innerHTML += "<div class='clock-scale'> " +
            "<div class='scale-hidden'></div>" +
            "<div class='scale-show'></div>" +
            "</div>";
    }
    var scale = document.getElementsByClassName("clock-scale");
    for (var i = 0; i < scale.length; i++) {
        scale[i].style.transform = "rotate(" + (i * 6 - 90) + "deg)";
    }
}

