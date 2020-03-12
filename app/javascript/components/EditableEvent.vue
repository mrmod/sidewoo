<template>
  <div id="editable-event">
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
    <DatetimePicker
    :id='"start_time"'
    :label='"Start time"'
    :format='"YYYY-MM-DD h:mm a"'
    v-model='start_time'
    />
    <DatetimePicker
    :id='"end_time"'
    :label='"End time"'
    :format='"YYYY-MM-DD h:mm a"'
    v-model='end_time'
    />
    <md-button class="md-raised md-primary" @click='createEvent'>
        Save
    </md-button>
    <md-button class="md-accent" @click='cancelCreate'>
        Cancel
    </md-button>
  </div>
</template>
<script>
import {createEvent} from '../services/events'
import Errors from './Errors.vue'
export default {
    name: 'AddEvent',
    components: {Errors},
    props: {
        event: {type: Object, required: false}
    },
    data: function() {
        if (this.event) {
            return {
                id: this.event.id,
                isExisting: true,
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
        createEvent: function() {
  
            const event = {
                name: this.name,
                theme: this.theme,
                description: this.description,
                start_time: this.start_time,
                end_time: this.end_time,
                business_id: this.business_id,
            }
            if (this.id) {
                event.id = this.id
            }
            if (this.isExisting) {
                this.$emit('updateEvent', event)
                return
            }
            this.$emit('createEvent', event)
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
        },
        cancelCreate: function() {
            this.toggleShowAddEvent()
            this.$emit('changeMode')
        }
    }
}
</script>