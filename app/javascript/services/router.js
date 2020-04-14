import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import Profile from '../components/Profile.vue'

import Posts from '../components/Posts.vue'
import ShowPost from '../components/ShowPost.vue'
import EditPost from '../components/EditPost.vue'

import Events from '../components/Events.vue'
import ShowEvent from '../components/ShowEvent.vue'
import EditEvent from '../components/EditEvent.vue'

import CreateRegion from '../components/CreateRegion.vue'

import store from './store'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: Posts},
    { path: '/me', name: 'Me', component: Profile},

    { path: '/posts', name: 'Posts', component: Posts },
    { path: '/posts/:id', name: 'ShowPost', component: ShowPost },
    { path: '/posts/:id/edit', name: 'EditPost', component: EditPost },

    { path: '/events', name: 'Events', component: Events },
    { path: '/events/:id', name: 'ShowEvent', component: ShowEvent },
    { path: '/events/:id/edit', name: 'EditEvent', component: EditEvent },

    { path: '/region/create', name: 'CreateRegion', component: CreateRegion },
]
const router = new VueRouter({routes})
const undoSync = sync(store, router)
router.beforeEach((to, from, next) => {
    if (to.params && to.params.title) {
        store.commit('title', to.params.title)
    } else {
        store.commit('title', to.name)
    }
    next()
})

export default router