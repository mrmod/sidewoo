<template>
  <div id="add-comment">
      <md-field>
        <md-input v-model='text' placeholder='> Add a comment...'></md-input>
        <Errors :errors='errors' />
      </md-field>
      <md-button @click='saveComment'>Save</md-button>
  </div>
</template>
<script>
import Errors from './Errors.vue'
export default {
    name: 'AddComment',
    components: {Errors},
    props: {
        comment: {type: String, required: false},
        model: Object,
    },
    data: function() {
        return {
            text: '',
            errors: null
        }
    },
    methods: {
        saveComment() {
            const comment = {
                commentable_id: this.model_id,
                commentable_type: this.model_type,
                text: this.text,
                employee_id: this.$currentUser.employee_id,
            }
            this.$store.dispatch('saveComment', {model: this.model, comment})
        }
    }
}
</script>
