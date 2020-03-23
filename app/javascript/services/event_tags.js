import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allTagsUrl = eventId => `/api/events/${eventId}/tags`
const oneTagUrl = (eventId, tagId) => `${allTagsUrl(eventId)}/${tagId}`

export const allTags = id => axios.get(allTagsUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const deleteTag = (eventId, tagId) => axios.delete(oneTagUrl(eventId, tagId), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const addTag = (eventId, tag) => axios.post(allTagsUrl(eventId), {tag}, authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)