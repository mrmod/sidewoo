<template>
  <div id='posts'>
      <PostList :posts='posts' />
  </div>
</template>
<script>
import PostList from './PostList.vue'
import {getAllPosts} from '../services/posts'
export default {
    name: 'Posts',
    components: { PostList },
    data: function() {
        return {
            posts: [],
        }
    },
   created: function() {
       getAllPosts().then(r => this.posts = r.data)
   }
}
</script>

<style >

</style>