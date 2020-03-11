<template>
  <div id="add-post">
      <span class="md-display-1" @click='toggleShowAddPost'>Create a new post</span>
      <div v-if='showAddPost'>
        <Errors :errors='errors' />
        <md-field>
            <md-input placeholder='What is this post about?' v-model='topic'></md-input>
        </md-field>
        <md-field>
            <md-input placeholder='Describe what you are talking about' v-model='text'></md-input>
        </md-field>
        <md-switch v-model='private'>Private?</md-switch>
        <md-button @click='createPost'>Save</md-button>
      </div>
  </div>
</template>
<script>
import {createPost} from '../services/posts'
import Errors from './Errors.vue'
export default {
    name: 'AddPost',
    components: {Errors},
    data: function() {
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
        createPost: function() {
            const post = {
                employee_id: this.employee_id,
                private: this.private,
                text: this.text,
                topic: this.topic,
            }
            createPost(post).then(r => {
                this.$emit('addedPost')
                this.initializeData()
            })
            .catch(error => this.errors = error.error)
        },
        initializeData: function() {
            this.private = false
            this.text = ''
            this.topic = ''
            this.showAddPost = false
            this.errors = null
        },
        toggleShowAddPost: function() {
            this.showAddPost = !this.showAddPost
        }
    }
}
</script>