import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = {state, mutations, actions, getters}

export default new Vuex.Store(store)