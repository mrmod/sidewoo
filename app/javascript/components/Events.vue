<template>
  <div id="events">
      <md-field>
          <label>Sort by</label>
          <md-select v-model='comparatorName' v-on:md-selected='onSelected'>
              <md-option value='orderByCreated'>Date created</md-option>
              <md-option value='orderByLastCommented'>Last commented</md-option>
              <md-option value='orderByStartTime'>Start time</md-option>
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
import compareAsc from 'date-fns/compareAsc'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'

export default {
    name: 'Events',
    components: {EventList},
    data() {
        return {
            comparator: this.orderByStartTime,
            comparatorName: 'orderByStartTime',
        }
    },
    computed: {
        events() {
            if (this.comparatorName === 'orderByStartTime') {
                let d = new Date()
                return this.$store.getters.events.filter(e => {
                    return isAfter(parseDate(e.end_time), d)
                }).sort(this.comparator)
            }
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
            let aTime = parseDate(a.created_at)
            let bTime = parseDate(b.created_at)
            return compareDesc(aTime, bTime)
        },
        orderByLastCommented(a, b) {
            let aTime = parseDate(a.updated_at)
            let bTime = parseDate(b.updated_at)
            return compareDesc(aTime, bTime)
        },
        orderByStartTime(a, b) {
            let aTime = parseDate(a.start_time)
            let bTime = parseDate(b.start_time)
            return compareAsc(aTime, bTime)
        }
    }
}
</script>