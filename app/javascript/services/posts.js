import axios from 'axios'
import {jsonRequestHeader} from './requests'

const allPostsURL = '/api/posts'
const onePostURL = postID => `${allPostsURL}/${postID}`
const postCommentsURL = postID => `${allPostsURL}/${postID}/comments`

export const getAllPosts = axios.get(allPostsURL, {headers: jsonRequestHeader})
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(error => ({
      error: error,
      data: null,
  }))

export const getOnePost = (postID) => axios.get(onePostURL(postID), {headers: jsonRequestHeader})
  .then(r => r.data)
  .then(data => ({
      data: data,
      error: null,
  }))
  .catch(error => ({
      error: error,
      data: null,
  }))

export const getPostComments = (postId) => axios.get(
    postCommentsURL(postId),
    {headers: jsonRequestHeader}
).then(r => r.data)
.then(data => ({
    data: data,
    error: null,
}))
.catch(error => ({
    error: error, 
    data: null,
}))