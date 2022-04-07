<template>
  <div class="classlist border_shadow">    
    <div class="classlist_header">
      <div>Month <span>{{thisMonth}}</span></div>
      <div @click="selectWeek">第 <span>{{Math.ceil(whatweek)}}</span> 周</div>
    </div>    
    <table>
      <tr>
        <th v-for="i in thisWeeklisk" :key="i" :style="{width: thisTdWidth +'rem'}" > 
         {{i.strweek}}<br/>
         <span>{{new Date(i.time).getDate()}}日</span>
        </th>
      </tr>
        <tr v-for="i in classlist" :key="i">
          <template v-if="i">
            <td v-for="item,index in i" :key="index" :style="{background: item? item.color :'',width: thisTdWidth +'rem',height:thisTdHeith+'rem'}" @click="item ? showinstructor(item.instructor): ''">
              <template v-if="item">              
                {{item.classname}}
                <br>
                {{item.classroom}}
              </template>
            </td>
          </template>
        </tr>
    </table>
    <van-popup 
      v-model:show="barshow"
      round
      position="bottom"    
      @click-overlay="clickOverlay"
      :style="{ height: '50%' }"
    >
      <van-picker
        title=""
        :columns="weeklist"
        :default-index="Math.ceil(whatweek)-1"
        @confirm="onConfirm"
        @cancel="onCancel"
      />      
    </van-popup>
  </div>  
</template>

<script>
import {localStorageSelect,localStorageUpload} from '@/assets/js/static.js'
import {Popup,Picker,Toast } from 'vant'
export default {
  name:'timeclass',
  data(){
    return {
      thistimeclasslist:[],
      weeklist:[],
      whatweek:0,      
      schoolOpeningTime: new Date(localStorageSelect("userinfo").schoolOpeningTime),
      barshow:false,
    }
  },
  components:{
    [Popup.name]:Popup,
    [Picker.name]:Picker
  },
  computed:{
    classlist(){
      
      if(this.thistimeclasslist){
      //  console.log(this.thistimeclasslist)
        let a = this.thistimeclasslist.filter((x)=>{
          return Math.ceil(this.whatweek) >= x.starweek && Math.ceil(this.whatweek) <= x.endweek
        })
          let item = new Array(5)
          
          for(let i=1;i <= 5;i++){
            let list = new Array(7)
            for(let j in a){
              if(a[j].numbered == i){
                list[a[j].week -1] = a[j]
              }
            }
            item[i-1] = list
          }
           
          return item   
      }else{
        return []
      }
       
    },
    thisMonth(){      
      if(this.whatweek == 0){
        return new Date().getMonth() + 1
      }else{
        let mm = this.whatweek * (1000*60*60*24)*7
        return new Date(+this.schoolOpeningTime + mm).getMonth()+1
      }
    },
    thisWeeklisk(){
      let arr = new Array(7)
      let weeklist = ["周一","周二","周三","周四","周五","周六","周日"]
      let mm = Math.ceil(this.whatweek) * (1000*60*60*24)*7
      let thistime = new Date(+this.schoolOpeningTime + mm)
      for(let i = 6;i>=0;i--){
        let time = thistime.setDate(thistime.getDate() - 1)
        
        arr[i] = {strweek:weeklist[i],time:time}
      }
      return arr;
    },
    thisTdWidth(){
      return document.body.clientWidth / 7 / 16
    },
    thisTdHeith(){
      
        return (document.documentElement.clientHeight / 16 - 4.5 - 2.5 - 4.375)/5
        // window.screen.height / 16 - 4.375 - 0.625 +"rem"
         
      
    }
  },
  methods:{
    getThisWeek(){
      let week = new Date() - this.schoolOpeningTime
      week = week/(1000*60*60*24)/7
      this.whatweek = week
    },
    selectWeek(){
      this.barshow =  ! this.barshow
    },
    clickOverlay(){
      this.barshow =  ! this.barshow
    },
    getweeklist(){
      for(let i = 1; i<=20; i++){
        this.weeklist.push( Math.ceil(this.whatweek) == i ? "当前第" + i + "周":"第" + i + "周") 
      }
    },
    onConfirm(value, index){
      this.whatweek = index+1;
      this.barshow =  ! this.barshow
    },
    onCancel(){
      this.barshow =  ! this.barshow
    },
    showinstructor(val){
      Toast(val)
    },
    getclasslist(){
      let classlist = localStorageSelect("classlist")
      let timeclasslist = localStorageSelect("timeclasslist")
      for (let i in timeclasslist){
        for(let item in classlist){
          if(timeclasslist[i].cid == classlist[item].cid){
            timeclasslist[i]["classname"] = classlist[item].classname
            timeclasslist[i]["instructor"] = classlist[item].instructor
            timeclasslist[i]["color"] = classlist[item].color
          }           
        }
      }
      // console.log(timeclasslist)
      this.thistimeclasslist = timeclasslist
    }
  },
  created(){
    this.getThisWeek()
    this.getweeklist()
    this.getclasslist()
    
    // console.log(this.schoolOpeningTime)
  }
}
</script>

<style scoped>
.classlist{
  height:calc(100% - 8px);
  border-radius: var(--marginMin) ;
  overflow: hidden;
}
.classlist_header{
  height: calc(var(--marginMax) * 2);
  padding: 0 calc(var(--marginMax) / 2);
  background-color: #91CFFD;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #ffffff;
  border-bottom: 1.5px solid #6e6e6e;
  position: relative;
}
.classlist_header::after,.classlist_header::before{
  content: '';
  height: .7rem;
  width: .7rem;
  border-radius: 50%;
  position: absolute;
  background-color: #ffffff;
}
.classlist_header::after{
  top: .3rem;
  left: .3rem;
}
.classlist_header::before{
  top: .3rem;
  right: .3rem;
}
.classlist_header span{
  font-size: var(--title);
}
table{
  width: 100%;
  padding: 0;
  
  text-align: center;
  height: calc(100% - var(--marginMax) - 2rem);
}
table th{
  font-weight: 100;
  height: 2rem;
  font-size: var(--header);  
}
table th span{
  color: #C7C7C7;
  font-weight: 100;
}
table td {
  font-weight: 500;
  font-size: var(--content);  
  writing-mode:vertical-lr;
  font-family: 'Courier New', Courier, monospace;
}
</style>