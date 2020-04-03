# 数据埋点

### 安装
`npm install front-data-buried` 或 `yarn add front-data-buried`

### 必传参数

```
interface ContentObject {
    offset_x: number;//点击位移x
    offset_y: number;//点击位移y
    element: {
        to_element: Array<string>;//路径
        inner_html: string;//内包含文字
        h_b: boolean;//是否有业务功能
    };
}

interface EventsObject {
    event: string;//事件类型
    time: number;//点击时间
    content: ContentObject; //点击内容
}

interface AllEventObject {
    page_title: string; //当前页面名称
    pre_title: string; //来源页面
    atom_id: string;//用户全局唯一id
    soft_name: string;//项目名称
    screen_x: number;//设备宽度
    screen_y: number;//设备高度
    events: Array<EventsObject>;//监听事件获取的数据
    load_time: number;//页面初次进入时间
    up_time: number;//报文上报事件
}
```

### 使用方法

在路由页或可以全局监听并获取用户信息的页面注入
```
import {GetAllEvent} from 'front-data-buried'

const eParams = {
    atom_id: '',//用户唯一标识
    soft_name: 'refee_1',//手机端续费:refee_1,车机:refee_2
    screen_x: window.screen.availWidth,
    screen_y: window.screen.availHeight,
    load_time: Date.now(),
    root:'',//请求根路由
    url:'',//请求路径
}
GetAllEvent({ ...eParams })
```