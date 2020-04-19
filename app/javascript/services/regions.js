import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allRegionsUrl = '/api/regions'
export const getAllRegions = () => axios.get(allRegionsUrl, authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)
export const createRegion = region => axios.post(allRegionsUrl, {region}, authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)