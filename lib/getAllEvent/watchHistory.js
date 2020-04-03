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
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                method_1.apply(history, args);
                historyDep.notify();
            };
        }
    };
};
exports.default = historyMethod;
