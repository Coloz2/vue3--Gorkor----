<script setup>
import { ref, reactive, onMounted } from "vue";
import bone from "../skeleton/component/bone.vue";
import { getHistory } from "../../api/sendAPI.js";
const props = defineProps({
  sid: String,
  cid: String,
});

const totalLetter = ref([]);
onMounted(async () => {
  //取值 获取所有信件
  const {
    data: { receive, send },
  } = await getHistory(props.sid, props.cid);
  totalLetter.value = [...receive, ...send];
  //根据发出时间排序
  totalLetter.value.sort(
    (a, b) => new Date(a.sendLoginAt) - new Date(b.sendLoginAt)
  );
  totalLetter.value.forEach((item) => {
    item.sendOff = item.receiverId !== props.cid;
  });
  console.log(totalLetter.value);
});
</script>

<template>
  <div class="skeleton">
    <nav-head>
      <template #navtitle>
        <span color="#693154">过往信件</span>
      </template>
    </nav-head>

    <div class="skeleton_body">
      <bone
        v-for="item in totalLetter"
        :class="item.sendOff ? '' : 'left'"
        :color="item.sendOff ? '#fddd69' : '#87c5fb'"
        :reverse="item.sendOff ? false : true"
        :content="item"
      ></bone>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .left {
//   margin-left: 41%;
// }
.skeleton {
  width: 100vw;

  position: relative;
  &_body {
    min-height: 100vh;
    background-color: rgb(247, 244, 239);
    width: 100%;
    transform: translateY(5rem);
    padding: 3rem;
    &_centerLine {
      @include wh(3px, 98%);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgb(202, 200, 200);
    }
  }
}
</style>
