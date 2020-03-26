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
    <EditableMedia
      :media='media'
      :isEditable='true'
      :model_id='id'
      :model_type='"Event"'
      v-on:addMedia='addMedia'
      />
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
    <PendingInvitations
      :pendingInvitations="invitations"
      v-on:deletedInvitation="deletedInvitation"/>
    <EventInvitation
      v-on:invitedBusiness="invitedBusiness"
      :businesses='businesses'
      :hostBusinessId='event.business_id'
      :parentEventId='event.id'
      :pendingInvitations='invitations' />
    <md-button class="md-raised md-primary" @click='createEvent'>
        Save
    </md-button>
    <md-button class="md-accent" @click='cancelCreate'>
        Cancel
    </md-button>
  </div>
</template>
<script>
import {createEvent, addMedia} from '../services/events'
import {allBusinesses} from '../services/businesses'
import Errors from './Errors.vue'
import EditableMedia from './EditableMedia.vue'
import EventInvitation from './EventInvitation.vue'
import PendingInvitations from './PendingInvitations.vue'
export default {
    name: 'AddEvent',
    components: {EditableMedia, Errors, EventInvitation, PendingInvitations},
    props: {
        event: {type: Object, required: false},
        media: Array,
    },
    data: function() {
        if (this.event) {
            return {
                businesses: [],
                invitations: this.event.invitations,
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
            businesses: [],
            invitations: [],
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
    created: function() {
        this.allBusinesses()
    },
    methods: {
        // TODO: API must only provide relevant businesses for this event. Eg, in group, regional, etc
        allBusinesses: function() {
            return allBusinesses()
            .then(r => {
                this.businesses = r.data
            })
        },
        invitedBusiness: function(eventInvitation) {
            console.log(`Adding invitation`, eventInvitation)
            this.invitations.push(eventInvitation)
            this.businesses = this.businesses.filter(b => b.id !== eventInvitation.guest_business_id)
        },
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
        deletedInvitation: function(id) {
            console.log(`Deleting invitation ${id} from ${this.invitations.length}`)
            let invitation = this.invitations.find(i => i.id === id)
            console.log('Removing', invitation)
            this.invitations = this.invitations.filter(i => i.id !== invitation.id)
            console.log('There are now ', this.invitations.length)
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
        },
        addMedia: function(fileList) {
            addMedia(this.id, fileList[0]).then(r => {
                this.$emit('addedMedia', r.data.media)
            })
        }
    }
}
</script>