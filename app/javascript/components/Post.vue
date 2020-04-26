<template>
    <md-card md-with-hover v-if='post'>
        <md-card-header>
            <router-link tag="span" class="no-decoration" :to='showPost'>
                <div class="md-title">
                    {{ post.topic }}
                </div>
            </router-link>
        </md-card-header>

        <md-card-content>
            {{ post.text }}
        </md-card-content>
        <EditableMedia :media='mediaList' :model_id='post.id' :model_type='"Post"' />
        <slot />
        
        <md-card-actions>

            <md-button :to='showPost' v-if='!isEditable'>
                Comment <i class="material-icons">chat_bubble_outline</i>{{comments.length}}
            </md-button>
            <router-link tag="span" :to='editPost' v-if='isEditable && isEditor'>
                <md-button class="md-primary">
                    Edit
                </md-button>
            </router-link>
            <md-button class='md-accent' @click='deletePost' v-if='isEditable && isEditor'>
                Delete
            </md-button>
        </md-card-actions>
    </md-card>
</template>
<script>
import {getPostComments, deletePost, allMedia} from '../services/posts'
import EditableMedia from './EditableMedia.vue'
export default {
    name: 'Post',
    components: {EditableMedia},
    props: {
        post: Object, // id, topic, text, private, employee_id, created_at, updated_at
        isEditable: {default: true, type: Boolean},
        loadMedia: {default: false, type: Boolean},
    },
    created() {
        if(this.post) {
            this.$store.dispatch('getPostMedia', this.post.id)
            this.$store.dispatch('getPostComments', this.post.id)
        } else {
            console.log('post is not defined')
        }
    },
    computed: {
        comments: function() {
            return this.$store.getters.postComments(this.post.id)
            // return this.$store.getters.allComments.filter(c => c.commentable_id === this.post.id && c.commentable_type === 'Post')
        },
        commentsCount: function() {
            return this.$store.getters.postComments(this.post.id).length
        },
        tags: function() {
            return this.$store.getters.postTags(this.post.id)
        },
        media: function() {
            return this.$store.getters.postMedia(this.post.id)
        },
        mediaList: function() {
            return this.$store.getters.postMedia(this.post.id)
        },
        showPost: function() {
            if (this.post) {
                return {name: 'ShowPost', params: {id: this.post.id, title: this.post.topic}}
            }
        },
        editPost: function() {
            if (this.post) {
                let editPostLink =  {name: 'EditPost', params: {id: this.post.id, title: this.post.topic}}
                return editPostLink
            } else {
                console.error(`Can't generate a post link for ${this.post}`)
            }
        },
        isEditor: function() {
            return this.$currentUser.employee_id === this.post.employee_id
        }
    },
    methods: {
        deletePost: function() {
            this.$store.dispatch('deletePost', this.post.id)
                .then(() => this.$router.replace('/posts'))
        },
        deleteTag: function(tag) {
            deleteTag(tag.id).then(() => this.allTags())
        }
    }
}
</script>
<style  scoped>
.md-action {
    justify-content: right;
}
.no-decoration {
    text-decoration: none;
}
</style>