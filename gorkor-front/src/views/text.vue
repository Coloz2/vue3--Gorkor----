<script setup>
import { ref, reactive, onMounted } from "vue";

const handleDown = () => {
  console.log("单击");

  const handleMove = (event) => {
    const x = event.layerX;
    console.log("移动");
  };

  const handleup = () => {
    console.log("松开");
    window.removeEventListener("pointermove", handleMove);
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleup);
};
</script>

<template>
  <div class="sb" @pointerdown="handleDown"></div>
</template>

<style lang="scss" scoped>
.sb {
  background-color: red;
  width: 300px;
  height: 300px;
}
</style>
