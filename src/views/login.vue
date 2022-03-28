<template>
  <div class="login">
    <div class="loginitem border_shadow">
      <div class="loginitemHeader">
        用户登录
      </div>
      <div class="loginitemBody">
        <input type="text" placeholder="账号" v-model="phone" class=""/>
        <input type="password" placeholder="密码" v-model="password" class=""/>
        <div style="display:flex;justify-content: end;align-items: end;height: 2rem;">
          <input type="checkbox" name="" id="password_checkbox" v-model="remember" >
          <label for="password_checkbox" style="color:#b6b6b6;font-size:var(--header);">记住密码</label>
        </div>
        <div class="signin_btn" @click="signin()">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {personinfo,navlist,classlist,todolist,timeclasslist,stringifyjson } from '@/assets/js/static.js'
import{Toast} from 'vant'
export default {
  name:"login",
  data(){
    return{
      phone:"",
      password:"",
      remember:false,

    }
  },
  methods:{
    signin(){
      // console.log(this.remember)
      if(this.phone&&this.password){
        if(this.phone == personinfo.phone &&this.password == personinfo.password){
           localStorage.setItem("userinfo",stringifyjson(personinfo))
           localStorage.setItem("navlist",stringifyjson(navlist))           
           localStorage.setItem("classlist",stringifyjson(classlist))
           localStorage.setItem("timeclasslist",stringifyjson(timeclasslist))
           localStorage.setItem("todolist",stringifyjson(todolist))

           this.$router.push("/")
        }else{
          Toast("账号或密码错误")
        }
      }
    }
  },

}
</script>

<style>
.login{
  background-color: #E9F4FA;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 0 0.625rem;
}
.loginitem{
  height: calc(var(--marginMax) * 14);
  width: 100%;
  border-radius: var(--marginMin);
  overflow: hidden;
}
.loginitemHeader{
  height: calc(var(--marginMax) * 2.5);
  background-color: #91CFFD;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--title);
  color:#ffffff;
}
.loginitemBody{
  padding: 0 .625rem;
  display: flex;
  flex-direction: column;
}
.loginitemBody input[type="text"],.loginitemBody input[type="password"]{
  height: 2.5rem;  
  border: 0;
  padding: 0 .625rem;  
  border-bottom: 1px solid #000000;
  margin-top: 1.25rem;
}
.signin_btn{
  height:2rem;
  background-color: #C4DFB8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: var(--marginMax);
}

</style>