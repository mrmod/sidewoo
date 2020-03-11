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