<template>
  <div id="comment">
    <md-card md-with-hover>
        <md-card-content v-if='!inEditMode'>{{comment.text}}</md-card-content>
        <md-field v-if='inEditMode'>
            <md-textarea v-model='text' @input='changed'></md-textarea>
        </md-field>
        <EditableMedia
          :isEditable='inEditMode'
          :media='media'
          :model_id='comment.id'
          :model_type='"Comment"'
          v-on:addMedia='addMedia'
        />
        <md-card-actions v-if='!inEditMode'>
            <md-button v-if='isEditor' class="md-primary" @click='toggleEditMode'>Edit</md-button>
            <md-button v-if='isEditor' class="md-accent" @click='deleteComment'>Delete</md-button>
        </md-card-actions>
        <md-card-actions v-if='inEditMode'>
            <md-button v-if='isEditor' class="md-raised md-primary" @click='saveComment'>Save</md-button>
            <md-button v-if='isEditor' class="md-accent" @click='toggleEditMode'>Cancel</md-button>
        </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import {allMedia, addMedia, updateComment, deleteComment} from '../services/comments'
import EditableMedia from './EditableMedia.vue'
export default {
    name: 'Comment',
    components: {EditableMedia},
    props: {
        comment: Object,
    },
    data: function() {
        return {
            media: [],
            inEditMode: false,
            text: '',
            isChanged: false,
        }
    },
    computed: {
        isEditor: function() {
            return true // if the current user is the same as the comment employee_id
        }
    },
    created: function() {
        allMedia(this.comment.id).then(r => this.media = r.data)
    },
    methods: {
        changed: function() {
            this.isChanged = true
        },
        deleteComment() {
            this.$store.dispatch('deleteComment', this.comment.id)
        },
        saveComment: function() {
            const comment = Object.assign({}, this.comment, {
                text: this.text,
            })

            updateComment(this.comment.id, comment).then(r => {
                this.toggleEditMode()
                this.$emit('commentUpdated', {id: r.data.id, text: r.data.text})
                this.isChanged = false
            })
        },
        toggleEditMode: function() {
            this.inEditMode = !this.inEditMode
            this.text = this.comment.text
        },
        addMedia: function(fileList) {
            if (this.isChanged) {
                const comment = Object.assign({}, this.comment, {
                    text: this.text,
                })
                updateComment(this.comment.id, comment).then(r => {
                    this.$emit('commentUpdated', {id: r.data.id, text: r.data.text})
                    this.isChanged = false
                })
                .then(() =>  addMedia(this.comment.id, fileList[0]).then(r => {
                    this.media.push(r.data.media)
                    this.toggleEditMode()
                }))
            } else {
                addMedia(this.comment.id, fileList[0]).then(r => {
                    this.media.push(r.data.media)
                    this.toggleEditMode()
                })
            }
        }
    }
}
</script>
<style lang="sass" scoped>
</style>