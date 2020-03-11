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

export const railsErrorHandler = error => {
    if (error.response) {
      throw {
          error: error.response.data,
          data: null,
      }
  }
  throw {
      error: [{apiRequestError: error.message}],
      data: null,
  }
}