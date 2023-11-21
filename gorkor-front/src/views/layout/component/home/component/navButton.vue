<script setup>
import { ref, reactive } from "vue";

defineProps({
  bgcColor: String,
});
</script>

<template>
  <div class="button">
    <div class="button_head" :style="{ backgroundColor: bgcColor }">
      <slot name="bphoto"></slot>
    </div>
    <slot name="title"></slot>
  </div>
</template>

<style lang="scss" scoped>
.button {
  @include wh(7rem, 10rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &_head {
    @include wh(6.5rem, 6.5rem);
    @include flex-box-set(center, center);
    border-radius: 50%;
  }
}
</style>
