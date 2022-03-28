<template>
  <van-cell :style="{padding: 0}" style="fontSize:var(--header);width:initial; "
    @click="showPopup"
    
  >{{title}}</van-cell>
  <van-popup 
    v-model:show="show"
    round
    position="bottom"    
    @click-overlay="clickOverlay"
    :style="{ height: '50%' }"
  >
    <van-datetime-picker
      v-model="time"
      type="time"
      title="选择时间"
      :min-hour="minTime"
      @confirm="Aconfirm"
      @cancel="Acancel"
    />
  </van-popup>
</template>

<script>
import { Popup,Cell,DatetimePicker } from 'vant';
export default {
  name:'time',
  data(){
    return {
      
    }
  },
  props:{
    show:{
      default:false,
    },
    time:{
      default:new Date("12:00")
    },
    title:{
      default:"展示弹出框"
    },
    minTime:{
      default:0
    }
  },
  components:{
    [Popup.name] : Popup,
    [Cell.name] : Cell,
    [DatetimePicker.name] :DatetimePicker,
  },
  methods:{
    showPopup(){      
      this.$emit("showPopup",!this.show)
    },
    Aconfirm(){
      this.$emit("confirm",this.time)
      this.showPopup()
      // console.log(this.time)
    },
    Acancel(){
      this.showPopup()
    },
    clickOverlay(){
      this.showPopup()
    }
  }
}
</script>

<style>

</style>