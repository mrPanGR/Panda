<template>
  <div class="bg">
    <div class="viwes" :style="{height:thisHeight}" @resize="getThisHeight()">
      <router-view/>
    </div>
    <navbar v-show="$store.state.barshow"></navbar>
  </div>  
</template>

<script>
import navbar from '@/components/common/navbar/navbar.vue'

export default {
  name:'index',
  data(){
    return {
      thisHeight:""
    }
  },
  components:{
    navbar
  },
  methods:{
    getThisHeight(){
      // console.log(document.documentElement.clientHeight)
      this.thisHeight =  (document.documentElement.clientHeight / 16 ) - 4.375 - 0.625 +"rem"
    }
  },
  created(){
    this.getThisHeight();
  },
  
}
</script>

<style scoped>
.bg{
  display: flex;
  flex-direction: column;
  background-color: #E9F4FA;
}
.viwes{
  padding: var(--marginMin) var(--marginMin) 0 var(--marginMin) ;
}
</style>