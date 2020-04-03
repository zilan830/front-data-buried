"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { PostData } from './postData'
//import HistoryMethod from './watchHistory'
var handleTitle_1 = require("./handleTitle");
var index_1 = __importDefault(require("./../api/index"));
var watchClick_1 = require("./watchClick");
/* eslint-disable camelcase */
//const textReg = /↵|^().{10,}/g
/**
 *
 * 1、首次进入录入时间 //监听进入页面的事件放到项目里
 * 2、路由跳转上传并重新录入时间
 * 3、关闭上传
 */
var getAllEvent = function (infoObj) {
    console.log("infoObj", infoObj);
    //初次加载
    // window.onload = () => {
    //     console.log("看看这个")
    // }
    var initClick = watchClick_1.WatchClick();
    //点击事件数组
    var contentParams = [];
    var eventParams = __assign({ atom_id: '11111', page_title: '页面', soft_name: '', pre_title: '', screen_x: 11, screen_y: 222, events: contentParams, load_time: Date.now(), up_time: Date.now(), root: '', url: '' }, infoObj);
    //首次进入录入 通过监听title变化 放弃路由变化 留作后用
    //加载监听（监听page_title,load_time）
    // const addHistoryMethod = HistoryMethod()
    // window['addHistoryListener'] = addHistoryMethod('historychange')
    // history.pushState = addHistoryMethod('pushState')
    // history.replaceState = addHistoryMethod('replaceState')
    // window['addHistoryListener']('history', function () {
    //     //整合数据
    //     eventParams.events = contentParams
    //     PostData(eventParams)
    // })
    //关闭页面上传数据
    window.onbeforeunload = function () {
        //整合数据
        //eventParams.events = contentParams
        eventParams.events = initClick('get');
        eventParams.up_time = Date.now();
        index_1.default.postData(__assign({}, eventParams)).then(function (res) {
            console.log("res....", res);
        }).catch(function (e) {
            console.log("e", e);
        });
        //return true
    };
    var targetNode = document.getElementsByTagName('title')[0];
    var config = { childList: true };
    var clearData = function (preTitle, nowTitle) {
        //无论成功与否都需要清空相关数据
        //清空event数组
        contentParams.length = 0;
        eventParams.load_time = Date.now();
        eventParams.pre_title = preTitle; //为下次传入做准备
        eventParams.page_title = nowTitle; //因为是变化后的数据整理，因此传输的数据内容是上个title的数据
    };
    //监听document.title变化
    var callback = function (mutationsList) {
        //处理dom数据，根据变化前后判断，传输数据内容
        var _a = handleTitle_1.HandleDomData(mutationsList), preTitle = _a.preTitle, nowTitle = _a.nowTitle;
        //整合数据
        //eventParams.events = contentParams
        eventParams.events = initClick('get');
        if (!eventParams.pre_title) {
            eventParams.page_title = preTitle; //若是初始化页面，则需要赋值当前title
        }
        eventParams.up_time = Date.now();
        index_1.default.postData(__assign({}, eventParams)).then(function (res) {
            console.log("res....", res);
            clearData(preTitle, nowTitle);
            initClick('end');
        }).catch(function (e) {
            console.log("e", e);
            clearData(preTitle, nowTitle);
            initClick('end');
        });
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
};
exports.default = getAllEvent;
