<template>
  <div id="events">
      <EventList
        v-on:eventAdded='reloadEvents'
        v-on:eventDeleted='reloadEvents'
        :events='events' />
  </div>
</template>
<script>
import {getAllEvents} from '../services/events'
import EventList from './EventList.vue'
export default {
    name: 'Events',
    components: {EventList},
    data: function() {
        return {
            events: [],
        }
    },
    created: function() {
        this.reloadEvents()
    },
    methods: {
        reloadEvents: function() {
            getAllEvents().then(r => this.events = r.data)
        }
    }
}
</script>