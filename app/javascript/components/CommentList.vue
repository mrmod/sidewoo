<template>
  <div id="comment-list">
    <Comment
      v-on:deleteComment='deleteComment'
      v-on:commentUpdated='commentUpdated'
      v-for='comment in comments'
      :key='comment.id'
      :comment='comment'
      />
    <AddComment
      v-on:commented='commentAdded'
      v-on:addComment='addComment'
      :comment='null' />
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
    },
    methods: {
        commentAdded: function() {
            this.$emit('reloadComments')
        },
        deleteComment: function() {
          this.$emit('reloadComments')
        },
        commentUpdated: function(update) {
          this.comments.forEach(comment => {
            if (update.id && comment.id === update.id) {
              comment.text = update.text
            }
          })
        },
        addComment: function(comment) {
          this.$emit('addComment', comment)
        }
    }
}
</script>