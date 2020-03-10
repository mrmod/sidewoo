import axios from 'axios'
import {authorizedJSONHeaders} from './requests'
const allCommentsURL = '/api/comments'
const oneCommentURL = commentID => `/api/comments/${commentID}`

export const createComment = comment => axios.post(allCommentsURL, {comment}, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(error => ({
      error: error,
      data: null,
  }))


export const deleteComment = id => axios.delete(oneCommentURL(id), authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(error => ({
      error: error,
      data: null,
  }))