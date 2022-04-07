<template>
  <div class="power" :style="{height:thisHeight}">
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
import {localStorageSelect,localStorageUpload,notNavthisHeight} from '@/assets/js/static.js'
import {reactive} from 'vue'
import { useRouter } from 'vue-router'
export default {
  name:'power',
  components:{  
    backbar,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    [Switch.name]:Switch
  },
  setup(){
    let router = useRouter()
    let thisHeight = notNavthisHeight();
    let navlist = reactive(localStorageSelect('navlist'))
    let classlist = reactive(localStorageSelect('classlist'))
    let back = ()=>{
      localStorageUpload('navlist',navlist)
      localStorageUpload('classlist',classlist)
      router.push('/personinfo')
    }
    return{
      thisHeight,
      navlist,
      classlist,
      back
    }
  },
}
</script>

<style>
.power{
  background-color: #F8F8F8;
  position: relative;
}
</style>