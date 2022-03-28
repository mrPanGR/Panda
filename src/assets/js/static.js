//个人信息
export const personinfo ={
  nickname:"Hua",
  age:22,
  sex:0,
  constellation:'狮子座',
  school:"玉林师范学院",
  portrait:"https://tse4-mm.cn.bing.net/th/id/OIP-C.Qs194pnyMilbvmlB2pQUXQAAAA?w=186&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  is_class:false,
  //使用手机号码登录
  phone:"admin",
  password:"admin",
  //密码 md5加密
  schoolOpeningTime : +new Date("2022/2/28")

}
export const otherpages=[
  {id:5,str_name:'基本信息',name:"infosetup",path:"/infosetup",parent:'/personinfo',state:true},
  {id:6,str_name:'功能设置',name:"power",path:"/power",parent:'/personinfo',state:true},
  {id:6,str_name:'登录',name:"login",path:"/login",parent:'',state:true},
  
]

//导航路由列表
export const navlist =[
  {id:1,str_name:'今日事项',name:"todolist",icon:require('@/assets/img/nav_img/todolist.png'),path:"/todolist",parent:'/todolist',state:true},
  {id:2,str_name:'课表',name:"timeclass",icon:require('@/assets/img/nav_img/timeclass.png'),path:"/timeclass",parent:'/timeclass',state:true},
  {id:3,str_name:'首页',name:"home",icon:require('@/assets/img/nav_img/home.png'),path:"/home",parent:'/home',state:true},
  {id:4,str_name:'备忘录',name:"memorandum",icon:require('@/assets/img/nav_img/memorandum.png'),path:"/memorandum",parent:'/memorandum',state:true},
  {id:5,str_name:'个人信息',name:"personinfo",icon:require('@/assets/img/nav_img/personInfo.png'),path:"/personinfo",parent:'/personinfo',state:true},
]
export const defulteNav = navlist[1].name
// state：0=正在进行中 1：一般完成 2： 常用完成 3:删除
export let todolist =[
  // {id:1,content:'起',startime:'8:00',endtime:'3:00',state:0},
  // {id:2,content:'起床',startime:'2:30',endtime:'10:00',state:0},
  // {id:3,content:'起床冲',startime:'3:00',endtime:'10:00',state:2},
  // {id:4,content:'起床冲一',startime:'4:00',endtime:'10:00',state:3},
  // {id:5,content:'起床冲一杯',startime:'5:00',endtime:'10:00',state:0},
  // {id:6,content:'起床冲一杯手',startime:'6:00',endtime:'10:00',state:1},
  // {id:7,content:'起床冲一杯手冲',startime:'7:00',endtime:'10:00',state:2},
  // {id:8,content:'起床冲一杯手冲咖',startime:'8:00',endtime:'10:00',state:3},
  // {id:9,content:'起床冲一杯手冲咖啡',startime:'9:00',endtime:'10:00',state:0},
  // {id:10,content:'起床冲一杯手冲咖',startime:'11:00',endtime:'10:00',state:1},
  // {id:11,content:'起床冲一杯手冲',startime:'12:00',endtime:'10:00',state:2},
  // {id:12,content:'起床冲一杯手',startime:'13:00',endtime:'10:00',state:3},
]
//课表静态数据
export const classlist = [
  {cid:1,classname:'软件',instructor:"罗国星",color:"#B2FAE3"},
  {cid:2,classname:'程序设计',instructor:"蒙峭缘",color:"#FED1E2"},
  {cid:3,classname:'算法',instructor:"张颖",color:"#FEE6BF"},
  {cid:4,classname:'数据库',instructor:"李露璐",color:"#DCD2FF"},
  {cid:5,classname:'马克思',instructor:'周金花',color:"#B2F8FA"},
  {cid:6,classname:'前端',instructor:'李华',color:"#98CDB6"},
  {cid:7,classname:'形势',instructor:'李翔',color:"#7D8D7A"}
]
export const timeclasslist =[
  {id:1,numbered:2,week:1,starweek:1,endweek:11,cid:1,classroom:"博学2203"},
  {id:2,numbered:2,week:1,starweek:13,endweek:17,cid:1,classroom:"博学2203"},
  {id:3,numbered:1,week:3,starweek:1,endweek:11,cid:2,classroom:"厚德3202"},
  {id:4,numbered:1,week:3,starweek:13,endweek:17,cid:2,classroom:"厚德3202"},
  {id:5,numbered:2,week:3,starweek:1,endweek:12,cid:3,classroom:"厚德3204"},
  {id:6,numbered:2,week:3,starweek:14,endweek:17,cid:3,classroom:"厚德3204"},
  {id:7,numbered:3,week:3,starweek:1,endweek:11,cid:2,classroom:"知行401-2"},
  {id:8,numbered:3,week:3,starweek:13,endweek:17,cid:2,classroom:"知行401-2"},
  {id:9,numbered:5,week:3,starweek:1,endweek:11,cid:1,classroom:"知行601-1"},
  {id:10,numbered:5,week:3,starweek:13,endweek:17,cid:1,classroom:"知行601-1"},
  {id:11,numbered:1,week:4,starweek:1,endweek:11,cid:4,classroom:"厚德2404"},
  {id:12,numbered:1,week:4,starweek:13,endweek:17,cid:4,classroom:"厚德2404"},  
  {id:13,numbered:2,week:4,starweek:1,endweek:11,cid:4,classroom:"知行601-1"},
  {id:14,numbered:2,week:4,starweek:13,endweek:17,cid:4,classroom:"知行601-1"},
  {id:15,numbered:3,week:4,starweek:1,endweek:11,cid:5,classroom:"博学1103"},
  {id:16,numbered:3,week:4,starweek:13,endweek:17,cid:5,classroom:"博学1103"},
  {id:17,numbered:4,week:4,starweek:1,endweek:11,cid:6,classroom:"知行304"},
  {id:18,numbered:4,week:4,starweek:13,endweek:17,cid:6,classroom:"知行304"},
  {id:19,numbered:5,week:4,starweek:1,endweek:11,cid:6,classroom:"知行601-1"},
  {id:20,numbered:5,week:4,starweek:13,endweek:17,cid:6,classroom:"知行601-1"},
  {id:21,numbered:2,week:5,starweek:1,endweek:12,cid:3,classroom:"知行601-1"},
  {id:22,numbered:2,week:5,starweek:13,endweek:17,cid:3,classroom:"知行601-1"},
  {id:23,numbered:5,week:5,starweek:6,endweek:9,cid:7,classroom:"博学2101"},
  {id:24,numbered:5,week:5,starweek:6,endweek:9,cid:7,classroom:"博学2101"},
  {id:25,numbered:3,week:6,starweek:1,endweek:4,cid:5,classroom:" "},
  {id:26,numbered:4,week:6,starweek:1,endweek:4,cid:5,classroom:" "},
]
export function parsejson(value){
  return JSON.parse(value)
}
export function stringifyjson(value){
  return JSON.stringify(value)
}
