<template>
  <div id="add-post">
      <span class="md-display-1"
        @click='toggleShowAddPost'>Create a new post</span>
      <EditablePost
        v-if='showAddPost'
        v-on:savePost='savePost'
        v-on:changeMode='savePost'
        :post='post' />
  </div>
</template>
<script>
import {createPost} from '../services/posts'
import EditablePost from './EditablePost.vue'
export default {
    name: 'AddPost',
    components: {EditablePost},
    props: {
        post: {type: Object, required: false},
    },
    data: function() {
        if (this.post) {
            return {
                employee_id: this.post.employee_id,
                private: this.post.private,
                text: this.post.text,
                topic: this.post.topic,
                showAddPost: false,
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
            this.toggleShowAddPost()
            this.initializeData()
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