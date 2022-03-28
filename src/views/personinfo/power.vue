<template>
  <div class="power" :style="{height:getthisheight}">
    <backbar title="功能设置" @back='back'/>
    <van-cell-group title="导航设置">
      <template  v-for="i in navlist" :key="i.id">
        <van-cell center :title="i.str_name" v-if="i.id != 5">
          <template #right-icon >
            <van-switch v-model="i.state" size="20" active-color='#7BFFE4' inactive-color='#FF8395'/>
          </template>
        </van-cell>
      </template>      
    </van-cell-group>
    <van-cell-group title="课表设置">
      <van-cell center :title="i.classname" v-for="i in classlist" :key="i.cid">
        <template #right-icon>
          <!-- <van-switch v-model="i.state" size="20" active-color='#7BFFE4' inactive-color='#FF8395'/> -->
          <input type="color" name="bgColor"  style="height:var(--marginMax);width:calc(var(--marginMax) * 2);border:none;" v-model="i.color" />
         
        </template>
      </van-cell>  
    </van-cell-group>


  </div>
</template>

<script>
import backbar from '@/components/common/backbar/backbar.vue'
import {CellGroup,Cell,Switch } from 'vant'
import {parsejson,stringifyjson} from '@/assets/js/static.js'
export default {
  name:'power',
  data(){
    return{
      color:"#000",
      navlist:parsejson(localStorage.getItem('navlist')),
      classlist:parsejson(localStorage.getItem('classlist')),
    }
  },
  methods:{
    back(){
      // console.log(navlist)
      localStorage.setItem('navlist',stringifyjson(this.navlist))
      localStorage.setItem('classlist',stringifyjson(this.classlist))
      this.$router.push('/personinfo')
    }
  },
  components:{  
    backbar,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    [Switch.name]:Switch
  },
  computed:{
    getthisheight(){
      return document.documentElement.clientHeight / 16 +"rem"
    },
  }
}
</script>

<style>
.power{
  background-color: #F8F8F8;
  position: relative;
}
</style>