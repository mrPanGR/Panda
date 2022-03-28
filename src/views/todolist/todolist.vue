<template>
  <div style="height:100%;">
    <div class="border_shadow todolist_header">
      <div class="todolist_box">
        <input type="text" oninput="if(value.length > 11)value = value.slice(0, 11)" @focus="navbarshow()" @blur="navbarshow()"  placeholder="新增待办事项" v-model="content">        
        <div class="subbut" @click="submibtn()">提交</div>
      </div>
      <div class="operation">
        <div class="operation_time">
          <timebar :show="starshow" :time="startime" :title="startitle" :minTime="startime.split(':')[0]" @showPopup="starshowPopup" @confirm="startimeconfirm"></timebar>
          <div>-</div>
          <timebar :show="endshow" :time="endtime" :title="endtitle" :minTime="startime.split(':')[0]" @showPopup="endshowPopup" @confirm="endtimeconfirm"></timebar>
        </div>
        
        <div>
          <label style="font-size:var(--header);display:flex;align-items: center;justify-content: space-between;color:#666464;height: 1.5rem;width: 2.5rem;"><input type="checkbox" name="" id="" v-model="commonly" style="dorder-radius:100%;" ><span>常用</span></label>
        </div>
      </div>
    </div>
    <todolistbar size="max" :todolist="thistodolist"></todolistbar>
    
  </div>
</template>

<script>
import timebar from "@/components/common/timebar/timebar.vue"
import todolistbar from '@/components/common/todolistbar/todolistbar.vue'
import {parsejson,stringifyjson} from '@/assets/js/static.js'
import {Toast} from "vant"
export default {
  name:'todolist',
  data(){
    return{
      id:0,
      startime:new Date().getHours() +":"+new Date().getMinutes(),
      startitle:'开始时间',
      endtime:new Date().getHours() +":"+new Date().getMinutes(),
      endtitle:"结束时间",
      content:'',
      commonly:false,
      thistodolist:parsejson(localStorage.getItem("todolist")),
      starshow:false,
      endshow:false,
    }
  },
  computed:{
    
  },
  methods:{
    submibtn(){
      if(this.getIscontent() == true){
          let a = {
          id:"",
          content:'',
          startime:'',
          endtime:'',
          state:0,
          commonly:"",
        }
      //  console.log(typeof this.startime)
        this.id++      
        a.id = this.id
        a.content = this.content
        a.startime = this.startime
        a.endtime = this.endtime
        a.commonly = this.commonly
        this.thistodolist.push(a)
        localStorage.setItem("todolist",stringifyjson(this.thistodolist))
        this.startime= new Date().getHours() +":"+new Date().getMinutes(),
        this.startitle='开始时间',
        this.endtime=new Date().getHours() +":"+new Date().getMinutes(),
        this.endtitle="结束时间",
        this.content=''
        this.commonly=false
        // console.log(this.thistodolist)
      }          
      
    },
    getIscontent(){
      if(this.startitle =='开始时间'){
        Toast("请选择开始时间")
        return false
      }else if(this.endtitle =='结束时间'){
        Toast("请选择结束时间")
        return false
      }else if(this.content ==''){
        Toast("请填写今日事项")
        return false
      }else{        
        return true
      }
    },
    starshowPopup(val){
      this.starshow = val
    },
    endshowPopup(val){
      if(this.startitle == "开始时间"){
        Toast("请先选择开始时间")
      }else{
        this.endshow = val
      }
      
    },
    startimeconfirm(val){
      this.startime = val
      this.startitle = val
    },
    endtimeconfirm(val){
      this.endtime = val
      this.endtitle = val
      console.log(val)
    },
    navbarshow(){
      this.$store.commit('navbarshow')
    },
    getthisid(){
      let list = this.thistodolist
      // console.log(list.length)
      if(list.length != 0 ){
        let newlist = list.sort((a,b)=>{
          return b.id-a.id;
        })
        this.id = newlist[0].id
      }else{
        this.id = 0;
      }
      
      // console.log(this.id )
    }
  },
  components:{
    todolistbar,
    timebar
  },
  created(){
    this.getthisid()
  }
}
</script>

<style scoped>
.todolist_header{
  height: calc(5.625rem - (var(--marginMin) * 2) - 2px);
  background-color: white;
  border-radius: var(--marginMin);  
  padding: var(--marginMin);
}
.todolist_box{
  border-radius: var(--marginMin);  
  height: 3.125rem;
  display: flex;
  justify-content: space-between;
}
.operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operation_time{
  width: calc(var(--marginMax) * 6);
  height: calc(  0.75rem * 2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todolist_box input{
  width: 75%;
  border-radius: var(--marginMin) 0px 0px var(--marginMin);
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-bottom: 1px solid #000000;
  outline: none;
  padding: var(--marginMin);
  
}
.subbut{
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--title);
  background-color: #F6A89E;
  border-radius: 0 var(--marginMin) var(--marginMin) 0;
  border-top: 1px solid #000000;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
} 
</style>