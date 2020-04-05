<template>
  <div id="edit-post">
    <md-field>
        <md-input placeholder='What is this post about?' v-model='post.topic'></md-input>
    </md-field>
    <md-field>
        <md-input placeholder='Describe what you are talking about' v-model='post.text'></md-input>
    </md-field>
    <md-switch v-model='post.private'>Private?</md-switch>
    <EditableMedia
      :isEditable='true'
      :media='media'
      :model_id='post.id'
      :model_type='"Post"'
      />
    <slot />
    <md-button class="md-raised md-primary" @click='savePost'>Save</md-button>
    <router-link tag="span" :to='cancelEditing'>    
        <md-button class="md-accent">
        Cancel
        </md-button>
    </router-link>
  </div>
</template>
<script>
import Errors from './Errors.vue'
import EditableMedia from './EditableMedia.vue'
import {resourceId} from '../services/routing'
export default {
    name: 'EditPost',
    components: {EditableMedia, Errors},
    computed: {
        post() {
            let id = resourceId(this.$route)
            if (id !== null) {
                return this.$store.getters.post(id)
            }
        },
        media() {
            let id = resourceId(this.$route)
            if (id !== null) {
                return this.$store.getters.postMedia(id)
            }
        },
        cancelEditing() {
            let id = resourceId(this.$route)
            if (id !== null) {
                return {name: 'ShowPost', params: {id: id, title: post.topic}}
            } else {
                return {name: 'Posts'}
            }
        },
        id() {
            return resourceId(this.$route)
        }
    },
    methods: {
        savePost() {
            let post = {
                id: this.post.id,
                topic: this.post.topic,
                text: this.post.text,
                employee_id: this.post.employee_id,
                private: this.post.private,
            }
            this.$store.dispatch('savePost', post)
                .then(() => {
                    let target = `/posts/${this.post.id}`
                    this.$router.replace(target)
                })
        },
    }
}
</script>