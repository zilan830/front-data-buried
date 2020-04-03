
import { DomReturnObject } from './../utils/defaultParam'

//处理dom数据
export const HandleDomData = (mutationsList: any): DomReturnObject => {
    const { target: { text }, removedNodes } = mutationsList[0]
    const removedTitle = removedNodes[0].data
    const returnObj: DomReturnObject = {
        preTitle: removedTitle,//之前的title
        nowTitle: text//当前的title
    }
    return returnObj
}





