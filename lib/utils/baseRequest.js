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
var axios_1 = __importDefault(require("axios"));
//请求默认值
var requestDefault = {
    root: 'http://192.168.12.53:8080/',
    url: '',
    type: 'POST',
    data: {},
    timeOut: 100000,
    isFormData: false //是否式formdata格式，默认不是
};
var baseRequest = function (requestObj) {
    var newRequest = __assign(__assign({}, requestDefault), requestObj);
    var root = newRequest.root, url = newRequest.url, type = newRequest.type, data = newRequest.data, timeOut = newRequest.timeOut, isFormData = newRequest.isFormData;
    var headers = { 'Content-Type': 'application/json' };
    if (isFormData) {
        headers['Content-Type'] = 'multipart/form-data';
    }
    var options = {
        baseURL: root,
        url: url,
        method: type,
        headers: headers,
        timeOut: timeOut
    };
    if (type === 'GET' || type === 'DELETE') {
        options.params = data;
    }
    else {
        options.data = data;
    }
    return axios_1.default(options).then(function (response) {
        var headers = response.headers, data = response.data, status = response.status;
        var contentType = headers['content-type'];
        if (status !== 200) {
            return Promise.reject(new Error('服务请求失败'));
        }
        else {
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return Promise.resolve(data);
            }
            else {
                return Promise.reject(new Error('the response is not JSON'));
            }
        }
    }).catch(function (e) {
        console.log("e", e);
        return Promise.reject(new Error('请求失败'));
    });
};
exports.default = baseRequest;
