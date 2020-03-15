import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allPostsURL = '/api/posts'
const onePostUrl = postID => `${allPostsURL}/${postID}`
const postCommentsURL = postID => `${allPostsURL}/${postID}/comments`

export const getAllPosts = () => axios.get(allPostsURL, authorizedJSONHeaders)
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(railsErrorHandler)

export const getOnePost = (postID) => axios.get(onePostUrl(postID), authorizedJSONHeaders)
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
    onePostUrl(postId),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
    data: data,
    error: null
  }))
  .catch(railsErrorHandler)

export const updatePost = (id, post) => axios.put(
    onePostUrl(id),
    {post},
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
    data: data,
    error: null
  }))
  .catch(railsErrorHandler)

const postMediaUrl = id => `${onePostUrl(id)}/media`
export const addMedia = (id, mediaFile) => {
  const data = new FormData()
  data.append('file', mediaFile)
  return axios.post(
    postMediaUrl(id),
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
    postMediaUrl(id),
    authorizedJSONHeaders
  )
  .then(r => r.data)
  .then(data => ({
    data: data, 
    error: null,
  }))
  .catch(railsErrorHandler)