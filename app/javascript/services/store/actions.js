import * as postsService from '../posts'
import * as postCommentsService from '../post_comments'
import * as eventsService from '../events'
import * as eventCommentsService from '../event_comments'
import * as commentsService from '../comments'
import * as businessesService from '../businesses'
import * as regionsService from '../regions'
import * as locationsService from '../locations'
import * as employeesService from '../employees'

const isPresent = (t) => typeof(t) !== 'undefined' && t !== null

export default {
        getBusinessLocations: (context, businessId) => businessesService.getLocations(businessId)
            .then(r => context.commit('businessLocations', r.data)),
        getBusiness: (context, id) => businessesService.getOneBusiness(id)
            .then(r => context.commit('business', r.data)),
        getBusinesses: context => businessesService.allBusinesses()
            .then(r => context.commit('businesses', r.data)),
        getBusinessEmployees: (context, id) => businessesService.getEmployees(id)
            .then(r => context.commit('businessEmployees', {business: parseInt(id), employees: r.data})),
        
        getEmployee: (context, employeeId) => employeesService.getOneEmployee(employeeId)
            .then(r => context.commit('employee', r.data)),

        getAllPosts: context => postsService.getAllPosts()
          .then(r => context.commit('posts', r.data)),
        getOnePost: (context, id) => postsService.getOnePost(id)
          .then(r => context.commit('updatePosts', r.data)),
        getPostComments: (context, id) => postsService.getPostComments(id)
            .then(r => r.data.forEach(comment => context.commit('updateComments', comment))),
        getPostMedia: (context, id) => postsService.allMedia(id)
            .then(r => r.data.forEach(media => context.commit('updateMedia', media))),
        savePost: (context, post) => {
            let id = post.id
            if (isPresent(id)) {
                delete post.id
                return postsService.updatePost(id, post).then(r => context.commit('updatePosts', r.data))
            } else {
                return postsService.createPost(post).then(r => context.commit('updatePosts', r.data))
            }
        },
        savePostComment: (context, id, comment, commentId) => {
            if (isPresent(commentId)) {
                return commentsService.updateComment(commentId, comment)
                    .then(r => context.commit('updateComments', r.data))
            } else {
                return postCommentsService.createComment(id, comment)
                    .then(r => context.commit('updateComments', r.data))
            }
        },
        savePostMedia: (context, id, media) => {
            return postsService.addMedia(id, media)
                .then(r => context.commit('updateMedia', r.data))
        },
        deletePost: (context, id) => postsService.deletePost(id)
            .then(() => context.commit('deletePost', id)),


        getAllEvents: context => eventsService.getAllEvents()
            .then(r => context.commit('events', r.data)),
        getOneEvent: (context, id) => eventsService.getOneEvent(id)
            .then(r => context.commit('updateEvents', r.data)),
        getEventComments: (context, id) => eventsService.getEventComments(id)
            .then(r => r.data.forEach(comment => context.commit('updateComments', comment))),
        getEventMedia: (context, id) => eventsService.allMedia(id)
            .then(r => r.data.forEach(media => context.commit('updateMedia', media))),
        saveEvent: (context, event) => {
            let id = event.id
            if (isPresent(id)) {
                delete event.id
                return eventsService.updateEvent(id, event).then(r => context.commit('updateEvents', r.data))
            } else {
                return eventsService.createEvent(event).then(r => context.commit('updateEvents', r.data))
            }
        },
        saveEventComment: (context, id, comment, commentId) => {
            if (isPresent(commentId)) {
                return commentsService.updateComment(commentId, comment)
                    .then(r => context.commit('updateComments', r.data))
            } else {
                return eventCommentsService.createComment(id, comment)
                    .then(r => context.commit('updateComments', r.data))
            }
        },
        saveEventMedia: (context, id, media) => {
            return eventsService.addMedia(id, media)
                .then(r => context.commti('updateMedia', r.data))
        },
        deleteEvent: (context, id) => eventsService.deleteEvent(id)
            .then(() => context.commit('deleteEvent', id)),

        deleteComment: (context, id) => commentsService.deleteComment(id)
            .then(() => context.commit('deleteComment', id)),
        saveComment: (context, data) => {
            const {model, comment} = data
            if (isPresent(comment.id)) {
                return commentsService.updateComment(comment.id, comment)
                    .then(r => context.commit('updateComments', r.data))
            }
            switch (model.type) {
                case 'Event':
                    return eventCommentsService.createComment(model.id, comment)
                        .then(r => context.commit('updateComments', r.data))
                case 'Post':
                    return postCommentsService.createComment(model.id, comment)
                        .then(r => context.commit('updateComments', r.data))
                default:
                    console.log(`Unsupported comment model ${model.type} for ${model.id}`)
            }
        },
        createRegion: (context, region) => regionsService.createRegion(region)
          .then(r => {
              context.commit('updateRegions', r.data)
              return r.data
          }),
        updateLocation: (context, location) => locationsService.updateLocation(location)
          .then(r => context.commit('updateBusinessLocations', r.data)),
        getLocationRegion: (context, locationId) => locationsService.getRegion(locationId)
          .then(r => {
              context.commit('updateRegions', r.data)
              return r.data
          })
    }