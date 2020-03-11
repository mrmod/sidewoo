<template>
  <div id="event-list">
      <AddEvent v-on:eventAdded='$emit("eventAdded")' />
      <Event
        v-on:eventDeleted='$emit("eventDeleted")'
        v-for='event in events'
        :key='event.id'
        :event='event'
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
    }
}
</script>