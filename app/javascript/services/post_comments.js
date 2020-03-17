import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allCommentsUrl = postId => `/api/posts/${postId}/comments`
const oneCommentUrl = (postId, commentId) => `${allComentsUrl(postId)}/${commentId}`

export const createComment = (postId, comment) => axios.post(
    allCommentsUrl(postId),
    {comment},
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const deleteComment = (postId, commentId) => axios.delete(
    oneCommentUrl(postId, commentId),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const updateComment = (postId, commentId, comment) => axios.put(
    oneCommentUrl(postId, commentId),
    {comment},
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)