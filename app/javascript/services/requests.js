const getCSRFToken = () => document.querySelector('meta[name="csrf-token"]').getAttribute('content')

export const jsonRequestHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
export const authorizedJSONHeaders = {
    headers: Object.assign({}, jsonRequestHeader, {
        'X-CSRF-Token': getCSRFToken(),
        'authenticity_token': getCSRFToken(),
    })
}