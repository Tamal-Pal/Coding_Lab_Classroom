const customFetch = async (url, { method = 'GET', body = undefined, token = undefined }) => {

    const headers = {}
    console.log('yo')

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    if (body) {
        headers['Content-Type'] = 'application/json'
    }
    console.log(headers)

    return await fetch(url, {
        method: method.toUpperCase(),
        headers: headers,
        body: body,
        credentials: 'include'
    })
}

module.exports = customFetch