<template>
  <div id="add-event">
    <span class="md-display-1" @click='showAddEvent = true'>Create a new event</span>
    <EditableEvent
      v-if='showAddEvent'
      :event='event'
      v-on:saveEvent='saveEvent'
      v-on:changeMode='saveEvent' />
  </div>
</template>
<script>
import {createEvent} from '../services/events'
import EditableEvent from './EditableEvent.vue'
export default {
    name: 'AddEvent',
    components: {EditableEvent},
    props: {
        event: {type: Object, required: false}
    },
    data: function() {
        if (this.event) {
            return {
                id: this.event.id,
                name: this.event.name,
                theme: this.event.theme,
                description: this.event.description,
                start_time: this.event.start_time,
                end_time: this.event.end_time,
                business_id: this.event.business_id,
                parent_id: this.event.parent_id,
                errors: null,
                showAddEvent: false,
            }
        }
        return {
            name: '',
            theme: '',
            description: '',
            start_time: '',
            end_time: '',
            business_id: this.$currentUser.business_id,
            showAddEvent: false,
            errors: null,
        }
    },
    methods: {
        saveEvent: function() {
            this.initializeData()
        },
        initializeData: function() {
            this.name = ''
            this.theme = ''
            this.description = ''
            this.start_time = ''
            this.end_time = ''
            this.showAddEvent = false
            this.errors = null
        },
    }
}
</script>