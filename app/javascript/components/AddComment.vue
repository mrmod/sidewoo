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
import Errors from './Errors.vue'
export default {
    name: 'AddComment',
    components: {Errors},
    props: {
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
                comment_id: this.comment,
                text: this.text,
                employee_id: this.$currentUser.employee_id, // Is there a vue-ier way to do this?
            }
            this.$emit('addComment', comment)
        }
    }
}
</script>
