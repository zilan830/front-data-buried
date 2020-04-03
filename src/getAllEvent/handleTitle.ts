
import { DomReturnObject } from './../utils/defaultParam'

//处理dom数据
export const HandleDomData = (mutationsList: any): DomReturnObject => {
    const { target: { text }, removedNodes } = mutationsList[0]
    const removedTitle = removedNodes[0].data
    const returnObj: DomReturnObject = {
        preTitle: text,//之前的title
        nowTitle: removedTitle//当前的title
    }
    return returnObj
}





