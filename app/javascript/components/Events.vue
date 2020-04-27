<template>
  <div id="events">
      <md-field>
          <label>Sort by</label>
          <md-select v-model='comparatorName' v-on:md-selected='onSelected'>
              <md-option value='orderByCreated'>Date created</md-option>
              <md-option value='orderByLastCommented'>Last commented</md-option>
          </md-select>
      </md-field>
      <EventList
        :events='events' />
  </div>
</template>
<script>
import {getAllEvents} from '../services/events'
import EventList from './EventList.vue'
import {parseDate} from '../services/dates'
import compareDesc from 'date-fns/compareDesc'

export default {
    name: 'Events',
    components: {EventList},
    data() {
        return {
            comparator: this.orderByCreated,
            comparatorName: 'orderByCreated',
        }
    },
    computed: {
        events() {
            return this.$store.getters.events.sort(this.comparator)
        }
    },
    created() {
        this.$store.dispatch('getRegionalEvents', this.$store.state.currentUser.region.id)
    },
    methods: {
        onSelected(v) {
            this.comparator = this[v]
        },
        orderByCreated(a, b) {
            let aTime = parseDate(a.updated_at)
            let bTime = parseDate(b.updated_at)
            return compareDesc(aTime, bTime)
        },
        orderByLastCommented(a, b) {
            let aTime = parseDate(a.last_commented)
            let bTime = parseDate(b.last_commented)
            return compareDesc(aTime, bTime)
        }
    }
}
</script>