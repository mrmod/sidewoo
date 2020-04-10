<template>
  <div id="show-event">
      <Event :event='event' />
      <CommentList :comments='comments' :model_type='"Event"' :model_id='event.id' />
  </div>
</template>
<script>
import Event from './Event'
import EditableEvent from './EditableEvent.vue'
import CommentList from './CommentList.vue'
import {resourceId} from '../services/routing'
export default {
    name: 'ShowEvent',
    components: {CommentList, EditableEvent, Event},
    created() {
        this.$store.dispatch('getEventComments', resourceId(this.$route))
    },
    computed: {
        event() {
            return this.$store.getters.event(resourceId(this.$route))
        },
        comments() {
            return this.$store.getters.eventComments(resourceId(this.$route))
        }
    }
}
</script>