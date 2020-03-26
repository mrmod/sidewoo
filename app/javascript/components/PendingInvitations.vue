<template>
  <ul id="pending-invitations">
    <li
      v-for="invitation in pendingInvitations"
      :key="invitation.id"
    >
    {{invitation.name}}
    <md-button class="md-icon-button" @click='() => deleteInvitation(invitation.id)'>
      <md-icon>delete</md-icon>
    </md-button>
    </li>
  </ul>
</template>
<script>
import {deleteEventInvitation} from '../services/event_invitations'
export default {
    name: 'PendingInvitations',
    props: {
        pendingInvitations: Array, // EventInvitation
    },
    methods: {
      deleteInvitation: function(id) {
        deleteEventInvitation(id).then(r => {
          this.$emit('deletedInvitation', id)
        })
      }
    }
}
</script>