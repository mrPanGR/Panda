<template>
  <div class="border_shadow" 
    :class="size == 'max' ? 'todolistbar_max' : 'todolistbar_min'" 
    >
    <div class="todolist_header">
      <template v-if="size == 'max'">        
        <span>记录你美好的一天</span>
        <!-- <span>{{completed}}/{{todolist.length}}</span> -->
      </template>
      <template v-else>        
        <span>今日事今日毕哦！！</span>
      </template>
    </div>
    <div class="todolistbody" :class="size == 'max' ? 'todolist_maxbody' : 'todolist_minbody'">
      <template v-if="filterTodolist.length != 0">
        <template  v-for="i in filterTodolist" :key="i.id">
          <todolistbaritem @complete="complete" @del="del" 
            :id="i.id" 
            :text="i.content" 
            :startime="i.startime" 
            :endtime="i.endtime" 
            :state="i.state" 
            :commonly="i.commonly"
          >
          </todolistbaritem>
        </template>   
      </template>
      <template v-else>
        <div style="position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    text-shadow: 1px 1px black;
    color: white;">
          所有事项已完成哦！！！！！
        </div>
      </template>
         
    </div>
  </div>
</template>

<script>
import todolistbaritem from './todolistbaritem.vue'
import store from '@/store'
import { computed } from '@vue/runtime-core'
export default {
  name:'todalist',
  components:{
    todolistbaritem
  },  
  props:["size"],
  setup(props){
    //#region  data
    let todolist = store.state.todolist;
    //#endregion
    let del = (val)=>{
      store.dispatch("todoliststate",{id:val,state:3})
    }
    let complete = (val)=>{
      store.dispatch("todoliststate",{id:val,state:1})
    }
    //#region computed
    let completed = computed(()=>{
      if(todolist){
        return todolist.filter(x=>{
          return x.state == 0
        }).length
      }       
    })
    let filterTodolist = computed(() => {      
      if(todolist){
        if(props.size == "min"){
          let time = new Date()
          return todolist.filter((val)=>{          
            return val.state == 0 
          }).splice(0,3).sort((a,b)=>{
            return new Date(time.getFullYear()+"/"+time.getMonth()+"/"+time.getDate()+" "+ a.startime) > new Date(time.getFullYear()+"/"+time.getMonth()+"/"+time.getDate()+" "+ b.startime) ? -1 : 1
          })
        }else{
          let time = new Date()
          return todolist.sort((a,b)=>{
            if(a.state == b.state){
              return new Date(time.getFullYear()+"/"+time.getMonth()+"/"+time.getDate()+" "+ a.startime) < new Date(time.getFullYear()+"/"+time.getMonth()+"/"+time.getDate()+" "+ b.startime) ? -1 : 1
            }else{
              return a.state - b.state
            }          
          })
          
        }
      }else{
        return []
      }
      
    })
    //#endregion

    return {
      todolist,
      del,
      complete,
      completed,
      filterTodolist
    }
  },
  computed:{
    
    
    
  },
}
</script>

<style scoped>
.todolistbar_max{
  background-color: white;
  border-radius: 10px;
  margin-top: var(--marginMax) ;
  height: calc(100% - var(--marginMax) - 5.625rem - 6px);
}
.todolistbar_min{
  background-color: white;
  border-radius: 10px;
  height: calc(var(--marginMax) * 14.3)
}
.todolist_header{
  border-bottom: 1px solid #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--marginMin) / 2) var(--marginMin) ;
  font-size: var(--header);
}
.todolist_maxbody{
  height:calc(100% - var(--marginMax) - var(--marginMin) - var(--marginMin));
  overflow-x: auto;
  padding: 0 var(--marginMin);
}
.todolist_minbody{
  height:calc(100% - var(--marginMin) - var(--marginMin));
  overflow-x: auto;
  padding: 0 var(--marginMin);
}
</style>