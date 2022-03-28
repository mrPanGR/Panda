<template>
  <div class="page_personinfo" :style="{height:thisHeight}">
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
// import {personinfo} from "@/assets/js/static.js"
import {Icon } from 'vant'
export default {
  name:'personinfo',
  data(){
    return {
      info:"",
    }
  },
  computed:{
    sex(){
      let sex = this.info.sex == 0 ? "女" : "男"
      return sex
    },
    thisHeight(){
      return document.documentElement.clientHeight / 16 - 4.375 - 0.625 +"rem"
    }
  },
  components:{
    Pswitch,
    [Icon.name]:Icon
  },
  methods:{
    getChildMsg(val){
      this.info.is_class = val
    },
    getpersoninfo(){
      console.log()
      this.info = JSON.parse(localStorage.getItem("userinfo"))
    },
    toInfoSetup(){
      this.$router.push("/infosetup")
    },
    outsignin(){
      localStorage.removeItem("userinfo");
      localStorage.removeItem("navlist");
      localStorage.removeItem("classlist");
      localStorage.removeItem("timeclasslist");
      localStorage.removeItem("todolist");
      this.$router.push("/login")
    },
    powerpage(){
      this.$router.push('/power')
    }
  },
  created(){
    this.getpersoninfo()
  },
  
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