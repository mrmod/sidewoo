<template>
  <div id="post">
    <Post :post='post' v-if='inViewMode' v-on:changeMode='changeMode' />
    <EditablePost
        :post='post' v-if='!inViewMode'
        v-on:changeMode='changeMode'
        v-on:updatePost='updatePost' />

    <CommentList
      v-on:reloadComments='reloadComments'
      v-if='isCommentsLoaded'
      :comments='comments'
      :post='id' />
  </div>
</template>
<script>
import {getOnePost, getPostComments, updatePost} from '../services/posts'
import Post from './Post.vue'
import EditablePost from './EditablePost.vue'
import CommentList from './CommentList'
export default {
    name: 'ShowPost',
    components: {CommentList, EditablePost, Post},

    // id, topic, text, private, employee_id, created_at, updated_a
    data: function() {
        return {
            id: parseInt(this.$route.params.id),
            topic: '',
            text: '',
            private: true,
            employee_id: 0,
            created_at: new Date(),
            updated_at: new Date(),
            comments: [],
            isPostLoaded: false,
            isCommentsLoaded: false,
            inViewMode: true
        }
    },
    created: function() {
        getOnePost(this.id).then(r => {
            this.topic = r.data.topic
            this.text = r.data.text
            this.private = r.data.private
            this.employee_id = r.data.employee_id
            this.created_at= r.data.created_at
            this.updated_at = r.data.updated_at
            this.isPostLoaded = true
        })
        getPostComments(this.id).then(r => {
            this.comments = r.data
            this.isCommentsLoaded = true
        })
    },
    computed: {
        post: function() {
            return {
                id: this.id,
                topic: this.topic,
                text: this.text,
                private: this.private,
                employee_id: this.employee_id,
                created_at: this.created_at,
                updated_at: this.updated_at,
            }
        }
    },
    methods: {
        reloadComments: function() {
            getPostComments(this.id).then(r => this.comments = r.data)
        },
        updatePost: function(post) {
            updatePost(post.id, post).then(() => {
                this.changeMode()
                this.$router.go() // reload the data
            })
        },
        changeMode: function() {
            this.inViewMode = !this.inViewMode
        }
    }
}
</script>