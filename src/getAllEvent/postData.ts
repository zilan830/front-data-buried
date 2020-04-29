import { AllEventObject } from './../utils/defaultParam'
import Api from './../api/index'

export const PostData = (eventParams: AllEventObject) =>{
    Api.postData({...eventParams}).then(res => {
        //console.log("res....", res)
    }).catch(e => {
        //console.log("e", e)
    })
}