import _ from 'lodash'
import queryString from 'query-string'
import log from './logcat'

function parseQuery(query){
  var obj = {}, v, name, index, key
  for(var i in query){
    v = /^(\w+)\[(\d+)?\](\[(\w+)\])?$/.exec(i)
    if(v){
      name = v[1]; index = v[2]; key = v[4]
      if(!key){
        obj[name] = query[i]
      }else{
        obj[name] = obj[name] || []
        obj[name][index] = obj[name][index] || {}
        obj[name][index][key] = query[i]
      }
    }else{
      obj[i] = query[i]
    }
  }
  return obj
}

const setJsonp = function(ctx, rtnData) {
  const {query} = ctx.request;
  let callbackName = query.callback || 'callback'
  let composeData = Object.assign({status: 0, msg: 'success'}, rtnData.data ? rtnData : {data: rtnData} )
  ctx.type = 'text/javascript'
  ctx.body = `${callbackName}(${JSON.stringify(composeData)})`
}

export {
    getUserInfo,
    parseQuery,
    setJsonp,
    log
}
