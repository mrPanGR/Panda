<template>
  <div>
    <todolistbar size="min" :todolist="todolist">
      
    </todolistbar>
  </div>
</template>

<script>
import todolistbar from '@/components/common/todolistbar/todolistbar.vue'
import { localStorageSelect } from '@/assets/js/static.js'
import { ref } from '@vue/reactivity'
export default {
  name:'home',
  components:{
    todolistbar
  },
  setup(){
    let todolist = ref(localStorageSelect("todolist"))
    return{todolist}
  }
}
</script>

<style>

</style>