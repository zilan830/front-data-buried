"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textReg = /↵|^().{10,}/g;
exports.WatchClick = function () {
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
    return function (status) {
        console.log("最后导出前", contentParams);
        switch (status) {
            case 'get':
                return contentParams;
            case 'end':
                contentParams.length = 0;
                break;
        }
    };
};
