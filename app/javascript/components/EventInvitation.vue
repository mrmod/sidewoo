<template>
    <md-field id="event-invitation">
        <label for="invitation">Business</label>
        <md-select
        v-model="businessId"
        name="invitation"
        id="invitation">
        <md-option
            v-for="business in businesses"
            :key="business.id"
            :value="business.id">
            {{business.name}}
        </md-option>
        </md-select>

        <md-button class="md-primary md-raised" :disabled="disabled" @click="invite">Invite</md-button>
    </md-field>
</template>
<script>
import {createEventInvitation} from '../services/event_invitations'
export default {
    name: 'EventInvitation',
    props: {
        businesses: Array, // Business objects
        parentEventId: Number,
        hostBusinessId: Number,
        pendingInvitations: Array, 
    },
    data: function() {
        return {
            businessId: null,
        }
    },
    computed: {
        disabled: function() {
            return this.businessId === null
        }
    },
    methods: {
        invite: function() {
            const business = this.businesses.find(b => b.id === this.businessId)
            if (business) {
                const eventInvitation = {
                    'event_id': this.parentEventId,
                    'host_business_id': this.hostBusinessId,
                    'guest_business_id': business.id,
                    'name': business.name,
                }
                createEventInvitation(eventInvitation)
                .then(r => {
                    this.$emit('invitedBusiness', r.data)
                    this.businessId = null
                })
            }
        }
    }
}
</script>