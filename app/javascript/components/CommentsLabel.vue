<template>
  <md-button>
    {{commentCount}}comments
    <i v-if='commentCount' class="material-icons">
        
    </i>
  </md-button>
</template>
<script>
export default {
    name: 'CommentsLabel',
    props: {
        comments: Array, //id, text, post_id, comment_id(parent), employee_id, created/update_at
    },
    computed: {
        commentCount: function() {
            return this.comments.length
        }
    }
}
</script>