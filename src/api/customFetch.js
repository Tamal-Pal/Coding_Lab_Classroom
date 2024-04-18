const customFetch = async ({ url, method = 'GET', body = undefined, token = undefined }) => {

    const headers = {}

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return await fetch(url, {
        method: method.toUpperCase(),
        headers: headers,
        body: body
    })
}

module.exports = customFetch