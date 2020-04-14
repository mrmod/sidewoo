<template>
  <div id="post">
    <Post v-if='isLoaded'
      :post='post'
      :media='media'>
        <TagList :tags='tags' v-on:deleteTag='deleteTag' />
    </Post>

    <CommentList 
      v-if='isLoaded'
      :comments='comments'
      :model_type='"Post"'
      :model_id='post.id' />
  </div>
</template>
<script>
import {getOnePost, getPostComments, updatePost, allMedia} from '../services/posts'
import {createComment} from '../services/post_comments'
import {deleteTag} from '../services/tags'
import {addTag} from '../services/post_tags'
import Post from './Post.vue'
import TagList from './TagList.vue'
import CommentList from './CommentList.vue'
export default {
    name: 'ShowPost',
    components: {CommentList, Post, TagList},

    // id, topic, text, private, employee_id, created_at, updated_a
    data: function() {
        return {
            inViewMode: true,
            isLoaded: false,
        }
    },
    mounted() {
        let id = this.$store.getters.id
        return Promise.all([
            this.$store.dispatch('getPostComments', id),
            this.$store.dispatch('getOnePost', id),
            this.$store.dispatch('getPostMedia', id),
        ])
        .then(() => this.isLoaded = true)
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
        comments: function() {
            return this.$store.getters.postComments(this.id)
        },
        post: function() {
            return this.$store.getters.post(this.id)
        },
        media: function() {
            return this.$store.getters.postMedia(this.id)
        },
        tags: function() {
            return this.$store.getters.postTags(this.id)
        },
        isEditor: function() {
            return parseInt(this.employee_id) === parseInt(this.$currentUser.employee_id)
        }
    },
    methods: {
        deleteTag: function(tag) {
            deleteTag(tag.id).then(() => {
                this.tags = this.tags.filter(t => (t.id !== tag.id))
            })
        },
        addTag: function(name) {
            const tag = {
                name: name,
                value: name,
                url: '',
            }
            addTag(this.id, tag).then(r => this.tags.push(r.data))
        },
        reloadComments: function() {
            getPostComments(this.id).then(r => this.comments = r.data)
        },
        savePost: function() {
            this.inViewMode = !this.inViewMode
        },
        addedMedia: function(media) {
            this.media.push(media)
        },
        addComment: function(comment) {
            createComment(this.id, comment)
            .then(r => this.comments.push(r.data))
        }
    }
}
</script>