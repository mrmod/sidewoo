<template>
  <div id="event-list">
      <AddEvent
        :event='newEvent' />
      <Event
        v-for='event in events'
        :key='event.id'
        :event='event'
        :loadMedia='true'
        :isEditable='false'
      />
  </div>
</template>
<script>
import Event from './Event.vue'
import AddEvent from './AddEvent'
export default {
    name: 'EventList',
    components: {AddEvent, Event},
    props: {
        events: Array, // id, name, theme, description, start/end_time, parent/business_id
    },
    computed: {
      newEvent: function() {
        return {
            name: '',
            theme: '',
            description: '',
            start_time: '',
            end_time: '',
            business_id: this.$currentUser.business_id,
            showAddEvent: false,
            invitations: [],
            errors: null,
        }
      }
    }
}
</script>