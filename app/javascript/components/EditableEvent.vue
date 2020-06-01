<template>
  <div id="editable-event">
    <Errors :errors='errors' />
    <md-field>
        <label>Event name</label>
        <md-input v-model='name' placeholder='Event name'></md-input>
    </md-field>
    <md-field>
        <label>Type of event</label>
        <md-select
            placeholder='A casual themed event'
            v-on:md-selected='themeSelected'
            >
            <md-option v-for='(lbl, i) in themes' :key='`theme.${i}`' :value='i'>
                {{lbl.display}}
            </md-option>
        </md-select>
    </md-field>
    <md-field>
        <label>Description of the event</label>
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
        v-on:input='startTimeChanged'
        v-on:validate='unbindStartTime'
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
import {themes} from '../services/decorators'
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
                themes: themes,
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
                bindStartToEnd: true, // When true, setting start time sets the end time
            }
        }
        return {
            themes: themes,
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
            bindStartToEnd: true, // When true, setting start time sets the end time
        }
    },
    created: function() {
        this.allBusinesses()
    },
    methods: {
        startTimeChanged: function(v) {
            if(this.bindStartToEnd) {
                this.end_time = this.start_time
            }
        },
        unbindStartTime() {
            this.bindStartToEnd = false
        },
        themeSelected(v) {
            this.theme = this.themes[v].name
        },
        // TODO: API must only provide relevant businesses for this event. Eg, in group, regional, etc
        allBusinesses: function() {
            return allBusinesses()
            .then(r => {
                this.businesses = r.data
            })
        },
        invitedBusiness: function(eventInvitation) {
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
                region_id: this.$store.state.currentUser.region.id,
            }
            if (this.id) {
                event.id = this.id
            }
            this.$store.dispatch('saveEvent', event)
            this.$emit('saveEvent')
        },
        deletedInvitation: function(id) {
            let invitation = this.invitations.find(i => i.id === id)
            this.invitations = this.invitations.filter(i => i.id !== invitation.id)
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
        cancelCreate: function() {
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