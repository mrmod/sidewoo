<template>
  <div id="events">
      <EventList
        :events='events' />
  </div>
</template>
<script>
import {getAllEvents} from '../services/events'
import EventList from './EventList.vue'
export default {
    name: 'Events',
    components: {EventList},
    computed: {
        events() {
            return this.$store.getters.events
        }
    },
    created: function() {
        this.$store.dispatch('getAllEvents')
    },
}
</script>