<template>
  <div id="editable-post">
    <Errors :errors='errors' />
    <md-field>
        <md-input placeholder='What is this post about?' v-model='topic'></md-input>
    </md-field>
    <md-field>
        <md-input placeholder='Describe what you are talking about' v-model='text'></md-input>
    </md-field>
    <md-switch v-model='private'>Private?</md-switch>
    <md-button class="md-raised md-primary" @click='savePost'>Save</md-button>
    <md-button class="md-accent" @click='cancel'>
      Cancel
    </md-button>
  </div>
</template>
<script>
import Errors from './Errors.vue'
export default {
  name: 'EditablePost',
  components: {Errors},
  props: {
    post: {type: Object, required: false},
  },
  data: function() {
    if (this.post) {
      return {
        id: this.post.id,
        topic: this.post.topic,
        text: this.post.text,
        employee_id: this.post.employee_id,
        private: this.post.private,
        errors: null,
      }
    }
    return {
        employee_id: this.$currentUser.employee_id,
        private: false,
        text: '',
        topic: '',
        showAddPost: false,
        errors: null,
    }
  },
  methods: {
    savePost: function() {
      const post = {
        id: this.id,
        topic: this.topic,
        text: this.text,
        employee_id: this.employee_id,
        private: this.private,
      }
      if (this.post) {
        this.$emit('updatePost', post)
      } else {
        this.$emit('createPost', post)
      }
    },
    cancel: function() {
      this.$emit('changeMode')
    }
  }
}
</script>