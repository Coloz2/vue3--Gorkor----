<script setup>
import { ref, reactive, onMounted } from "vue";
const handleDown = () => {
  console.log("单击");

  const handleMove = (event) => {
    const x = event.layerX;
    console.log("移动");
  };

  const handleUp = () => {
    console.log("松开");
    // 在松开事件处理函数内取消移动事件的注册
    document.removeEventListener("touchmove", handleMove);
  };

  // 在单击事件处理函数内注册移动和松开事件
  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchend", handleUp);
};
</script>

<template>
  <div class="sb" @touchstart="handleDown"></div>
</template>

<style lang="scss" scoped>
.sb {
  background-color: red;
  width: 300px;
  height: 300px;
}
</style>
