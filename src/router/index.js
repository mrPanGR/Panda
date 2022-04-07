import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'
import {navlist,otherpages} from '@/assets/js/static.js' 


let childrenlist = []
for (let i of navlist) {
  childrenlist.push({path:i.path,name: i.name,component:() => import('../views'+i.parent+'/'+i.name+'.vue'),meta:{index:i.id}})
}
let otherlist = []
for (let i of otherpages) {
  otherlist.push({path:i.path,name: i.name,component:() => import('../views'+i.parent+'/'+i.name+'.vue')})
}
const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    children:childrenlist
  },  
  otherlist[0],
  otherlist[1],
  otherlist[2],
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.name =="login"){
    next();
  }else if(to.name == 'index'){
    next({name:'timeclass'})
  }else{
    localStorage.getItem("userinfo") ? next() : next({name:"login"})
  }
})

export default router
