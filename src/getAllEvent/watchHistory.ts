
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


const historyMethod = () => {
    const historyDep = new Dep()
    return (name: string): any => {
        if (name === 'historychange') {
            return (name: string, fn: any) => {
                const event = new Watch(name, fn)
                Dep['watch'] = event
                historyDep.defined()
                Dep['watch'] = null //置空供下一个订阅者使用
            }
        } else if (name === 'pushState' || name === 'replaceState') {
            const method = history[name]
            return (...args) => {
                method.apply(history, args)
                historyDep.notify()
            }
        }
    }
}

export default historyMethod