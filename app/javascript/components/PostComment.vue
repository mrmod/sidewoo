<template>
  <div id="post-comment">
  </div>
</template>
<script>
import Comment from './Comment.vue'
import {deleteComment, allMedia, addMedia, updateComment} from '../services/comments'
export default {
    name: 'PostComment',
    props: {
        id: {type: Number, required: true},
    },
    data: function() {
        return {
            media: [],
            comment: {}
        }
    },
    created: function() {

    }
}
</script>