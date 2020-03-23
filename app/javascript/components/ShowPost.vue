<template>
  <div id="post">
    <Post
      :post='post'
      :loadMedia='true'
      :media='media'
      v-if='inViewMode'
      v-on:changeMode='changeMode'>
        <TagList :tags='tags' v-on:deleteTag='deleteTag' :isEditable="isEditor" />
    </Post>
    <EditablePost
        :post='post'
        :media='media'
        v-if='!inViewMode'
        v-on:changeMode='changeMode'
        v-on:updatePost='updatePost'
        v-on:addedMedia='addedMedia'>
        <TagList :tags='tags' v-on:deleteTag='deleteTag' :isEditable="isEditor" />
    </EditablePost>

    <CommentList
      v-on:reloadComments='reloadComments'
      v-on:addComment='addComment'
      v-if='isCommentsLoaded'
      :comments='comments' />
  </div>
</template>
<script>
import {getOnePost, getPostComments, updatePost, allMedia} from '../services/posts'
import {createComment} from '../services/post_comments'
import {deleteTag} from '../services/tags'
import Post from './Post.vue'
import EditablePost from './EditablePost.vue'
import TagList from './TagList.vue'
import CommentList from './CommentList.vue'
export default {
    name: 'ShowPost',
    components: {CommentList, EditablePost, Post, TagList},

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
            media: [],
            tags: [],
            isPostLoaded: false,
            isCommentsLoaded: false,
            inViewMode: true,
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
            this.tags = r.data.tags
        })
        getPostComments(this.id).then(r => {
            this.comments = r.data
            this.isCommentsLoaded = true
        })
        allMedia(this.id).then(r => this.media = r.data)
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