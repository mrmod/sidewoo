<template>
    <div id="post-list">
        <Post :post='post' v-for='post in posts' :key='post.id' />
    </div>
</template>
<script>
import Post from './Post.vue'
export default {
    name: 'PostList',
    props: {
        posts: Array,
    },
    components: { Post },
    data: () => {
        return {
        }
    }
}
</script>