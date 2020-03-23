import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allTagsURL = '/api/tags'
const oneTagUrl = id => `${allTagsURL}/${id}`

export const deleteTag = id => axios.delete(oneTagUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)
