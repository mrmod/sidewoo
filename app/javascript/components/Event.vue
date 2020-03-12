<template>
  <div id="event">
    <md-card md-card-hover>
      <md-card-header>
        <router-link tag="span" class="no-decoration" :to='showEvent'>
          <div class="md-title">{{ event.name }}</div>
        </router-link>
        <div class="md-subhead">{{ event.theme }}</div>
      </md-card-header>
      <md-card-content>
        <div id="event-description" class="md-body-1">
          {{ event.description }}
        </div>
        <md-divider></md-divider>
        <div class="event-times">
          <div class="md-body-1">The event starts at
            <span class="md-body-2">{{ startTime }}</span>
            <span class="md-body-1">and ends at
              <span class="md-body-2">{{ endTime }}</span>
            </span>
          </div>
        </div>
      </md-card-content>
      
      <md-card-actions>
        <md-button class='md-raised md-primary' @click='updateEvent' v-if='isEditor'>Save</md-button>
        <md-button class='md-accent' @click='deleteEvent' v-if='isEditor'>Delete</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import {deleteEvent, updateEvent} from '../services/events'
import {parseDate} from '../services/dates'

export default {
    name: 'Event',
    props: {
      event: Object,
      isEditable: {default: false, type: Boolean},
    },
    data: function() {
      return {
        isEditor: true,
        start_time: this.event.start_time,
        end_time: this.event.end_time,
      }
    },
    computed: {
      showEvent: function() {
          return {name: 'ShowEvent', params: {id: this.event.id}}
      },
      startTime: function() {
        let date = parseDate(this.event.start_time)
        return date.toLocaleString()
      },
      endTime: function() {
        let date = parseDate(this.event.end_time)
        return date.toLocaleString()
      }
    },
    methods: {
      deleteEvent: function() {
        deleteEvent(this.event.id).then(() => {
          this.$emit('eventDeleted')
          this.$router.replace('/events')
        })
      },
      updateEvent: function() {
        const event = {
          id: this.event.id,
          start_time: this.start_time,
          end_time: this.end_time,
          name: this.event.name,
          theme: this.event.theme,
          description: this.event.description,
        }
        updateEvent(this.event.id, event).then(r => {
          this.$emit('eventUpdated')
        })
      }
    }
}
</script>
<style lang="sass" scoped>
.no-decoration {
  text-decoration: none;
}
.event-times {
  margin-top: 8px;
}
</style>