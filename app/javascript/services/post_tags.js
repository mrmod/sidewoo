import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allTagsUrl = postId => `/api/posts/${postId}/tags`

export const allTags = id => axios.get(allTagsUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)

export const addTag = (postId, tag) => axios.post(allTagsUrl(postId), {tag}, authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)