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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseRequest_1 = __importDefault(require("./../utils/baseRequest"));
var apis = {};
apis.postData = function (obj) {
    //console.log("obj",obj)
    var url = obj.url, root = obj.root, rest = __rest(obj, ["url", "root"]);
    var param = {
        url: url,
        root: root,
        data: __assign({}, rest)
    };
    return baseRequest_1.default(__assign({}, param)).then(function (res) {
        if (res.code === 200) {
            return res.result;
        }
        else {
            throw res.message;
        }
    });
};
exports.default = apis;
