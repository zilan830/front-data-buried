"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//处理dom数据
exports.HandleDomData = function (mutationsList) {
    var _a = mutationsList[0], text = _a.target.text, removedNodes = _a.removedNodes;
    var removedTitle = removedNodes[0].data;
    var returnObj = {
        preTitle: text,
        nowTitle: removedTitle //当前的title
    };
    return returnObj;
};
