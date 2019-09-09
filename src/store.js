import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user_collection: [],
    article_collection: [],
    current_user: {
      id: null,
      name: null,
      address: null,
      phone: null,
      email: null
    }
  }
})
