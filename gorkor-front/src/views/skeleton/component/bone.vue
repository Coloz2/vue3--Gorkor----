<script setup>
import { ref, reactive, defineProps, onMounted } from "vue";

const props = defineProps({
  color: { type: String, default: "blue" },
  reverse: { type: Boolean, default: false },
  content: { type: Object, default: () => {} },
});

import { useRouter } from "vue-router";
const router = useRouter();
function toRead() {
  const id = ref(props.content.senderId);
  const time = ref(props.content.sendLoginAt);
  router.push({ name: "read", params: { id: id.value, time: time.value } });
}
onMounted(() => {});
</script>

<template>
  <div
    class="bone"
    :style="{ transform: reverse ? 'scaleX(-1)  ' : 'scaleX(1)' }"
  >
    <div
      class="bone_big"
      :style="{ backgroundColor: props.color }"
      @click="toRead"
    ></div>
    <div class="bone_line" :style="{ backgroundColor: props.color }">
      <span
        :style="{ transform: reverse ? 'scaleX(-1)  ' : 'scaleX(1)' }"
        v-if="props.reverse"
        >寄(已收取)</span
      >
      <span
        :style="{ transform: reverse ? 'scaleX(-1)  ' : 'scaleX(1)' }"
        v-else
        >收(已收取)</span
      >
      <span :style="{ transform: reverse ? 'scaleX(-1)  ' : 'scaleX(1)' }"
        >2023-09-23</span
      >
    </div>
    <div class="bone_little" :style="{ backgroundColor: props.color }"></div>
    <div class="bone_line2"></div>
  </div>
</template>

<style lang="scss" scoped>
.bone {
  position: relative;
  @include wh(19rem, 12rem);
  transform-origin: calc(100% - 1rem) center; /* 设置旋转的原点为右上角 */
  @include flex-box-set(flex-end, center);
  &_little {
    @include wh(2rem, 2rem);
    border-radius: 50%;
  }
  &_line {
    font-size: 1.5rem;
    span {
      padding: 1.5rem;
    }
    display: flex;
    align-items: center;
    height: 4px;
    flex-direction: column;
    justify-content: space-around;
    @include wh(10rem, 4px);
  }
  &_big {
    @include wh(7rem, 7rem);
    border-radius: 50%;
  }

  &_line2 {
    @include wh(1rem, 100%);
    z-index: -1;
    position: absolute;
    transform: translateX(-50%);
    background-color: rgb(202, 200, 200);
  }
}
</style>
