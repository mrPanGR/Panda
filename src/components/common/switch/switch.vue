<template>
  <div 
    class="switch" 
    :style="{
      width:size,
      background: active ? oncolor :offcolor
      }"
  >
  <div :class="modelValue ? 'on':'off'" :style="{'--switchitemcolor': active ? '#fff' :offcolor} " @click="$emit('update:modelValue', !modelValue)">    
    <template v-if="activetext">
      <div v-if="active" class="ontext">
        <slot name="text"></slot>
        {{ontext}}
      </div>
      <div v-else class="offtext">
        {{offtext}}
      </div>
    </template>
  </div>
  </div>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  // name:'switch',
  props:{
    size:{
      type:String,
      default:"50px"
    },
    oncolor:{
      type:String,
      default:"#6BC8FF"
    },
    offcolor:{
      type:String,
      default:"#FF8395"
    },
    fontcolor:{
      type:String,
      default:"#FFFFFF"
    },
    activetext:{
      type:Boolean,
      default:false
    },
    ontext:{
      type:String,
      default:""
    },
    offtext:{
      type:String,
      default:""
    },
    modelValue:{
      type:Boolean,
      default: false,
    },
    
  },
  emits:[],
  setup(props){
    let active = ref(props.modelValue);
    watch(() => props.modelValue, () => { active.value = props.modelValue })
    return{
      active
    }
  }
  
}
</script>

<style>
.switch{
  border-radius:.625rem;
  height: 1.25rem;
  position:relative;
  overflow: hidden;
}
.on,.off{
  height: calc(1.25rem - 6px);
  background-color: #fff;  
  position:absolute;
  top: 3px;
}
.on{
  width: calc(1.25rem / 5);
  border-radius: 2px;
  left: calc(100% - .625rem);
  transition: left .5s;
}
.off{  
  width: calc(1.25rem - 6px);
  border-radius: 50%;
  left: 3px;
  transition: left .5s;
}
.off::before{
  content: '';
  position:absolute;
  width: calc(1.25rem - 10px);
  height: calc(1.25rem - 10px);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: var(--switchitemcolor);
}
.ontext{
  font-size: var(--header);
  color: #fff;
  position: relative;
  right: 30px;
  top: -1.5px;
  min-width: 25px;
}
.offtext{
  font-size: var(--header);
  color: #fff;
  position: relative;
  left: 18px;
  top: -1.5px;
  min-width: 25px;
}
</style>