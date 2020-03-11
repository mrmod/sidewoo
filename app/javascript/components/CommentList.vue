<template>
  <div id="comment-list">
    <Comment v-on:deleteComment='deleteComment' v-for='comment in comments' :key='comment.id' :comment='comment' :post='post' />
    <AddComment v-on:commented='commentAdded' :post='post' :comment='null' />
  </div>
</template>
<script>
import Comment from './Comment'
import AddComment from './AddComment'
export default {
    name: 'CommentList',
    components: {Comment, AddComment},
    props: {
        comments: Array,
        post: Number,
    },
    methods: {
        commentAdded: function() {
            this.$emit('reloadComments')
        },
        deleteComment: function() {
          this.$emit('reloadComments')
        }
    }
}
</script>