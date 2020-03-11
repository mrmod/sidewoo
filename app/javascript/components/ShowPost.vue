<template>
  <div id="post">
    <md-card v-if='!isPostLoaded'>
        <md-card-header>blurry title</md-card-header>
        <md-card-content>blurry content</md-card-content>
    </md-card>
    <md-card v-if='isPostLoaded'>
        <md-card-header>
            <div class="md-title">{{ topic }}</div>
        </md-card-header>
        <md-card-content>{{text}}</md-card-content>
        <md-card-actions v-if='isEditor'>
            <md-button @click='deletePost'>Delete</md-button>
        </md-card-actions>
    </md-card>
    <CommentList
      v-on:reloadComments='reloadComments'
      v-if='isCommentsLoaded'
      :comments='comments'
      :post='id' />
  </div>
</template>
<script>
import {getOnePost, getPostComments, deletePost} from '../services/posts'
import CommentList from './CommentList'
export default {
    name: 'ShowPost',
    components: {CommentList},

    // id, topic, text, private, employee_id, created_at, updated_a
    data: function() {
        return {
            id: parseInt(this.$route.params.id),
            topic: '',
            text: '',
            private: true,
            employee: 0,
            created: new Date(),
            updated: new Date(),
            comments: [],
            isPostLoaded: false,
            isCommentsLoaded: false,
        }
    },
    created: function() {
        getOnePost(this.id).then(r => {
            this.topic = r.data.topic
            this.text = r.data.text
            this.private = r.data.private
            this.employee = r.data.employee_id
            this.created = r.data.created_at
            this.updated = r.data.updated_at
            this.isPostLoaded = true
        })
        getPostComments(this.id).then(r => {
            this.comments = r.data
            this.isCommentsLoaded = true
        })
    },
    computed: {
        isEditor: function() {
            return this.employee === this.$currentUser.employee_id
        }
    },
    methods: {
        reloadComments: function() {
            getPostComments(this.id).then(r => this.comments = r.data)
        },
        deletePost: function() {
            deletePost(this.id)
              .then(() => {
                  this.$router.replace('/posts')
              })
        }
    }
}
</script>