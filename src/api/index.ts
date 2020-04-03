import baseRequest from './../utils/baseRequest'
import { RequestParams } from './../utils/defaultParam'

interface ApiObj {
    [key: string]: any;
}

const apis: ApiObj = {}



apis.postData = (obj: any): any => {
   const {url,root,...rest} = obj
    const param: RequestParams = {
        url,
        root,
        data: { ...rest }
    }
    return baseRequest({ ...param }).then(
        (res: any) => {
            if (res.code === 200) {
                return res.result
            } else {
                throw res.message
            }
        }
    )
}

export default apis