import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allPostsURL = '/api/posts'
const onePostURL = postID => `${allPostsURL}/${postID}`
const postCommentsURL = postID => `${allPostsURL}/${postID}/comments`

export const getAllPosts = () => axios.get(allPostsURL, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const getOnePost = (postID) => axios.get(onePostURL(postID), authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const getPostComments = (postId) => axios.get(
    postCommentsURL(postId),
    authorizedJSONHeaders
  ).then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const createPost = post => axios.post(allPostsURL, {post}, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
    data: data,
    error: null
  }))
  .catch(railsErrorHandler)

export const deletePost = (postId) => axios.delete(
    onePostURL(postId),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
    data: data,
    error: null
  }))
  .catch(railsErrorHandler)