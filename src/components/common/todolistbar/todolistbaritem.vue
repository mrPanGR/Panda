<template>
  <div
    class="item"
    :style="{ background: bgColor[commonly && state == 1 ? 2 : state] }"
  >
    <div class="item_content">
      <div class="radio">
        <van-icon name="success" v-if="state == 0" @click="complete(id)" />
      </div>
      <div class="content">
        <span>{{ text }}</span>
      </div>
      <div class="radio">
        <van-icon name="cross" v-if="state == 0" @click="del(id)" />
      </div>
    </div>
    <div class="item_time">
      <span>{{ startime }}</span>
      <span>{{ endtime }}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "todolistbaritem",
  components: {
    [Icon.name]: Icon,
  },
  props: ["id", "text", "startime", "endtime", "state", "commonly"],
  emits: ["del", "complete"],
  setup(props, content) {
    console.log();
    let bgColor = ["#F9F3E5", "#DCFBBD", "#D0F4F0", "#FFD6E9"];
    let del = (val) => {
      content.emit("del", val);
    };
    let complete = (val) => {
      content.emit("complete", val);
    };
    return {
      bgColor,
      del,
      complete,
    };
  },
};
</script>

<style scoped>
.item {
  height: 3.5rem;
  margin: var(--marginMax) 0;
}
.item_content {
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.radio {
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  height: 20px;
  font-size: var(--content);
  padding: 0 10px;
}
.item_time {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  font-size: var(--header);
}
</style>