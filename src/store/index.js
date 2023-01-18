import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    timerInfo: {},
  },
  mutations:{
    updateTimerInfo(state, value){
      state.timerInfo = value
    }
  }
})