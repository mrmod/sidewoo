<template>
  <div id="add-event">
    <span class="md-display-1" @click='toggleShowAddEvent'>Create a new event</span>

    <div v-if='showAddEvent'>
      <Errors :errors='errors' />
      <md-field>
          <md-input v-model='name' placeholder='Event name'></md-input>
      </md-field>
      <md-field>
          <md-input v-model='theme' placeholder='A casual themed event'></md-input>
      </md-field>
      <md-field>
          <md-textarea v-model='description' placeholder='Describe the event'>
          </md-textarea>
      </md-field>
      <md-button class="md-raised md-primary" @click='createEvent'>
          Save
      </md-button>
    </div>
  </div>
</template>
<script>
import {createEvent} from '../services/events'
import Errors from './Errors.vue'
export default {
    name: 'AddEvent',
    components: {Errors},
    data: function() {
        return {
            name: '',
            theme: '',
            description: '',
            startTime: new Date(),
            endTime: new Date(),
            business_id: this.$currentUser.business_id,
            showAddEvent: false,
            errors: null,
        }
    },
    methods: {
        createEvent: function() {
            const event = {
                name: this.name,
                theme: this.theme,
                description: this.description,
                start_time: this.startTime,
                end_time: this.endTime,
                business_id: this.business_id,
            }
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
            this.startTime = new Date()
            this.endTime = new Date()
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