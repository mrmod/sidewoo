// TODO: Load key from configuration
const API_KEY = "GOOGLE_API_CREDENTIALS"
const CALLBACK = "libraryLoaded"

let initialized = !!window.google
let resolveLoading
let rejectLoading

export default new Promise((resolve, reject) => {
    if (initialized) {
        resolve(window.google)
        return
    }

    initialized = true
    window[CALLBACK] = () => resolve(window.google)
    const src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=drawing&callback=${CALLBACK}`
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = src
    script.onerror = reject

    document.querySelector('head').appendChild(script)
})