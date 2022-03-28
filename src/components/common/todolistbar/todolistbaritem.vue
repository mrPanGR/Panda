<template>
  <div class="item " :style="{background:bgColor[ commonly && state == 1? 2:state]}">
    <div class="item_content">
      <div class="radio">
        <van-icon name="success" v-if="state == 0" @click="complete(id)" />
      </div>
      <div class="content">
        <span>{{text}}</span>
        <span>{{state}}</span>
      </div>
      <div class="radio">
        <van-icon name="cross" v-if="state == 0"  @click="del(id)"/>
      </div>
    </div>
    <div class="item_time">
      <span>{{startime}}</span>
      <span>{{endtime}}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  name:'todolistbaritem',
  data(){
    return{
      bgColor:["#F9F3E5","#DCFBBD","#D0F4F0" ,"#FFD6E9"]
    }
  },
  props:["id","text","startime","endtime","state","commonly"],
  components:{
    [Icon.name]:Icon
  },
  methods:{
    del(val){
      this.$emit("del",val)
    },
    complete(val){
      this.$emit("complete",val)
    }
  }
}
</script>

<style scoped>
.item {
  height: 3.5rem;
  /* border-radius: 10px; */
  margin:var(--marginMax) 0 ;
}
.item_content{
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.radio{
  height: 20px;
  width: 20px;
  border-radius: 100%;
  /* border:1px solid #000000; */
  background-color: white; 
  display: flex;
  justify-content: center;
  align-items: center; 
}
.content{
  height: 20px;
  font-size: var(--content);
  padding: 0 10px;
}
.item_time{
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  font-size: var(--header);
}
</style>