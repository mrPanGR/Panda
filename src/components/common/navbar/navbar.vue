<template>
  <div class="nav">
    <template  v-for="i in navlist" :key="i.id" >
      <div v-if="i.state" class="nav_item border_shadow" :class="i.name == active_name? 'nav_active' : '' " @click="activeItem(i.name)">        
          <navbaritem :imgUrl = "i.icon">
            <template v-slot:item></template>
          </navbaritem> 
      </div>  
    </template>  
  </div>
</template>

<script>

import {localStorageSelect} from '@/assets/js/static.js'
import navbaritem from './navbaritem.vue'
export default {
  data(){
    return{
      navlist:localStorageSelect('navlist'),
      active_name:""
    }    
  },
  props:{

  },
  methods:{
    activeItem(activename){
      // this.active = !this.active
      this.active_name = activename
      for (let i of this.navlist) {
        if(i.name == activename){
          this.$router.push(i.path)
        }
      }
      // this.navlist.filter((x)=>{
      //   x.name == activename ? this.$router.push(x.path) : ''
      // })
      
    }
  },
  components:{
    navbaritem
  },
  created(){
    // console.log(this.$route)
    this.activeItem(this.$route.name)
  }
}
</script>

<style>

.nav{
  height: var(--navheight);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #E9F4FA;
}
.nav_item{
  height: var(--navitem);
  width:  var(--navitem);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}
.nav_active{
  background-color: #91cefdc0;
  transition: background .5s ;
}
</style>