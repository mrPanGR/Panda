<template>
  <div class="backbar">
    <div><van-icon name="arrow-left" @click="back()" /></div>
    <div>{{title}}</div>
    <div></div>
  </div>
</template>

<script>
import {Icon} from 'vant'
export default {
  name:"backbar",
  props:{
    title:{
      type:String,
      default(){
        return ''
      }
    }
  },
  components:{
    [Icon.name]:Icon,
  },
  emits:["back"],
  setup(props, content){    
    let back = () => {
      content.emit("back")
    }
    return{
      back
    }
  },  
}
</script>

<style scoped>
.backbar{
  height: calc(var(--marginMax) *2);
  padding: 0 var(--marginMin);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
}
</style>