import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    count: 0
  },
  mutations:{
    updateCount(state, value){
      console.log("updateCount", value)
      state.count = value
    }
  }
})