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
var baseRequest_1 = __importDefault(require("./../utils/baseRequest"));
var apis = {};
apis.postData = function (obj) {
    console.log("穷");
    var param = {
        url: 'api/v1/event_track',
        data: __assign({}, obj)
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
