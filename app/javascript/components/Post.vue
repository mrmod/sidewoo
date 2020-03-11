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
            <md-card-actions>
                <md-button :to='showPost'>
                    Comment <i class="material-icons">chat_bubble_outline</i>{{commentCount}}
                </md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>
<script>
import {getPostComments} from '../services/posts'
export default {
    name: 'Post',
    components: {},
    props: {
        post: Object, // id, topic, text, private, employee_id, created_at, updated_at
    },
    data: () => {
        return {
            comments: []
        }
    },
    created: function() {
        getPostComments(this.post.id).then(r => {
            this.comments = r.data
        })
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
        }
    },
    methods: {
        viewPost: function() {
        }
    }
}
</script>
<style  scoped>
.md-card {
    width: 320px;
}
.md-action {
    justify-content: right;
}
.no-decoration {
    text-decoration: none;
}
</style>