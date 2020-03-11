<template>
  <div id="add-comment">
      <md-field>
        <md-input v-model='text' placeholder='> Add a comment...'></md-input>
        <Errors :errors='errors' />
      </md-field>
      <md-button @click='createComment'>Save</md-button>
  </div>
</template>
<script>
import {createComment} from '../services/comments'
import Errors from './Errors.vue'
export default {
    name: 'AddComment',
    components: {Errors},
    props: {
        post: Number,
        comment: {type: String, required: false},
    },
    data: function() {
        return {
            text: '',
            errors: null
        }
    },
    methods: {
        createComment: function() {
            const comment = {
                post_id: this.post,
                comment_id: this.comment,
                text: this.text,
                employee_id: this.$currentUser.employee_id, // Is there a vue-ier way to do this?
            }
            createComment(comment)
            .then(comment => {
                this.text = ''
                this.$emit('commented')
            })
            .catch(error => this.errors = error.error)
        }
    }
}
</script>
