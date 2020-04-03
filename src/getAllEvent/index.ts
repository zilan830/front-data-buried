/* eslint-disable camelcase */
import { AllEventObject, EventsObject, ContentObject, OptionsObject } from './../utils/defaultParam'
//import { PostData } from './postData'
//import HistoryMethod from './watchHistory'
import { HandleDomData } from './handleTitle'
import Api from './../api/index'
import { WatchClick } from './watchClick'
/* eslint-disable camelcase */

//const textReg = /↵|^().{10,}/g

/**
 * 
 * 1、首次进入录入时间 //监听进入页面的事件放到项目里
 * 2、路由跳转上传并重新录入时间
 * 3、关闭上传
 */

const getAllEvent = (infoObj: OptionsObject): void => {

    console.log("infoObj", infoObj)

    //初次加载
    // window.onload = () => {
    //     console.log("看看这个")
    // }
    const initClick = WatchClick()

    //点击事件数组
    const contentParams: Array<EventsObject> = []

    const eventParams: AllEventObject = {
        atom_id: '11111',
        page_title: '页面',
        soft_name: '',
        pre_title: '',
        screen_x: 11,
        screen_y: 222,
        events: contentParams,
        load_time: Date.now(),
        up_time: Date.now(),
        root: '',
        url: '',
        //应含有atom_id,soft_name,screen_x,screen_y,load_time
        ...infoObj
    }

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
    window.onbeforeunload = () => {
        //整合数据
        //eventParams.events = contentParams
        eventParams.events = initClick('get')
        eventParams.up_time = Date.now()
        Api.postData({ ...eventParams }).then(res => {
            console.log("res....", res)
        }).catch(e => {
            console.log("e", e)
        })
        return true
    }

    //监听document.title变化
    const callback = (mutationsList: any, observer: any) => {
        //处理dom数据，根据变化前后判断，传输数据内容
        const { preTitle, nowTitle } = HandleDomData(mutationsList)
        //整合数据
        //eventParams.events = contentParams
        eventParams.events = initClick('get')
        if (!eventParams.pre_title) {
            eventParams.page_title = preTitle //若是初始化页面，则需要赋值当前title
        }
        eventParams.up_time = Date.now()
        Api.postData({ ...eventParams }).then(res => {
            console.log("res....", res)
            clearData(preTitle, nowTitle)
            initClick('end')
        }).catch(e => {
            console.log("e", e)
            clearData(preTitle, nowTitle)
            initClick('end')

        })

    }
    const observer = new MutationObserver(callback)
    const targetNode: any = document.getElementsByTagName('title')[0]
    const config = { childList: true }
    observer.observe(targetNode, config)

    const clearData = (preTitle: string, nowTitle: string) => {
        //无论成功与否都需要清空相关数据
        //清空event数组
        contentParams.length = 0
        eventParams.load_time = Date.now()
        eventParams.pre_title = preTitle //为下次传入做准备
        eventParams.page_title = nowTitle //因为是变化后的数据整理，因此传输的数据内容是上个title的数据
    }


    // //监听点击事件
    // document.addEventListener('click', (e: any): void => {
    //     const nowDate: number = Date.now() //当前时间戳
    //     //判断e是否有，如果没有获取到不获取
    //     if (JSON.stringify(e) !== '{}') {

    //         const { offsetX, offsetY, path, target: { innerText } } = e
    //         const textArray = innerText.match(textReg)
    //         const pathArray: Array<string> = []

    //         if (path.length > 0) {
    //             path.forEach(item => {
    //                 const { className, nodeName } = item
    //                 if (className) {
    //                     pathArray.push(item.className)
    //                 } else if (nodeName) {
    //                     pathArray.push(item.nodeName)
    //                 }

    //             })
    //         }
    //         const contentObj: ContentObject = {
    //             // eslint-disable-next-line @typescript-eslint/camelcase
    //             offset_x: offsetX,
    //             // eslint-disable-next-line @typescript-eslint/camelcase
    //             offset_y: offsetY,
    //             element: {
    //                 //判断inntext 长度是否大于10 或者含有 ↵ 回车键。如果有，则不保存
    //                 // eslint-disable-next-line @typescript-eslint/camelcase
    //                 inner_html: textArray && textArray.length > 0 ? innerText : '',
    //                 // eslint-disable-next-line @typescript-eslint/camelcase
    //                 to_element: pathArray,
    //                 // eslint-disable-next-line @typescript-eslint/camelcase
    //                 h_b: pathArray.length > 0 && pathArray.filter(item => item.includes('btn') || item.includes('menu')).length > 0
    //             }
    //         }
    //         //点击事件内容
    //         contentParams.push({
    //             event: 'click',
    //             time: nowDate,
    //             content: contentObj
    //         })

    //         console.log("contentParams", contentParams)
    //     }

    // })
}



export default getAllEvent