import fetch from 'isomorphic-fetch'
// import API from '../constants/FetchApis'
import * as API from '../constants/FetchApis'

export const fetchApi = (methodName, req, method = 'GET') => {
    fetch('/api/' + API[methodName], {
        method: method,
        cache: 'default',
        // credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    })
    .then(response => {
        if (response.status >= 400) {
            throw("Bad response from server")
        }
        return response.json()
    })
}

export const fetchData = (methodName, req, method) => fetchApi(methodName, req, method)