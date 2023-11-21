<script setup>
import { ref, reactive } from "vue";
</script>

<template>
  <div class="selectBox">
    <div class="selectBox_left">
      <div class="selectBox_left_Photo">
        <slot name="photo"></slot>
        <!-- <img src="@/assets/images/home.png" class="limg" /> -->
      </div>
      <!-- <span>通知</span> -->
      <slot name="title"></slot>
    </div>
    <div class="selectBox_right">
      <img src="@/assets/images/arror.png" alt="" class="img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selectBox {
  height: 6rem;
  background-color: $color-white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  &_left {
    height: 4rem;
    width: 10rem;
    // @include wh(10rem,4rem)
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    &_Photo {
      height: 100%;
      width: 4rem;
    }
  }

  &_right {
    height: 4rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      width: 70%;
      height: 70%;
    }
  }
}
</style>
