<template>
  <div style="height: 100%">
    <div class="border_shadow todolist_header">
      <div class="todolist_box">
        <input
          type="text"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
          @focus="navbarshow()"
          @blur="navbarshow()"
          placeholder="新增待办事项"
          v-model="inittodolist.content"
        />
        <div class="subbut" @click="submibtn()">提交</div>
      </div>
      <div class="operation">
        <div class="operation_time">
          <Tbar
            :show="starshow"
            :time="inittodolist.startime"
            :title="inittodolist.startitle"
            :minTime="inittodolist.startime.split(':')[0]"
            @onshowPopup="starshowPopup"
            @onconfirm="startimeconfirm"
          ></Tbar>
          <div>-</div>
          <Tbar
            :show="endshow"
            :time="inittodolist.endtime"
            :title="inittodolist.endtitle"
            :minTime="inittodolist.startime.split(':')[0]"
            @onshowPopup="endshowPopup"
            @onconfirm="endtimeconfirm"
          ></Tbar>
        </div>

        <div>
          <label
            style="
              font-size: var(--header);
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #666464;
              height: 1.5rem;
              width: 2.5rem;
            "
            ><input
              type="checkbox"
              name=""
              id=""
              v-model="inittodolist.commonly"
              style="dorder-radius: 100%"
            /><span>常用</span></label
          >
        </div>
      </div>
    </div>
    <todolistbar size="max"></todolistbar>
  </div>
</template>

<script>
import Tbar from "@/components/common/Timebar/Timebar";
import todolistbar from "@/components/common/todolistbar/todolistbar.vue";
import { Toast } from "vant";
import { reactive, ref } from "@vue/reactivity";
import store from "@/store";
export default {
  name: "todolist",
  components: {
    todolistbar,
    Tbar,
  },
  setup() {
    //#region data数据
    let inittodolist = reactive({
      id: 0,
      startime: new Date().getHours() + ":" + new Date().getMinutes(), //这里有问题
      startitle: "开始时间",
      endtime: new Date().getHours() + ":" + new Date().getMinutes(), //这里跟上面一样的问题
      endtitle: "结束时间",
      content: "",
      commonly: false,
      state:0
    });
    let thistodolist = store.state.todolist
    let starshow = ref(false);
    let endshow = ref(false);
    //#endregion
    let getIscontent = () => {
      if (inittodolist.startitle == "开始时间") {
        Toast("请选择开始时间");
        return false;
      } else if (inittodolist.endtitle == "结束时间") {
        Toast("请选择结束时间");
        return false;
      } else if (inittodolist.content == "") {
        Toast("请填写今日事项");
        return false;
      } else {
        return true;
      }
    };
    //console.log(getIscontent.value);
    //#region 方法
    //提交按钮方法
    let submibtn = () => {
      if (getIscontent()) {
        inittodolist.id++;
        let {id,startime,endtime,content,commonly,state} = inittodolist
        store.dispatch("todolistadd",{id,startime,endtime,content,commonly,state})
        inittodolist.startime = new Date().getHours() + ":" + new Date().getMinutes(),
        inittodolist.startitle = "开始时间",
        inittodolist.endtime = new Date().getHours() + ":" + new Date().getMinutes(),
        inittodolist.endtitle = "结束时间",
        inittodolist.content = "";
        inittodolist.commonly = false;
      }
    };
    //开始时间-选择显示
    let starshowPopup = (val) => {
      // console.log(typeof val);
      starshow.value = val;
    };
    //结束时间-选择显示
    let endshowPopup = (val) =>
      inittodolist.startitle == "开始时间"
        ? Toast("请先选择开始时间")
        : (endshow.value = val);
    //开始时间
    let startimeconfirm = (val) => {
      inittodolist.startime = val;
      inittodolist.startitle = val;
    };
    //结束时间
    let endtimeconfirm = (val) => {
      inittodolist.endtime = val;
      inittodolist.endtitle = val;
    };
    //内容输入时底部导航隐藏
    let navbarshow = () => {
      store.commit("navbarshow");
    };
    //获取todolist 的最后一个id 没有则返回0
    if(thistodolist.length != 0){
       inittodolist.id = thistodolist.sort((a, b) => {         
          return b.id - a.id ;
        })[0].id
    }else{
      inittodolist.id = 0
    }
    //#endregion

    return {
      inittodolist,
      thistodolist,
      starshow,
      endshow,
      submibtn,
      starshowPopup,
      endshowPopup,
      startimeconfirm,
      endtimeconfirm,
      navbarshow,
    };
  },
};
</script>

<style scoped>
.todolist_header {
  height: calc(5.625rem - (var(--marginMin) * 2) - 2px);
  background-color: white;
  border-radius: var(--marginMin);
  padding: var(--marginMin);
}
.todolist_box {
  border-radius: var(--marginMin);
  height: 3.125rem;
  display: flex;
  justify-content: space-between;
}
.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operation_time {
  width: calc(var(--marginMax) * 6);
  height: calc(0.75rem * 2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todolist_box input {
  width: 75%;
  border-radius: var(--marginMin) 0px 0px var(--marginMin);
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-bottom: 1px solid #000000;
  outline: none;
  padding: var(--marginMin);
}
.subbut {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--title);
  background-color: #f6a89e;
  border-radius: 0 var(--marginMin) var(--marginMin) 0;
  border-top: 1px solid #000000;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
}
</style>