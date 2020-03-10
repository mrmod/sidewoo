<template>
  <div id="comment">
    <md-card md-with-hover>
        <md-card-content>{{comment.text}}</md-card-content>
        <md-card-actions>
            <!-- <md-button v-if='isEditor'>Edit</md-button> -->
            <md-button v-if='isEditor' @click='deleteComment'>Delete</md-button>
        </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import {deleteComment} from '../services/comments'
export default {
    name: 'Comment',
    props: {
        comment: Object, // id, text, post_id, comment_id, employee_id, created/updated_at
    },
    computed: {
        isEditor: function() {
            return true // if the current user is the same as the comment employee_id
        }
    },
    methods: {
        deleteComment: function() {
            deleteComment(this.comment.id).then(() => this.$emit('deleteComment', this.comment.id))
            .then(() => {
                this.$emit('deleteComment')
            })
        }
    }
}
</script>
<style lang="sass" scoped>
.md-card {
    width: 80vw;
}
</style>