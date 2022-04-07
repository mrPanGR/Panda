import { createStore } from 'vuex'
import {localStorageSelect, localStorageUpload } from "@/assets/js/static.js";
export default createStore({
  state: {
    barshow: true,
    todolist: [],
  },
  getters: {
  },
  mutations: {
    navbarshow(state) {
      state.barshow = !state.barshow
    },
    TodolistInit(state){
      state.todolist = localStorageSelect("todolist") ? localStorageSelect("todolist"):[]
    },
    TodolistAdd(state, value) {
      state.todolist.push(value);
      localStorageUpload("todolist",state.todolist)
    },
    TodaolistState(state,value){      
      state.todolist.forEach(x => {
        if(x.id == value.id){
          x.state = value.state
        }
      });
      localStorageUpload("todolist",state.todolist)
    },
    
  },
  actions: {
    todolistadd(content, value) {
      let item = { id: value.id, startime: value.startime, endtime: value.endtime, content: value.content, commonly: value.commonly, state: value.state }
      content.commit("TodolistAdd",item)
    },
    todoliststate(content,value){
      content.commit("TodaolistState",value)
    }
  },
  modules: {
  }
})
