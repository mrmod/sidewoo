import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allEventInvitationsUrl = '/api/event_invitations'
const oneEventInvitationurl = id => `${allEventInvitationsUrl}/${id}`

export const createEventInvitation = eventInvitation => axios.post(
        allEventInvitationsUrl,
        {eventInvitation},
        authorizedJSONHeaders,
    )
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null
    }))
    .catch(railsErrorHandler)

export const deleteEventInvitation = id => axios.delete(
        oneEventInvitationurl(id),
        authorizedJSONHeaders
    )
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null
    }))
    .catch(railsErrorHandler)