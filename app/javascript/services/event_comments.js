import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allCommentsUrl = eventId => `/api/events/${eventId}/comments`
const oneCommentUrl = (eventId, commentId) => `${allComentsUrl(eventId)}/${commentId}`

export const allComments = id => axios.get(allCommentsUrl(id), authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const createComment = (eventId, comment) => axios.post(
    allCommentsUrl(eventId),
    {comment},
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const deleteComment = (eventId, commentId) => axios.delete(
    oneCommentUrl(eventId, commentId),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const updateComment = (eventId, commentId, comment) => axios.put(
    oneCommentUrl(eventId, commentId),
    {comment},
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)