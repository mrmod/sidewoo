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
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import ShowPost from '../components/ShowPost.vue'

// Material
import {MdCard, MdButton, MdField} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// Configure thingies
Vue.use(VueRouter)
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdField)
// Static Employee
Vue.prototype.$currentUser = {
    employee_id: 1,
    business_id: 1,
    name: 'Jane',
    email: 'Jane@SideWoo.com',
}
// CSRF Token
Vue.prototype.$csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/posts/:id', name: 'ShowPost', component: ShowPost }, 
]
const router = new VueRouter({routes})

document.addEventListener('DOMContentLoaded', () => {

    new Vue({router}).$mount('#app')
})