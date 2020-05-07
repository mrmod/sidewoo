<template>
  <router-link v-if='event' tag="span" class="no-decoration" :to='showEvent'>
    <md-card md-card-hover>
      <md-card-header>
          <div class="md-title">{{ event.name }}</div>
          <div class="md-subtitle">{{ theme }}</div>
          <div class="md-subhead">{{subhead}}</div>
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
        <EditableMedia :media='media' :model_id='event.id' :model_type='"Event"' />
      </md-card-content>
      
      <md-card-actions>
        <router-link :to='editEvent' tag="span" v-if='isEditable'>
          <md-button class='md-primary'>Edit</md-button>
        </router-link>
        <md-button class='md-accent' @click='deleteEvent' v-if='isEditable'>Delete</md-button>
      </md-card-actions>
    </md-card>
  </router-link>
</template>
<script>
import {deleteEvent, updateEvent, allMedia} from '../services/events'
import {parseDate, sinceDate} from '../services/dates'
import EditableMedia from './EditableMedia.vue'
import {resourceId} from '../services/routing'
import {themes} from '../services/decorators'

export default {
    name: 'Event',
    components: {EditableMedia},
    props: {event: Object},
    computed: {
      subhead() {
        if (this.event.created_at === this.event.updated_at) {
          return `Created ${sinceDate(this.event.created_at)}`
        }
        return `Updated ${sinceDate(this.event.updated_at)}`
      },
      showEvent() {
          return {name: 'ShowEvent', params: {id: this.event.id, title: this.event.name}}
      },
      editEvent() {
        return {name: 'EditEvent', params: {id: this.event.id, title: this.event.name }}
      },
      media() {
        return this.$store.getters.eventMedia(parseInt(this.event.id))
      },
      isEditable() {

        return this.$currentUser.business_id === this.event.business_id
      },
      startTime() {
        let date = parseDate(this.event.start_time)
        return date.toLocaleString()
      },
      endTime() {
        let date = parseDate(this.event.end_time)
        return date.toLocaleString()
      },
      theme() {
        let theme = themes.find(t => t.name === this.event.theme)
        if (theme) {
          return theme.display
        }
        return this.event.theme
      }
    },
    methods: {
      deleteEvent: function() {
        this.$store.dispatch('deleteEvent', this.event.id)
          .then(() => this.$router.replace('/events'))
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