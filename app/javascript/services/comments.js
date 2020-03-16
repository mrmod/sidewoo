import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'
const allCommentsURL = '/api/comments'
const oneCommentUrl = commentID => `/api/comments/${commentID}`

export const createComment = comment => axios.post(allCommentsURL, {comment}, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const deleteComment = id => axios.delete(oneCommentUrl(id), authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const updateComment = (id, comment) => axios.put(oneCommentUrl(id), {comment}, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

const commentMediaUrl = id => `${oneCommentUrl(id)}/media`
export const addMedia = (id, mediaFile) => {
  const data = new FormData()
  data.append('file', mediaFile)
  return axios.post(
    commentMediaUrl(id),
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
    commentMediaUrl(id),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
    data: data, 
    error: null,
  }))
  .catch(railsErrorHandler)