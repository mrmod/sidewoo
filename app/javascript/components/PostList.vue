<template>
    <div id="post-list">
        <AddPost :post='newPost' v-on:addedPost='$emit("reloadPosts")' />
        <Post
          :loadMedia='true'
          :post='post'
          :isEditable='false' 
          v-for='post in posts'
          :key='post.id'>
            <TagList :tags='post.tags || []' />
        </Post>
    </div>
</template>
<script>
import Post from './Post.vue'
import AddPost from './AddPost.vue'
import TagList from './TagList.vue'
export default {
    name: 'PostList',
    props: {
        posts: Array,
    },
    components: { AddPost, Post, TagList },
    computed: {
        newPost: function() {
            return {
                employee_id: this.$currentUser.employee_id,
                private: false,
                text: '',
                topic: '',
            }
        }
    },
}
</script>