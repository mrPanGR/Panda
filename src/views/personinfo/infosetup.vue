<template>
  <div class="infosetup" :style="{height:thisHeight}">
    <backbar title="基本信息" @back="back()"></backbar>
    <van-cell-group style="background: none;">
      <!-- 昵称 -->
      <van-field 
        v-model="thisinfo.nickname" 
        label="昵称" 
        input-align="right" 
        maxlength="6" 
        :show-word-limit="nicknamefontshow" 
        :error-message="thisinfo.nickname == '' ? '不可为空':''"
        error-message-align="right"
        @focus="nicknameonfocus()"
        @blur="nicknameonblur()"/>
      <!-- 年龄 --><!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field 
        v-model="thisinfo.age" 
        type="digit" 
        label="年龄" 
        maxlength="2" 
        input-align="right" 
        :show-word-limit="agefontshow" 
        :error-message="thisinfo.age == '' ? '不可为空':''"
        error-message-align="right"
        @focus="ageonfocus()"
        @blur="ageonblur()"/>
      <!-- 性别 -->
      <van-cell title="性别" :value="sex" @click="sexcheck()"/>
      <!-- <van-field v-model="thisinfo.sex" label="性别" input-align="right" />       -->
      <!-- 星座 -->
      <van-cell title="星座" :value="thisinfo.constellation" @click="constellationcheck()" />
      <!-- <van-field v-model="thisinfo.constellation" label="星座" input-align="right"/> -->
      <!-- 学校 -->
      <van-field v-model="thisinfo.school" label="学校" input-align="right" :error-message="thisinfo.school == '' ? '不可为空':''" error-message-align="right"/>
      <!-- 开学时间 -->
      <van-cell :value="schoolOpeningTime_str"  title="开学时间" @click="schoolOpeningTimecheck()"/>
      
    </van-cell-group>
    <div class="submit" :style="{background:submitbg? '#91CFFD':'#CFCFCF',pointerEvents: submitbg ? 'auto':'none'}" @click="submit()" >
      <span>提交</span>
    </div>
    <van-popup style="height:30%;" 
      v-model:show="sexshow" 
      round="true"
      position="bottom">
      <van-picker 
        title="" 
        :columns="sexlist" 
        visible-item-count="3"
        @confirm="sexconfirm"
        />
    </van-popup>
    <van-popup style="height:50%;" 
      v-model:show="constellationshow" 
      round="true"
      position="bottom">
      <van-picker 
        title="" 
        :columns="constellationlist" 
        visible-item-count="6"
        @confirm="constellationconfirm"
        @cancel="constellationcancel"
        />
    </van-popup>
    <van-popup style="height:50%;" 
      v-model:show="schoolOpeningTimeshow" 
      round="true"
      position="bottom">
      <van-datetime-picker
        v-model="schoolOpeningTime"
        type="date"
        title="选择年月日"        
      />
    </van-popup>
  </div>
</template>

<script>
import backbar from "@/components/common/backbar/backbar.vue"
import {Field, CellGroup,Cell,Popup,Picker,Toast,DatetimePicker  } from 'vant'
import {parsejson,stringifyjson} from '@/assets/js/static.js'
export default {
  data(){
    return{
      thisHeight:'',
      thisinfo:parsejson(localStorage.getItem("userinfo")),
      agefontshow:false,
      nicknamefontshow:false,
      sexshow:false,
      sexlist:["男","女"],
      constellationshow:false,
      constellationlist:["摩羯座","水瓶座","双鱼座","白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座"],
      schoolOpeningTimeshow:false
    }
  },
  methods:{
    getthisheight(){
      this.thisHeight = document.documentElement.clientHeight / 16 +"rem"
    },
    ageonfocus(){
      this.agefontshow = true
    },
    ageonblur(){
      if(this.thisinfo.age == ""){
        
      }
      this.agefontshow = false
    },
    nicknameonfocus(){
      this.nicknamefontshow = true
    },
    nicknameonblur(){
      if(this.thisinfo.nickname == ""){        
        
      }
      this.nicknamefontshow = false
    },
    sexcheck(){      
      this.sexshow = !this.sexshow
    },
    sexconfirm(value){
      this.thisinfo.sex = value == "男" ? 1:0
      this.sexshow = !this.sexshow
    },
    sexcancel(){
      this.sexshow = !this.sexshow
    },
    constellationcheck(){
      this.constellationshow = !this.constellationshow
    },
    constellationconfirm(value){
      this.thisinfo.constellation = value
      this.constellationshow = !this.constellationshow
    },
    constellationcancel(){
      this.constellationshow = !this.constellationshow
    },
    back(){
      this.$router.push("/personinfo")
    },
    schoolOpeningTimecheck(){
      this.schoolOpeningTimeshow = !this.schoolOpeningTimeshow
    },
    submit(){
      localStorage.setItem("userinfo",stringifyjson(this.thisinfo))
      Toast("修改成功了窝")
    }
  },
  computed:{
    schoolOpeningTime_str(){
      let time = new Date(this.thisinfo.schoolOpeningTime)
     
      return  time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()
    },
    schoolOpeningTime(){
      let time = new Date(this.thisinfo.schoolOpeningTime)     
      return  time
    },
    sex(){
      return this.thisinfo.sex? "男":"女"      
    },
    submitbg(){
      let info = parsejson(localStorage.getItem("userinfo"))
      if(this.thisinfo.nickname == '' &&this.thisinfo.age == '' &&this.thisinfo.shool == ''){
        return false
      }else if(this.thisinfo.nickname == info.nickname 
                &&this.thisinfo.age == info.age 
                &&this.thisinfo.shool == info.shool
                &&this.thisinfo.sex == info.sex
                &&this.thisinfo.constellation == info.constellation
                &&this.thisinfo.schoolOpeningTime == info.schoolOpeningTime
                )
      {
        return false
      }else{
        return true
      }
    }
  },
  components:{
    backbar,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    [Popup.name]:Popup,
    [Picker.name]:Picker,
    [DatetimePicker.name]:DatetimePicker
  },
  created(){
    this.getthisheight()
  }
}
</script>

<style scoped>
.infosetup{
  background-color: #F8F8F8;
  position: relative;
}
input{
  padding: 0;
  margin: 0;
  border: none;
  text-align: right;
}
.van-cell-group{
  background: none;
}
.van-cell{
  margin-top: var(--marginMin);
} 
.submit{
  position:absolute;
  bottom: 0;
  height: calc(var(--marginMax)*2);
  width: 100%;
  background-color: #CFCFCF;
  color: #ffffff;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>