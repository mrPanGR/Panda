<template>
  <div>
    <todolistbar size="min" :todolist="todolist">
      
    </todolistbar>
  </div>
</template>

<script>
import todolistbar from '@/components/common/todolistbar/todolistbar.vue'
import { parsejson } from '@/assets/js/static.js'
export default {
  name:'home',
  data(){
    return{
      todolist:parsejson(localStorage.getItem("todolist"))
    }
  },
  components:{
    todolistbar
  }
}
</script>

<style>

</style>