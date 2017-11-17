var makeResponse = function(ret){
    let status = {
        Success:0,
        Failure:1,
        Warning:2,
        PartialFailure:3,
        Error:4 //node层自定义状态， 表通信错误
    },  resStatus = ret && (ret.responseStatus || ret.ResponseStatus)

    let responseStruct = {
        status: resStatus ? status[resStatus.ack || resStatus.Ack] : status.Error,
        msg: 'success'
    }

    switch(responseStruct.status){
        case 1:
        case 2:
        case 3:
            responseStruct.msg = resStatus.errors && resStatus.errors[0].message
            break
        case 4:
            responseStruct.msg = ret
            break
    }
    delete ret.responseStatus
    if(ret && typeof ret === 'object'){
        ret.data = ret.data || ret.content
        ret.data = typeof ret.data === 'string' ? JSON.parse(ret.data) : ret.data
    }
    return Object.assign({}, resStatus?ret:{}, responseStruct)
}

export default {
    makeResponse
}
