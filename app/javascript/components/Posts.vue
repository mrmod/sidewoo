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
    computed: {
        posts() {
            return this.$store.getters.posts
        },
    },
    created: function() {
        this.$store.dispatch('getRegionalPosts', this.$store.state.currentUser.region.id)
    }
}
</script>

<style >

</style>