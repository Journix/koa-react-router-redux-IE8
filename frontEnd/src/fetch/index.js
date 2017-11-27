import fetch from 'isomorphic-fetch'
// import API from '../constants/FetchApis'
import * as API from '../constants/FetchApis'

export const fetchApi = (methodName, req, method = 'GET',success_cb) => {
    fetch('/api/' + API[methodName], {
        method: method,
        cache: 'default',
        // credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: !!req ? JSON.stringify(req):null
    })
    .then(response => {
        console.log(response)
        if(success_cb){
            success_cb(response)
        }
        if (response.status >= 400) {
            throw("Bad response from server")
        }
        return response.json()
    })
}
