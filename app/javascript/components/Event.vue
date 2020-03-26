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
        <ul id="event-invitations-list">
          <li v-for="invitation in event.invitations" :key='invitation.id'>
              {{invitation.name}} invited
          </li>
        </ul>
        <EditableMedia :media='mediaList' :model_id='event.id' :model_type='"Event"' />
      </md-card-content>
      <md-card-actions>
        <md-button class='md-primary' @click='changeMode' v-if='isEditable && isEditor'>Edit</md-button>
        <md-button class='md-accent' @click='deleteEvent' v-if='isEditor'>Delete</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import {deleteEvent, updateEvent, allMedia} from '../services/events'
import {parseDate} from '../services/dates'
import EditableMedia from './EditableMedia.vue'
export default {
    name: 'Event',
    components: {EditableMedia},
    props: {
      event: Object,
      media: {default: () => ([]), type: Array},
      isEditable: {default: true, type: Boolean},
      loadMedia: {default: false, type: Boolean},
    },
    data: function() {
      return {
        isEditor: true,
        mediaList: this.media,
        start_time: this.event.start_time,
        end_time: this.event.end_time,
      }
    },
    created: function() {
        if (this.loadMedia) {
            allMedia(this.event.id).then(r => this.mediaList = r.data)
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
      changeMode: function() {
        this.$emit('changeMode')
      },
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