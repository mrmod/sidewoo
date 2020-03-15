import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allEventsURL = '/api/events'
const oneEventUrl = id => `${allEventsURL}/${id}`

export const getAllEvents = () => axios.get(allEventsURL, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const createEvent = event => axios.post(allEventsURL, {event}, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null
  }))
  .catch(railsErrorHandler)

export const deleteEvent = id => axios.delete(oneEventUrl(id), authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const getOneEvent = id => axios.get(oneEventUrl(id), authorizedJSONHeaders)
  .then(r => r.data)
  .then( data => ({
    data: data,
    error: null,
  }))
  .catch(railsErrorHandler)
export const updateEvent = (id, event) => axios.put(
    oneEventUrl(id),
    {event},
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then( data => ({
    data: data,
    error: null,
  }))
  .catch(railsErrorHandler)

const eventMediaUrl = id => `${oneEventUrl(id)}/media`
export const addMedia = (id, mediaFile) => {
  const data = new FormData()
  data.append('file', mediaFile)
  return axios.post(
    eventMediaUrl(id),
    data,
    Object.assign({}, authorizedJSONHeaders, {
      "Content-Type": `multipart/form-data`,
      "Content-Length": `${mediaFile.size}`,
    })
  )
  .then(r => r.data)
  .then(data => ({
    data: data,
    error: null,
  }))
  .catch(railsErrorHandler)
}

export const allMedia = id => axios.get(
    eventMediaUrl(id),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
    data: data, 
    error: null,
  }))
  .catch(railsErrorHandler)