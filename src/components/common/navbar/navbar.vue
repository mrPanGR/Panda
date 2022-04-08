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
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name:"navbar",
  components:{
    navbaritem
  },
  setup(){
    let router = useRouter()
    let route = useRoute()
    let navlist = ref(localStorageSelect('navlist'))
    let active_name = ref("")
    let activeItem = (name) =>{
      active_name.value = name
      for (let i of navlist.value) {
        if(i.name == name){
          router.push(i.path)
        }
      }      
    }
    activeItem(route.name)
    return{
      navlist,
      active_name,
      activeItem,
    }
  },
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