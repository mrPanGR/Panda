<template>
  <van-cell
    :style="{ padding: 0 }"
    style="fontsize: var(--header); width: initial"
    @click="showPopup()"
    >{{ title }}</van-cell
  >
  <van-popup
    v-model:show="show"
    round
    position="bottom"
    @click-overlay="showPopup()"
    :style="{ height: '50%' }"
  >
    <van-datetime-picker
      v-model="time"
      type="time"
      title="选择时间"
      :min-hour="minTime"
      @confirm="Aconfirm()"
      @cancel="showPopup()"
    />
  </van-popup>
</template>

<script>
import { Popup, Cell, DatetimePicker } from "vant";
import { toRef } from 'vue';
export default {
  name: "Time",
  props: {
    show: {
      default: false,
    },
    time: {
      default: new Date("12:00"),
    },
    title: {
      default: "展示弹出框",
    },
    minTime: {
      default: 0,
    },
  },
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [DatetimePicker.name]: DatetimePicker,
  },
  emits:["onshowPopup","onconfirm"],
  setup(props, content) {
    // let p = props;
    let showPopup = ()=>{content.emit("onshowPopup" , !props.show)}
    let Aconfirm = ()=>{
      // console.log(p.title)
      content.emit("onconfirm" , props.time)
      showPopup()
    }
    return {
      showPopup,
      Aconfirm,
    }
  },
};
</script>

<style>
</style>