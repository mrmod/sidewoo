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
    <EditableMedia
      :isEditable='true'
      :media='media'
      v-on:addMedia='addMedia'
      :model_id='id'
      :model_type='"Post"'
      />
    <slot />
    <md-button class="md-raised md-primary" @click='savePost'>Save</md-button>
    <md-button class="md-accent" @click='cancel'>
      Cancel
    </md-button>
  </div>
</template>
<script>
import {addMedia} from '../services/posts'
import Errors from './Errors.vue'
import EditableMedia from './EditableMedia.vue'
export default {
  name: 'EditablePost',
  components: {EditableMedia, Errors},
  props: {
    post: {type: Object, required: false},
    media: {type: Array, default: () => ([])},
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
        region_id: this.$store.state.currentUser.region.id
      }
      this.$store.dispatch('savePost', post)
      this.$emit('savePost')
    },
    cancel: function() {
      this.$emit('changeMode')
    },
    addMedia: function(fileList) {
        addMedia(this.id, fileList[0]).then(r => {
            this.$emit('addedMedia', r.data.media)
        })
    }
  }
}
</script>