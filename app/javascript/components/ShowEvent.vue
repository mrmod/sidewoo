<template>
  <div id="show-event">
      <Event v-if='isLoaded' :event='event' />
      <br/>
      <CommentList v-if='isLoaded' :comments='comments' :model_type='"Event"' :model_id='event.id' />
  </div>
</template>
<script>
import Event from './Event'
import EditableEvent from './EditableEvent.vue'
import CommentList from './CommentList.vue'
export default {
    name: 'ShowEvent',
    components: {CommentList, EditableEvent, Event},
    data() {
        return {isLoaded: false}
    },
    created() {
        Promise.all([
            this.$store.dispatch('getEventComments', this.id),
            this.$store.dispatch('getOneEvent', this.id),
        ])
        .then(() => this.isLoaded = true)
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
        event() {
            return this.$store.getters.event(this.id)
        },
        comments() {
            return this.$store.getters.eventComments(this.id)
        }
    }
}
</script>