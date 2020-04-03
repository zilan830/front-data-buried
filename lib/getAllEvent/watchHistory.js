"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//监听路由变化相关
var Dep = /** @class */ (function () {
    // 订阅池
    function Dep() {
        this.id = new Date(); //这里简单的运用时间戳做订阅池的ID
        this.subs = []; //该事件下被订阅对象的集合
    }
    Dep.prototype.defined = function () {
        // 添加订阅者
        Dep['watch'].add(this);
    };
    Dep.prototype.notify = function () {
        //通知订阅者有变化
        this.subs.forEach(function (e) {
            if (typeof e.update === 'function') {
                try {
                    e.update.apply(e); //触发订阅者更新函数
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    };
    return Dep;
}());
Dep['watch'] = null;
var Watch = /** @class */ (function () {
    function Watch(name, fn) {
        this.name = name; //订阅消息的名称
        this.id = new Date(); //这里简单的运用时间戳做订阅者的ID
        this.callBack = fn; //订阅消息发送改变时->订阅者执行的回调函数
    }
    Watch.prototype.add = function (dep) {
        //将订阅者放入dep订阅池
        dep.subs.push(this);
    };
    Watch.prototype.update = function () {
        //将订阅者更新方法
        var cb = this.callBack; //赋值为了不改变函数内调用的this
        cb(this.name);
    };
    return Watch;
}());
var textReg = /↵|^().{10,}/g;
exports.clickMethod = function () {
    var clickDep = new Dep();
    return function (name) {
        if (name === 'listenClick') {
            return function (name, fn) {
                var event = new Watch(name, fn);
                Dep['watch'] = event;
                clickDep.defined();
                Dep['watch'] = null;
            };
        }
        else if (name === 'getClick') {
        }
    };
};
//监听事件
var listenClick = function () {
    //点击事件数组
    var contentParams = [];
    //监听点击事件
    document.addEventListener('click', function (e) {
        console.log("???", e);
        var nowDate = Date.now(); //当前时间戳
        //判断e是否有，如果没有获取到不获取
        if (JSON.stringify(e) !== '{}') {
            var offsetX = e.offsetX, offsetY = e.offsetY, path = e.path, innerText = e.target.innerText;
            var textArray = innerText.match(textReg);
            var pathArray_1 = [];
            if (path.length > 0) {
                path.forEach(function (item) {
                    var className = item.className, nodeName = item.nodeName;
                    if (className) {
                        pathArray_1.push(item.className);
                    }
                    else if (nodeName) {
                        pathArray_1.push(item.nodeName);
                    }
                });
            }
            var contentObj = {
                // eslint-disable-next-line @typescript-eslint/camelcase
                offset_x: offsetX,
                // eslint-disable-next-line @typescript-eslint/camelcase
                offset_y: offsetY,
                element: {
                    //判断inntext 长度是否大于10 或者含有 ↵ 回车键。如果有，则不保存
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    inner_html: textArray && textArray.length > 0 ? innerText : '',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    to_element: pathArray_1,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    h_b: pathArray_1.length > 0 && pathArray_1.filter(function (item) { return item.includes('btn') || item.includes('menu'); }).length > 0
                }
            };
            //点击事件内容
            contentParams.push({
                event: 'click',
                time: nowDate,
                content: contentObj
            });
            console.log("contentParams", contentParams);
        }
    });
    return contentParams;
};
var historyMethod = function () {
    var historyDep = new Dep();
    return function (name) {
        if (name === 'historychange') {
            return function (name, fn) {
                var event = new Watch(name, fn);
                Dep['watch'] = event;
                historyDep.defined();
                Dep['watch'] = null; //置空供下一个订阅者使用
            };
        }
        else if (name === 'pushState' || name === 'replaceState') {
            var method_1 = history[name];
            return function () {
                method_1.apply(history, arguments);
                historyDep.notify();
            };
        }
    };
};
exports.default = historyMethod;
