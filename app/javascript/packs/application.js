// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@rails/ujs").start()
// require("turbolinks").start()
// require("@rails/activestorage").start()
// require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import Vue from 'vue/dist/vue.esm' // https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

import Posts from '../components/Posts.vue'
import ShowPost from '../components/ShowPost.vue'
import EditPost from '../components/EditPost.vue'

import Events from '../components/Events.vue'
import ShowEvent from '../components/ShowEvent.vue'
import EditEvent from '../components/EditEvent.vue'

// Material
import {
    MdApp, MdCard, MdContent, MdButton, MdField, MdSwitch, MdDivider,
    MdList, MdMenu, MdToolbar, MdDrawer
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// DatetimePicker from Chronotruck
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
Vue.component('DatetimePicker', VueCtkDateTimePicker)

Vue.use(Vuex)
const isPresent = (t) => typeof(t) !== 'undefined' && t !== null
import * as postsService from '../services/posts'
import * as postCommentsService from '../services/post_comments'
import * as eventsService from '../services/events'
import * as eventCommentsService from '../services/event_comments'
import * as commentsService from '../services/comments'
import * as mediaService from '../services/media'
const store = new Vuex.Store({
    state: {
        title: null,
        posts: [],
        events: [],
        businesses: [],
        media: [],
        comments: [],
        tags: [],
        post: null,
        event: null,
    },
    mutations: {
        title(state, title) {
            state.title = title
        },
        posts(state, posts) {
            state.posts = posts
        },

        post(state, post) {
            state.post = post
        },
        updatePosts(state, post) {
            let index = -1
            state.posts.forEach((p, idx) => {
                if (p.id === post.id) {
                    index = idx
                }
            })
            if (index >= 0) {
                state.posts[index] = post
            } else {
                state.posts.push(post)
            }
        },

        deletePost(state, id) {
            state.posts = state.posts.filter(p => p.id !== id)
        },
        
        events(state, events) {
            state.events = events
        },
        event(state, event) {
            state.event = event
        },
        updateEvents(state, event) {
            let index = -1
            state.events.forEach((e, idx) => {
                if (e.id === event.id) {
                    index = idx
                }
            })
            if (index >= 0) {
                state.events[index] = event
            } else {
                state.events.push(event)
            }
        },
        deleteEvent(state, id) {
            state.events = state.events.filter(e => e.id !== id)
        },

        updateComments(state, comment) {
            let index = -1
            state.comments.forEach((c, idx) => {
                if (c.id === comment.id) {
                    index = idx
                }
            })
            if (index >= 0) {
                state.comments[index] = comment
            } else {
                state.comments.push(comment)
            }
        },
        deleteComment(state, id) {
            state.comments = state.comments.filter(c => c.id !== id)
        },

        updateMedia(state, media) {
            let index = -1
            state.media.forEach((m, idx) => {
                if (m.id === media.id) {
                    index = idx
                }
            })
            if (index >= 0) {
                state.media[index] = media
            } else {
                state.media.push(media)
            }
        }
    },
    getters: {
        title: state => state.title,

        posts: state => state.posts,
        post: (state) => (id) => state.posts.find(p => (p.id === id)),
        postComments: (state) => (id) => state.comments.filter(c => c.commentable_type === 'Post' && c.commentable_id === id),
        postMedia: (state) => (id) => state.media.filter(m => m.mediumable_type === 'Post' && m.mediumable_id === id),
        postTags: (state) => (id) => state.tags.filter(t => t.taggable_type === 'Post' && t.taggable_id === id),

        events: state => state.events,
        event: (state) => (id) => state.events.find(e => (e.id === id)),
        eventComments: (state) => (id) => state.comments.filter(c => c.commentable_type === 'Event' && c.commentable_id === id),
        eventMedia: (state) => (id) => state.media.filter(m => m.mediumable_type === 'Event' && m.mediumable_id === id),
        eventTags: (state) => (id) => state.tags.filter(t => t.taggable_type === 'Event' && t.taggable_id === id),

        allComments: state => state.comments,
        comments: (state) => (type, id) => state.comments.filter(m => m.mediumable_type === type && m.mediumable_id === id),
        commentMedia: (state) => (id) => state.media.filter(m => m.mediumable_type === 'Comment' && m.mediumable_id === id),

        tags: (state) => (type, id) => state.tags.filter(t => t.taggable_type === type && t.taggable_id === id),
    },
    actions: {
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
        getOneEVent: (context, id) => eventsService.getOneEvent(id)
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
            console.log('SaveComment', model, ' with data', comment)
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
        }
    }
})
// Configure thingies
Vue.use(VueRouter)
Vue.use(MdApp)
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdField)
Vue.use(MdSwitch)
Vue.use(MdDivider)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdToolbar)
Vue.use(MdContent)
Vue.use(MdDrawer)
// Static Employee
Vue.prototype.$currentUser = {
    employee_id: 1,
    business_id: 1,
    name: 'Jane',
    email: 'Jane@SideWoo.com',
}
const routes = [
    { path: '/', name: 'Home', component: Posts},

    { path: '/posts', name: 'Posts', component: Posts },
    { path: '/posts/:id', name: 'ShowPost', component: ShowPost },
    { path: '/posts/:id/edit', name: 'EditPost', component: EditPost },

    { path: '/events', name: 'Events', component: Events },
    { path: '/events/:id', name: 'ShowEvent', component: ShowEvent },
    { path: '/events/:id/edit', name: 'EditEvent', component: EditEvent },
]
const router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
    if (to.params && to.params.title) {
        store.commit('title', to.params.title)
    } else {
        store.commit('title', to.name)
    }
    next()
})
document.addEventListener('DOMContentLoaded', () => {

    new Vue({
        store: store,
        router: router,
        components: {Home},
        template: "<div><Home /></div>",
    }).$mount('#app')
})