<template>
    <div id="post">
        <md-card md-with-hover>
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
            <md-card-actions>

                <md-button :to='showPost' v-if='!isEditable'>
                    Comment <i class="material-icons">chat_bubble_outline</i>{{commentCount}}
                </md-button>
                <md-button class='md-primary' @click='changeMode' v-if='isEditable && isEditor'>
                    Edit
                </md-button>
                <md-button class='md-accent' @click='deletePost' v-if='isEditable && isEditor'>
                    Delete
                </md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>
<script>
import {getPostComments, deletePost, allMedia} from '../services/posts'
import EditableMedia from './EditableMedia.vue'
export default {
    name: 'Post',
    components: {EditableMedia},
    props: {
        post: Object, // id, topic, text, private, employee_id, created_at, updated_at
        media: {default: () => ([]), type: Array},
        isEditable: {default: true, type: Boolean},
        loadMedia: {default: false, type: Boolean},
    },
    data: function() {
        return {
            comments: [],
            mediaList: this.media,
        }
    },
    created: function() {
        getPostComments(this.post.id).then(r => {
            this.comments = r.data
        })
        if(this.loadMedia) {
            allMedia(this.post.id).then(r => this.mediaList = r.data)
        }
    },
    computed: {
        commentCount: function() {
            if (this.comments) {
                return this.comments.length
            }
            return 0
        },
        showPost: function() {
            return {name: 'ShowPost', params: {id: this.post.id}}
        },
        isEditor: function() {
            return this.$currentUser.employee_id === this.post.employee_id
        }
    },
    methods: {
        changeMode: function() {
            this.$emit('changeMode')
        },
        deletePost: function() {
            deletePost(this.post.id).then(() => {
                this.$emit('postDeleted')
                this.$router.replace('/posts')
            })
        }
    }
}
</script>
<style  scoped>
.md-card {
    width: 800px;
}
.md-action {
    justify-content: right;
}
.no-decoration {
    text-decoration: none;
}
</style>