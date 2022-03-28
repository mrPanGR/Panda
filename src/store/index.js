import { createStore } from 'vuex'

export default createStore({
  state: {    
    barshow:true
  },
  getters: {
  },
  mutations: {
    navbarshow(state){
      state.barshow = !state.barshow 
    }
  },
  actions: {
  },
  modules: {
  }
})
