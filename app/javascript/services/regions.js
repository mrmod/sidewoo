import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allRegionsUrl = '/api/regions'
const regionPostsUrl = id => `${allRegionsUrl}/${id}/posts`
const regionEventsUrl = id => `${allRegionsUrl}/${id}/events`
const defaultRegionUrl = `${allRegionsUrl}?default=true`

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

export const getPosts = id => axios.get(regionPostsUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const getEvents = id => axios.get(regionEventsUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const getDefault = () => axios.get(defaultRegionUrl, authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)
