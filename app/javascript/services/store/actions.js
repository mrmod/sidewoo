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
// BUSINESS
        getBusinessLocations: (context, businessId) => businessesService.getLocations(businessId)
            .then(r => context.commit('businessLocations', r.data)),
        getBusiness: (context, id) => businessesService.getOneBusiness(id)
            .then(r => {
                context.commit('business', r.data)
                return r.data
            }),
        saveBusiness: (context, business) => businessesService.updateBusiness(business)
            .then(r => {
                context.commit('business', r.data)
                return r.data
            }),
        // Returns: Location
        createBusinessLocation: (context, businessLocation) => businessesService.createLocation(
                businessLocation.business.id,
                businessLocation.location,
            )
            .then(r => {
                context.commit('updateBusinessLocations', r.data)
                return r.data
            }),
        getBusinesses: context => businessesService.allBusinesses()
            .then(r => {
                context.commit('businesses', r.data)
                return r.data
            }),
// EMPLOYEES
        getBusinessEmployees: (context, id) => businessesService.getEmployees(id)
            .then(r => context.commit('businessEmployees', {business: parseInt(id), employees: r.data})),
        
        getEmployee: (context, id) => employeesService.getOneEmployee(id)
            .then(r => {
                context.commit('updateEmployees', r.data)
                return r.data
            }),
        createEmployee: (context, employee) => employeesService.createEmployee(employee)
            .then(r => {
                context.commit('employee', r.data)
                return r.data
            }),
        saveEmployee: (context, employee) => employeesService.saveEmployee(employee)
            .then(r => {
                context.commit('employee', r.data)
                return r.data
            }),
// POSTS
        getAllPosts: context => postsService.getAllPosts()
          .then(r => {
              context.commit('posts', r.data)
              return r.data
          }),
        getRegionalPosts: (context, id) => regionsService.getPosts(id)
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

// EVENTS
        getAllEvents: context => eventsService.getAllEvents()
            .then(r => context.commit('events', r.data)),
        getRegionalEvents: (context, id) => regionsService.getEvents(id)
          .then(r => {
              context.commit('events', r.data)
              return r.data
          }),
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
// COMMENTS
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
// REGIONS and LOCATIONS   
        getAllRegions: (context) => regionsService.getAllRegions()
          .then(r => context.commit('regions', r.data)),
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
          }),
        getLocation: (context, id) => locationsService.getOneLocation(id)
          .then(r => {
              context.commit('currentUserLocation', r.data)
              return r.data
          }),
        getRegion: (context, locationId) => locationsService.getRegion(locationId)
          .then(r => {
              context.commit('currentUserRegion', r.data)
              return r.data
          }),
        getDefaultRegion: (context) => regionsService.getDefault()
          .then(r => {
              context.commit('updateRegions', r.data)
              return r.data
          }),
// SIGNUP
        setSignupBusiness: (context, business) => context.commit('setSignupBusiness', business),
        addSignupLocation: (context, location) => context.commit('addSignupLocation', location),
        addSignupEmployee: (context, employee) => context.commit('addSignupEmployee', employee),

// AUTH and LOGIN
        isAuthenticating: (context) => context.commit('currentUser', {
            loggedIn: false,
            isAuthenticating: true,
        }),
        getCurrentUserEmployee: ({dispatch, commit, state}, id) => {
            return dispatch('getEmployee', id)
            .then(employee => {
                commit('currentUserEmployee', employee)
                return employee
            })
        },
        // Returns nothing of value
        // Sets the current location of the logged in user to that given
        setCurrentUserLocation: ({dispatch, commit, state}, location) => {

            return Promise.all([
                // Persist the new primary location ID to the database
                // then update the store
                dispatch('getEmployee', state.currentUser.employee_id)
                    .then(employee => dispatch(
                        'saveEmployee', 
                        Object.assign({}, employee, {location_id: location.id})
                    ))
                    .then(employee => commit('currentUserEmployee', employee)),
                // Get the latest server location at update the currentUser
                dispatch('getLocation', location.id)
                    .then(l => commit('currentUserLocation', l)),
            
                dispatch('getRegion', location.id)
                    .then(region => commit('currentUserRegion', region)),
            ])
        },
        login: ({dispatch, commit, state}, employeeId) => {
            return dispatch('getEmployee', employeeId)
            .then(employee => {
                commit('currentUser', {
                    loggedIn: true,
                    employee_id: employee.id,
                    business_id: employee.business_id,
                    email: employee.email,
                    name: employee.name,
                    location_id: employee.location_id,
                    employee: employee,
                })
                return dispatch('getRegion', employee.location_id)
                .then(() => dispatch('getBusiness', employee.business_id))
            })
            .then(business => Promise.all([
                dispatch('getBusinessLocations', business.id),
                dispatch('getBusinessEmployees', business.id),
                dispatch('getRegionalPosts', state.currentUser.region.id),
                dispatch('getRegionalEvents', state.currentUser.region.id),
            ]))
        }
    }