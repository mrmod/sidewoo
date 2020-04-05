export const resourceId = (route) => {
    let t = typeof(route.params.id)
    if (t === 'number' || t === 'string') {
        return parseInt(route.params.id)
    }
    return null
}