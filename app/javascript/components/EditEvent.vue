<template>
    <div id="edit-event">
        <Errors :errors='errors' />
        <md-field>
            <md-input v-model='event.name' placeholder='Event name'></md-input>
        </md-field>
        <md-field>
            <md-input v-model='event.theme' placeholder='A casual themed event'></md-input>
        </md-field>
        <md-field>
            <md-textarea v-model='event.description' placeholder='Describe the event'>
            </md-textarea>
        </md-field>
        <EditableMedia
            :media='media'
            :isEditable='true'
            :model_id='event.id'
            :model_type='"Event"' />
        <DatetimePicker
            :id='"start_time"'
            :label='"Start time"'
            :format='"YYYY-MM-DD h:mm a"'
            v-model='event.start_time' />
        <DatetimePicker
            :id='"end_time"'
            :label='"End time"'
            :format='"YYYY-MM-DD h:mm a"'
            v-model='event.end_time' />

        <md-button class="md-raised md-primary" @click='saveEvent'>
            Save
        </md-button>
        <router-link :to='cancelEditing' tag="span">
            <md-button class="md-accent">
                Cancel
            </md-button>
        </router-link>
    </div>
</template>
<script>
import Errors from './Errors.vue'
import EditableMedia from './EditableMedia.vue'
import {resourceId} from '../services/routing'
export default {
    name: 'EditEvent',
    components: {Errors, EditableMedia},
    computed: {
        event() {
            return this.$store.getters.event(resourceId(this.$route))
        },
        errors() {
            return null
        },
        media() {
            return this.$store.getters.eventMedia(resourceId(this.$route))
        },
        cancelEditing() {
            let id = resourceId(this.$route)
            if (id !== null) {
                return {name: 'ShowEvent', params: {id: id, title: this.event.topic}}
            } else {
                return {name: 'Events'}
            }
        },
    },
    methods: {
        saveEvent() {
            this.$store.dispatch('saveEvent', this.event)
                .then(() => this.$router.replace(`/events/${this.event.id}`))
        }
    }
}
</script>