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

import store from '../services/store'
import router from '../services/router'
// Components
import Home from '../components/Home.vue'

// Material
import {
    MdApp, MdCard, MdContent, MdButton, MdField, MdSwitch, MdDivider,
    MdList, MdMenu, MdToolbar, MdDrawer, MdSteppers, MdSubheader
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


// DatetimePicker from Chronotruck
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
Vue.component('DatetimePicker', VueCtkDateTimePicker)

// Configure thingies
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
Vue.use(MdSteppers)
Vue.use(MdSubheader)
// Static Employee
Vue.prototype.$currentUser = {
    employee_id: 1,
    business_id: 1,
    name: 'Jane',
    email: 'Jane@SideWoo.com',
}

const app = new Vue({
    store,
    router,
    components: {Home},
    mounted() {
        this.$store.dispatch('getBusiness', this.$currentUser.business_id)
        this.$store.dispatch('getBusinessLocations', this.$currentUser.business_id)
    },
    template: "<div><Home /></div>",
})

document.addEventListener('DOMContentLoaded', () => {
    app.$mount('#app')
})