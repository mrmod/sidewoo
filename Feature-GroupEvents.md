# Feature: Group Eventss

An Event should be able to have multiple businesses participating in it.

# How

An Event is created by a Business.

An Event is created for another Business, with the original Event as the parent and the other Business as the owner. This event is created by the Business that made the original Event.

```
parent = Event(id: 1, business_id: 1, parent_id: null)
child =  Event(id: 2, business_id: 2, parent_id: 1)
```

This should use an invitation, why appears in the dashboard of a business, and allows them to redeem it and join an event.

This requires a new model, EventInvitation, which stores:
```
:name
:host_business_id
:event_id
:guest_business_id
:redemption_code
```

## Event Invite

* Get a list of Businesses which are not already members and have not been sent an invite
* Show a list of pending EventInvitations and their age

## Event Invitation Component

```
*<Select Business>* [Invite]
{:parent_event_id, :host_business_id, :pending_invitations, :businesses}
```

```
<md-button @click='inviteBusiness'>
  this.$emit('inviteBusiness', invitedBusinessId)
```