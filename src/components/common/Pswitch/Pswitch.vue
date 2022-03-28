<template>
  <div class="switch" 
    :class="is_active"
    >
    <div :class="is_slider" @click="getactive()"></div>
  </div>
</template>

<script>
export default {
  name:'switch',
  data(){
    return {
      thisactive:this.active,
      thissize:this.size
    }
  },
  computed:{
    is_active(){
      let a = [];
      a.push(this.thisactive? 'open' : 'close')
      a.push(this.thissize =='min'? 'min': 'max')
      return a
    },
    is_slider(){
      let a = [];
      if(this.thissize =='min'){
        a.push(this.thisactive? 'slider_min_open' : 'slider_min_close')
      }else{
        a.push(this.thisactive? 'slider_max_open' : 'slider_max_close')
      }      
      return a
    }
  },
  props:{
    active:{
      default:false
    },
    size:{
      default:false
    }
  },
  methods:{
    getactive(){
      this.thisactive = !this.thisactive
      this.$emit('child-active', this.thisactive)
    }
  }
}
</script>

<style>
.max{
  height: 35px;
  width: 70px;
}
.min{
  height: 25px;
  width: 50px;
}
.slider_min_open{
  position: absolute;
  height: 18px;
  width: 5px;
  border-radius: 10px; 
  background-color: #ffffff;
  top: 50%;
  right: 15%;
  transition: right .5s;
  transform: translate(0%,-50%);
}
.slider_min_close{
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 100%; 
  background-color: #ffffff;
  top: 50%;
  right: 50%;
  transform: translate(0%,-50%);
  transition: right .5s;
}
.slider_min_close::after{
  content: '';
  position: absolute;
  height: 14px;
  width: 14px;
  border-radius: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);  
  background-color: #FF8395;
}
.slider_max{
  position: absolute;  
  height: 35px;
  width: 35px;
  border-radius: 100%;
}
.slider_min{
  position: absolute;  
  height: 14px;
  width: 14px;
  border-radius: 100%;
}
.switch{
  position: relative;
  border-radius: 100px;
}
.open{
  background-color: #7BFFE4;
  transition: background .5s;
}
.close{
   background-color: #FF8395;
   transition: background .5s;
}
</style>