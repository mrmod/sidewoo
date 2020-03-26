import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allMediaUrl = '/api/media'
const oneMediaUrl = id => `${allMediaUrl}/${id}`

export const deleteMedia = id => axios.delete(id, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const getOneMedia = id => axios.get(oneMediaUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)
