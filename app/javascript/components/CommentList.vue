<template>
  <div id="comment-list">
    <Comment
      v-for='comment in comments'
      :key='comment.id'
      :comment='comment'
      />
    <AddComment :comment='null' :model='model' />
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
        model_type: String,
        model_id: Number,
    },
    computed: {
      model() {
        return {id: this.model_id, type: this.model_type}
      }
    }
}
</script>