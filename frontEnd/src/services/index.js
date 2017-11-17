import fetch from 'isomorphic-fetch'

export const fetchApi = (methodName, req) => fetch(PAGE_CONFIG.vd + '/api/12808/' + methodName, {
    method: 'POST',
    cache: 'default',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
})
    .then(response => {
        if (response.status >= 400) {
			XLOG.error("Bad response from server")
		}
        return response.json()
    })

export const fetchPriceMatrix = (req) => fetchApi('lowestPrice', req)
