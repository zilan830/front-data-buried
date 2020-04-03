import axios from 'axios'
import {
    RequestParams,
    AxiosResponse,
    OptionsObject
} from './defaultParam'


//请求默认值
const requestDefault: RequestParams = {
    root: 'http://192.168.12.53:8080/',//传输根路径
    url: '',//传输地址，不包过root
    type: 'POST',//传输类型
    data: {},//传输内容
    timeOut: 100000,//超时时间
    isFormData: false //是否式formdata格式，默认不是
}


const baseRequest = (requestObj: RequestParams): any => {
    const newRequest = { ...requestDefault, ...requestObj }
    const { root, url, type, data, timeOut, isFormData } = newRequest

    const headers = { 'Content-Type': 'application/json' }
    if (isFormData) {
        headers['Content-Type'] = 'multipart/form-data'
    }

    const options: OptionsObject = {
        baseURL: root,
        url,
        method: type,
        headers,
        timeOut
    }

    if (type === 'GET' || type === 'DELETE') {
        options.params = data
    } else {
        options.data = data
    }

    return axios(options).then((response: AxiosResponse) => {
        const { headers, data, status } = response
        const contentType = headers['content-type']
        if (status !== 200) {
            return Promise.reject(new Error('服务请求失败'))
        } else {
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return Promise.resolve(data)
            } else {
                return Promise.reject(new Error('the response is not JSON'))
            }
        }
    }).catch(e => {
        console.log("e",e)
        return Promise.reject(new Error('请求失败'))
      })


}

export default baseRequest