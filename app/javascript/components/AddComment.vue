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
        post: String,
        comment: {type: String, required: false},
    },
    data: function() {
        return {
            text: '',
            error: null
        }
    },
    computed: {
        hasErrors: function() {
            if (this.error) {
                return true
            }
            if (this.error instanceof Array && this.error.length > 0) {
                return true
            }
            return false
        },
        errors: function() {
            if (this.error) {
                if (this.error instanceof Array) {
                    return this.error
                }
                return [this.error]
            }
            return []
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
            .catch(error => this.error = error.error)
        }
    }
}
</script>
