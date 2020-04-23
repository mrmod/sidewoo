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
import SignUp from '../components/SignUp.vue'

import Public from '../components/Public.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import store from './store'

Vue.use(VueRouter)
Vue.prototype.rails_env = process.env.RAILS_ENV
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '/me', name: 'Me', component: Profile},
        
            { path: '/posts', name: 'Posts', component: Posts },
            { path: '/posts/:id', name: 'ShowPost', component: ShowPost },
            { path: '/posts/:id/edit', name: 'EditPost', component: EditPost },
        
            { path: '/events', name: 'Events', component: Events },
            { path: '/events/:id', name: 'ShowEvent', component: ShowEvent },
            { path: '/events/:id/edit', name: 'EditEvent', component: EditEvent },
        
            { path: '/region/create', name: 'CreateRegion', component: CreateRegion },
        ]
    },
    { path: '/public', name: 'Public', component: Public},
    { path: '/login', name: 'Login', component: Login},
    // Register for the application
    { path: '/register', name: 'Register', component: Register},
    // Complete the signup process
    { path: '/signup', name: 'SignUp', component: SignUp},
]
const router = new VueRouter({routes})
const undoSync = sync(store, router)
router.beforeEach((to, from, next) => {
    if (store.state.currentUser && store.state.currentUser.loggedIn) {
        console.log('authorized Heading to', to.name)
        next()
    } else {
        if (to.name === 'Login' || to.name === 'Public' || to.name === 'Register') {
            console.log('unauthorized heading to ', to.name)
            next()
        } else {
            console.log('unauthorized redirecting to public')
            next({name: 'Public'})
        }
    }
})

export default router