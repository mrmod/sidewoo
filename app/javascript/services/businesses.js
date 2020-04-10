import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allBusinessesUrl = '/api/businesses'
const oneBusinessUrl = id => `${allBusinessesUrl}/${id}`
const locationsUrl = id => `${oneBusinessUrl(id)}/locations`
const employeesUrl = id => `${oneBusinessUrl(id)}/employees`

export const allBusinesses = () => axios.get(allBusinessesUrl, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const getOneBusiness = id => axios.get(oneBusinessUrl(id), authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const createBusiness = business => axios.post(allBusinessesUrl, {business}, authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const updateOneBusiness = (id, business) => axios.put(
        oneBusinessUrl(id),
        {business},
        authorizedJSONHeaders
    )
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const deleteOneBusiness = id => axios.delete(oneBusinessUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const getLocations = id => axios.get(locationsUrl(id))
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const getEmployees = id => axios.get(employeesUrl(id))
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)