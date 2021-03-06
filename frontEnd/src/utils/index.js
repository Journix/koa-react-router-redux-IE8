// if have any problem, use `query-string` instead
// queryString.stringify and queryString.parse
var param = function (a) {
    var s = [], rbracket = /\[\]$/,
        isArray = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }, add = function (k, v) {
            v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
            s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }, buildParams = function (prefix, obj) {
            var i, len, key;

            if (prefix) {
                if (isArray(obj)) {
                    for (i = 0, len = obj.length; i < len; i++) {
                        if (rbracket.test(prefix)) {
                            add(prefix, obj[i]);
                        } else {
                            buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                        }
                    }
                } else if (obj && String(obj) === '[object Object]') {
                    for (key in obj) {
                        buildParams(prefix + '[' + key + ']', obj[key]);
                    }
                } else {
                    add(prefix, obj);
                }
            } else if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    add(obj[i].name, obj[i].value);
                }
            } else {
                for (key in obj) {
                    buildParams(key, obj[key]);
                }
            }
            return s;
        };

    return buildParams('', a).join('&').replace(/%20/g, '+');
};

function parse(query){
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

const toggle = show => ({display: show ? '' : 'none'})
export {
    param,
    parse,
    toggle
}
