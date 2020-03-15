<template>
    <div id="post-list">
        <AddPost v-on:addedPost='$emit("reloadPosts")' />
        <Post
          :loadMedia='true'
          :post='post'
          :isEditable='false' 
          v-for='post in posts'
          :key='post.id' />
    </div>
</template>
<script>
import Post from './Post.vue'
import AddPost from './AddPost.vue'
export default {
    name: 'PostList',
    props: {
        posts: Array,
    },
    components: { AddPost, Post },
    data: () => {
        return {
        }
    }
}
</script>