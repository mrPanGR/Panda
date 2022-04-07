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
        @focus="nicknamefontshow = !nicknamefontshow"
        @blur="nicknamefontshow = !nicknamefontshow"/>
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
        @focus="agefontshow = !agefontshow"
        @blur="agefontshow = !agefontshow"/>
      <!-- 性别 -->
      <van-cell title="性别" :value="thisinfo.sex? '男':'女'" @click="sexshow = !sexshow"/>
      <!-- <van-field v-model="thisinfo.sex" label="性别" input-align="right" />       -->
      <!-- 星座 -->
      <van-cell title="星座" :value="thisinfo.constellation" @click="constellationshow = !constellationshow" />
      <!-- <van-field v-model="thisinfo.constellation" label="星座" input-align="right"/> -->
      <!-- 学校 -->
      <van-field v-model="thisinfo.school" label="学校" input-align="right" :error-message="thisinfo.school == '' ? '不可为空':''" error-message-align="right"/>
      <!-- 开学时间 -->
      <van-cell :value="schoolOpeningTime_str"  title="开学时间" @click="schoolOpeningTimeshow = !schoolOpeningTimeshow"/>
      
    </van-cell-group>
    <div class="submit" :style="{background:submitbg? '#91CFFD':'#CFCFCF',pointerEvents: submitbg ? 'auto':'none'}" @click="submit()" >
      <span>提交</span>
    </div>
    <van-popup style="height:30%;" 
      v-model:show="sexshow" 
      :round="true"
      position="bottom">
      <van-picker 
        title="" 
        :columns="sexlist" 
        visible-item-count="3"
        @confirm="sexconfirm"
        @cancel="sexshow = false"
        />
    </van-popup>
    <van-popup style="height:50%;" 
      v-model:show="constellationshow" 
      :round="true"
      position="bottom">
      <van-picker 
        title="" 
        :columns="constellationlist" 
        visible-item-count="6"
        @confirm="constellationconfirm"
        @cancel="constellationshow = false"
        />
    </van-popup>
    <van-popup style="height:50%;" 
      v-model:show="schoolOpeningTimeshow" 
      :round="true"
      position="bottom">
      <van-datetime-picker
        v-model="schoolOpeningTime"
        type="date"
        title="选择年月日"
        @confirm="upshoolOpeningTime"
        @cancel="schoolOpeningTimeshow = false"        
      />
    </van-popup>
  </div>
</template>

<script>
import backbar from "@/components/common/backbar/backbar.vue"
import {Field, CellGroup,Cell,Popup,Picker,Toast,DatetimePicker  } from 'vant'
import {localStorageUpload,localStorageSelect,notNavthisHeight} from '@/assets/js/static.js'
import {ref,reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
export default {
  name:'infose',
  components:{
    backbar,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    [Popup.name]:Popup,
    [Picker.name]:Picker,
    [DatetimePicker.name]:DatetimePicker
  },
  setup(){
    let router = useRouter() //路由
    let sexlist =['男','女']
    let thisHeight = notNavthisHeight();
    let thisinfo = reactive(localStorageSelect("userinfo"))
    let agefontshow = ref(false)
    let nicknamefontshow =ref(false)
    let sexshow=ref(false)
    let constellationshow=ref(false)
    let schoolOpeningTimeshow=ref(false)
    let schoolOpeningTime = ref(new Date(thisinfo.schoolOpeningTime))
    let constellationlist = ["摩羯座","水瓶座","双鱼座","白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座"]

    let sexconfirm = (value) =>{
      thisinfo.sex = value == "男" ? 1:0
      sexshow.value = false
    };
    let constellationconfirm = (value)=>{
      thisinfo.constellation = value
      constellationshow.value = false
    }
    let upshoolOpeningTime = ()=>{
      thisinfo.schoolOpeningTime = schoolOpeningTime.value;
      schoolOpeningTimeshow.value = false
    }
    let back = ()=>{
      router.push("/personinfo")
    }
    let submit = () =>{
      localStorageUpload("userinfo",thisinfo)
      Toast("修改成功了窝")
    }
    let schoolOpeningTime_str = computed(()=>{
      let time = new Date(thisinfo.schoolOpeningTime)     
      return  time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()
    })
    let submitbg = computed(()=>{
      //获取未修改前的数据
      let info = localStorageSelect("userinfo")
      //判断是否修改 或 是否为空
      if(thisinfo.nickname == '' &&thisinfo.age == '' &&thisinfo.shool == ''){
        return false
      }else if(thisinfo.nickname == info.nickname 
                &&thisinfo.age == info.age 
                &&thisinfo.shool == info.shool
                &&thisinfo.sex == info.sex
                &&thisinfo.constellation == info.constellation
                &&thisinfo.schoolOpeningTime == info.schoolOpeningTime
                )
      {
        return false
      }else{
        return true
      }
    })

    return{
      sexlist,
      thisHeight,
      thisinfo,
      agefontshow,
      nicknamefontshow,
      sexshow,
      constellationshow,
      schoolOpeningTimeshow,
      constellationlist,
      schoolOpeningTime,
      sexconfirm,
      constellationconfirm,
      upshoolOpeningTime,
      back,
      submit,
      schoolOpeningTime_str,
      submitbg,
    }
  },
  
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