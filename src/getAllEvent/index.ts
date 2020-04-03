/* eslint-disable camelcase */
import { AllEventObject, EventsObject, OptionsObject } from './../utils/defaultParam'
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
    window.onbeforeunload = (): void => {
        //整合数据
        //eventParams.events = contentParams
        eventParams.events = initClick('get')
        eventParams.up_time = Date.now()
        Api.postData({ ...eventParams }).then((res: any) => {
            console.log("res....", res)
        }).catch((e: any) => {
            console.log("e", e)
        })
        //return true
    }

    const targetNode: any = document.getElementsByTagName('title')[0]
    const config = { childList: true }

    const clearData = (preTitle: string, nowTitle: string): void => {
        //无论成功与否都需要清空相关数据
        //清空event数组
        contentParams.length = 0
        eventParams.load_time = Date.now()
        eventParams.pre_title = preTitle //为下次传入做准备
        eventParams.page_title = nowTitle //因为是变化后的数据整理，因此传输的数据内容是上个title的数据
    }

    //监听document.title变化
    const callback = (mutationsList: any): void => {
        //处理dom数据，根据变化前后判断，传输数据内容
        const { preTitle, nowTitle } = HandleDomData(mutationsList)
        //整合数据
        //eventParams.events = contentParams
        eventParams.events = initClick('get')
        if (!eventParams.pre_title) {
            eventParams.page_title = preTitle //若是初始化页面，则需要赋值当前title
        }
        eventParams.up_time = Date.now()
        Api.postData({ ...eventParams }).then((res: any) => {
            console.log("res....", res)
            clearData(preTitle, nowTitle)
            initClick('end')
        }).catch((e: any) => {
            console.log("e", e)
            clearData(preTitle, nowTitle)
            initClick('end')

        })

    }

    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
}



export default getAllEvent