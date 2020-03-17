<template>
  <div id="show-event">
      <Event
        :event='event()'
        :loadMedia='true'
        v-if='inViewMode'
        v-on:changeMode='changeMode' />
      <EditableEvent
        :event='event()'
        :media='media'
        v-if='!inViewMode'
        v-on:changeMode='changeMode'
        v-on:addedMedia='addedMedia'
        v-on:updateEvent='updateEvent' />
      <CommentList
        v-on:reloadComments='reloadComments'
        v-on:addComment='addComment'
        v-if='isCommentsLoaded'
        :comments='comments' />
  </div>
</template>
<script>
import Event from './Event'
import EditableEvent from './EditableEvent.vue'
import CommentList from './CommentList.vue'
import {getOneEvent, updateEvent, allMedia} from '../services/events'
import {allComments, createComment} from '../services/event_comments'

export default {
    name: 'ShowEvent',
    components: {CommentList, EditableEvent, Event},
    data: function() {
        return {
            id: parseInt(this.$route.params.id),
            name: '',
            theme: '',
            description: '',
            start_time: '',
            end_time: '',
            parent_id: null,
            business_id: null,
            created_at: new Date(),
            updated_at: new Date(),
            inViewMode: true,
            media: [],
            comments: [],
            isCommentsLoaded: false,
        }
    },
    created: function() {
        Promise.all([
            this.getMedia(),
            this.getEvent(),
            this.getComments(),
        ])
    },
    methods: {
        getMedia: function() {
            return allMedia(this.id).then(r => this.media = r.data)
        },
        getEvent: function() {
            return getOneEvent(this.id).then(r => {
                const event = r.data
                this.name = event.name
                this.theme = event.theme
                this.description = event.description
                this.start_time = event.start_time
                this.end_time = event.end_time
                this.parent_id = event.parent_id
                this.business_id = event.business_id
                this.created_at = event.created_at
                this.updated_at = event.updated_at
            })
        },
        getComments: function() {
            return allComments(this.id).then(r => {
                this.comments = r.data
                this.isCommentsLoaded = true
            })
        },
        addedMedia: function(media) {
            this.media.push(media)
        },
        changeMode: function() {
            this.inViewMode = !this.inViewMode
        },
        event: function() {
            return {
                id: this.id,
                name: this.name,
                theme: this.theme,
                description: this.description,
                start_time: this.start_time,
                end_time: this.end_time,
                parent_id: this.parent_id,
                business_id: this.business_id,
                created_at: this.created_at,
                updated_at: this.updated_at,
            }
        },
        reloadComments: function() {
            this.getComments()
        },
        updateEvent: function(event) {
            updateEvent(event.id, event).then(r => {
                this.$emit('eventUpdated')
                this.changeMode()
                this.$router.go() // Optional update the event from client data
            })
        },
        addComment: function(comment) {
            createComment(this.id, comment)
            .then(r => this.comments.push(r.data))
        }
    }
}
</script>