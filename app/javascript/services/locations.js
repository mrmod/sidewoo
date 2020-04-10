import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allLocationsUrl = '/api/locations'
const oneLocationUrl = id => `${allLocationsUrl}/${id}`
const regionUrl = id => `${oneLocationUrl(id)}/region`
export const updateLocation = location => {
    let id = location.id
    delete location.id
    return axios.put(
        oneLocationUrl(id), {location}, authorizedJSONHeaders
    )
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)
}

export const getRegion = id => axios.get(regionUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)