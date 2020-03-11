<template>
  <div id="event">
    <md-card md-card-hover>
      <md-card-header>
        <div class="md-title">{{ event.name }}</div>
        <div class="md-subhead">{{ event.theme }}</div>
      </md-card-header>
      <md-card-content>
        {{ event.description }}
      </md-card-content>
      <md-card-actions>
        <md-button @click='deleteEvent' v-if='isEditor'>Delete</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import {deleteEvent} from '../services/events'
export default {
    name: 'Event',
    props: {
      event: Object, 
    },
    data: function() {
      return {
        isEditor: true,
      }
    },
    methods: {
      deleteEvent: function() {
        deleteEvent(this.event.id).then(() => this.$emit('eventDeleted'))
      }
    }
    //   {
    //     id: Number,
    //     name: String,
    //     theme: String,
    //     description: String,
    //     start_time: Date,
    //     end_time: Date,
    //     parent_id: {required: false, type: Number}
    // }
}
</script>