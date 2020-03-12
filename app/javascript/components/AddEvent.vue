<template>
  <div id="add-event">
    <span class="md-display-1" @click='toggleShowAddEvent'>Create a new event</span>
    <EditableEvent v-if='showAddEvent' :event='event' v-on:createEvent='createEvent'/>
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
        createEvent: function(event) {
            // TODO: Redirect to new event to allow further modification
            createEvent(event).then(() => {
                this.$emit('eventAdded')
                this.initializeData()
            })
            .catch(error => this.errors = error.error)
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
        toggleShowAddEvent: function() {
            this.showAddEvent = !this.showAddEvent
            // Clear the errors when it is hidden
            if (!this.showAddEvent) {
                this.errors = null
            }
        }
    }
}
</script>