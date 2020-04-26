import { EventsObject, ContentObject } from './../utils/defaultParam'


//const textReg = /↵|^().{10,}/g

export const WatchClick = (): any => {
    const contentParams: Array<EventsObject> = []
    //监听点击事件
    document.addEventListener('click', (e: any): void => {
        //console.log("???", e)
        const nowDate: number = Date.now() //当前时间戳
        //判断e是否有，如果没有获取到不获取
        if (JSON.stringify(e) !== '{}') {
            //console.log("进来了")
            const { offsetX, offsetY, path, target: { innerText } } = e
            //const textArray = innerText.match(textReg)
            //console.log("textArray",textArray)
            const pathArray: Array<string> = []

            if (path.length > 0) {
                path.forEach(item => {
                    const { className, nodeName } = item
                    if (className) {
                        pathArray.push(item.className)
                    } else if (nodeName) {
                        pathArray.push(item.nodeName)
                    }

                })
            }
            const hasBusiness = pathArray.length > 0 && pathArray.filter(item => item.includes('btn') || item.includes('menu')).length > 0
            const contentObj: ContentObject = {
                // eslint-disable-next-line @typescript-eslint/camelcase
                offset_x: offsetX,
                // eslint-disable-next-line @typescript-eslint/camelcase
                offset_y: offsetY,
                element: {
                    //判断inntext 长度是否大于10 或者含有 ↵ 回车键。如果有，则不保存
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    inner_html: hasBusiness ? innerText : '',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    to_element: pathArray,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    h_b: pathArray.length > 0 && pathArray.filter(item => item.includes('button') || item.includes('menu') || item.includes('tab') || item.includes('btn')).length > 0
                }
            }
            //console.log("contentObj", contentObj)
            //点击事件内容
            contentParams.push({
                event: 'click',
                time: nowDate,
                content: contentObj
            })

            //console.log("contentParams!!!!", contentParams)
        }

    }, false)

    return (status: string): any => {
        //console.log("最后导出前", contentParams)
        switch (status) {
            case 'get':
                //console.log("这才是最后导出前", contentParams)
                const returnObj = JSON.parse(JSON.stringify(contentParams))
                //console.log("原来这才是最后导出前", returnObj)
                return returnObj
            case 'end':
                contentParams.length = 0
                break;
            default:
                break;
        }
    }
}
