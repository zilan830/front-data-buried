/* eslint-disable camelcase */

//请求参数
export interface RequestParams {
    root?: string;//传输根路径
    url: string;//传输地址，不包过root
    type?: string;//传输类型
    data?: object;//传输内容
    timeOut?: number;//超时时间
    isFormData?: boolean; //是否式formdata格式，默认不是
}

//请求返回定义
export interface AxiosResponse {
    headers: any;
    data: any;
    status: number;
}

export interface OptionsObject {
    [key: string]: any;
}

export interface ContentObject {
    offset_x: number;//点击位移x
    offset_y: number;//点击位移y
    element: {
        to_element: Array<string>;//路径
        inner_html: string;//内包含文字
        h_b: boolean;//是否有业务功能
    };
}

export interface EventsObject {
    event: string;//事件类型
    time: number;//点击时间
    content: ContentObject; //点击内容
}

export interface AllEventObject {
    page_title: string; //当前页面名称
    pre_title: string; //来源页面
    atom_id: string;//用户全局唯一id
    soft_name: string;//项目名称
    screen_x: number;//设备宽度
    screen_y: number;//设备高度
    events: Array<EventsObject>;//监听事件获取的数据
    load_time: number;//页面初次进入时间
    up_time: number;//报文上报事件
    root: string;//请求根路径 （上传前删除）
    url: string; //请求路径 （上传前删除）
}

export interface DomReturnObject {
    preTitle: string;//变化之前的title名称
    nowTitle: string;//当前title
}