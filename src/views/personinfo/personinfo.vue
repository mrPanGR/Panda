<template>
  <div class="page_personinfo" :style="{height:thisheight}">
    <div class="info border_shadow">
      <div class="portrait border_shadow" :style="{backgroundImage:'url('+info.portrait+')'}"></div>      
      <div class="info_text">
        <div><span>{{info.nickname}}</span></div>
        <div style="display:flex;justify-content: space-between;">
          <div>{{sex}}</div>
          <div>{{info.age}}</div>
          <div>{{info.constellation}}</div>
        </div>
        <div>{{info.school}}</div>
      </div>
      <div class="infosetup border_shadow" @click="toInfoSetup()">

        <van-icon name="setting-o" />
      </div>
    </div>
    <div class="setupitem border_shadow" @click="powerpage()">
      <div>功能设置</div><van-icon name="arrow" />
    </div>
    <!-- <div class="setupitem border_shadow">是否将课表导入今日事项<Pswitch @child-active="getChildMsg" :active="info.is_class" size="min"></Pswitch></div> -->
    <div class="setupitem border_shadow"><div>关于本软件</div><van-icon name="arrow" /></div>
    <div class="signout border_shadow" @click="outsignin">退出登录</div>
  </div>
</template>

<script>
import Pswitch from "@/components/common/Pswitch/Pswitch.vue"
import {localStorageSelect,hasNavthisHeight} from "@/assets/js/static.js"
import {Icon } from 'vant'
import {reactive,computed} from 'vue'
import { useRouter } from 'vue-router'
export default {
  name:'personinfo',
  components:{
    Pswitch,
    [Icon.name]:Icon
  },  
  setup(){
    let router = useRouter();
    let info = reactive(localStorageSelect("userinfo"))
    let thisheight = hasNavthisHeight() //  这里可以用hook函数 试一下（现在没时间不想改了 2022/4/4 21:36）
    let getChildMsg = (val) => {
      info.is_class = val
    }
    let toInfoSetup = ()=> {
      router.push("/infosetup")
    }
    let outsignin = () => {
      localStorage.removeItem("userinfo");
      localStorage.removeItem("navlist");
      localStorage.removeItem("classlist");
      localStorage.removeItem("timeclasslist");
      localStorage.removeItem("todolist");
      router.push("/login")
    }
    let powerpage =() => {
      router.push('/power')
    }

    //#region  computed
    let sex = computed(()=>{
      return info.sex == 0 ? "女" : "男"
    })
    //#endregion
    return {
      info,
      thisheight,
      getChildMsg,
      toInfoSetup,
      outsignin,
      powerpage,
      sex
    }
  }
}
</script>

<style scoped>
.page_personinfo{
  position: relative;
}
.info{
  padding: var(--marginMin);
  height: 9.375rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: var(--marginMax);
}
.info_text{
  height: 8.375rem;
  width: calc(100% - 9.375rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between
}
.portrait{
  height: 8.375rem;
  width: 8.375rem;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: cover;
}
.infosetup{
  height: var(--marginMax);
  width: var(--marginMax);
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.setupitem{
  height: calc(var(--marginMax) * 2);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--content);
  margin-bottom: var(--marginMax);
  padding: 0 var(--marginMin);
  font-weight: 300;
}
.signout{
  position:absolute;
  bottom: 6px;
  height: calc(var(--marginMax) * 2);
  width: 100%;
  background-color: #FDA2A2;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--title);
  font-weight: 300;
}
</style>