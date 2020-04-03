import { EventsObject, ContentObject } from './../utils/defaultParam'

//监听路由变化相关
class Dep {
    id: Date;
    subs: Array<any>;
    // 订阅池
    constructor() {
        this.id = new Date() //这里简单的运用时间戳做订阅池的ID
        this.subs = [] //该事件下被订阅对象的集合
    }
    defined() {
        // 添加订阅者
        Dep['watch'].add(this)
    }
    notify() {
        //通知订阅者有变化
        this.subs.forEach((e) => {
            if (typeof e.update === 'function') {
                try {
                    e.update.apply(e) //触发订阅者更新函数
                } catch (err) {
                    console.error(err)
                }
            }
        })
    }

}

Dep['watch'] = null

class Watch {
    name: string;
    id: Date;
    callBack: any;
    constructor(name: string, fn: any) {
        this.name = name //订阅消息的名称
        this.id = new Date() //这里简单的运用时间戳做订阅者的ID
        this.callBack = fn //订阅消息发送改变时->订阅者执行的回调函数
    }
    add(dep) {
        //将订阅者放入dep订阅池
        dep.subs.push(this)
    }
    update() {
        //将订阅者更新方法
        const cb = this.callBack //赋值为了不改变函数内调用的this
        cb(this.name)
    }
}

const textReg = /↵|^().{10,}/g

export const clickMethod = () => {
    const clickDep = new Dep()
    
    return (name: string): any => {
        if (name === 'listenClick') {
            return (name: string, fn: any) => {
                const event = new Watch(name, fn)
                Dep['watch'] = event
                clickDep.defined()
                Dep['watch'] = null
            }
        } else if(name === 'getClick'){
            
        }
    }
}

//监听事件
const listenClick = ():Array<EventsObject> =>{
    //点击事件数组
    const contentParams: Array<EventsObject> = []
    //监听点击事件
    document.addEventListener('click', (e: any): void => {
        console.log("???", e)
        const nowDate: number = Date.now() //当前时间戳
        //判断e是否有，如果没有获取到不获取
        if (JSON.stringify(e) !== '{}') {

            const { offsetX, offsetY, path, target: { innerText } } = e
            const textArray = innerText.match(textReg)
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
            const contentObj: ContentObject = {
                // eslint-disable-next-line @typescript-eslint/camelcase
                offset_x: offsetX,
                // eslint-disable-next-line @typescript-eslint/camelcase
                offset_y: offsetY,
                element: {
                    //判断inntext 长度是否大于10 或者含有 ↵ 回车键。如果有，则不保存
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    inner_html: textArray && textArray.length > 0 ? innerText : '',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    to_element: pathArray,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    h_b: pathArray.length > 0 && pathArray.filter(item => item.includes('btn') || item.includes('menu')).length > 0
                }
            }
            //点击事件内容
            contentParams.push({
                event: 'click',
                time: nowDate,
                content: contentObj
            })

            console.log("contentParams", contentParams)
        }

    })
    return contentParams
}



const historyMethod = () => {
    const historyDep = new Dep()
    return (name: string):any => {
        if (name === 'historychange') {
            return (name: string, fn: any) => {
                const event = new Watch(name, fn)
                Dep['watch'] = event
                historyDep.defined()
                Dep['watch'] = null //置空供下一个订阅者使用
            }
        } else if (name === 'pushState' || name === 'replaceState') {
            const method = history[name]
            return () => {
                method.apply(history, arguments)
                historyDep.notify()
            }
        }
    }
}

export default historyMethod