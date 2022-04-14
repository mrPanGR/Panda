<template>
  <div :style="{height:thisHeight}">
    <div style="display:flex;align-items: center;justify-content: space-between;">
      <label>
        备忘录
      </label>
      <p-switch v-model="checkday" :activetext="true" :ontext="'每日'" :offtext="'全部'">
        <!-- <template v-slot:text>
          <span>全部</span>
        </template> -->
      </p-switch>
    </div>
    <div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {hasNavthisHeight} from '@/assets/js/static.js'
import {getCurrentInstance, ref} from 'vue'
import Switch  from '@/components/common/switch/switch.vue'
export default {
  name:'memorandum',
  components:{
   "p-switch": Switch 
  },
  setup(){
    let {proxy} = getCurrentInstance()
    let countday = proxy.$moment("2022/2","YYYY/MM").daysInMonth()
    let thisHeight = hasNavthisHeight()
    let checkday = ref(false)
    let checkdtt = ref(false)
    console.log(thisHeight)
    return{
      thisHeight,
      checkday,
      checkdtt
    }
  }
}
</script>

<style>

</style>