<script setup>
import { ref, reactive } from "vue";
import NavHead from "@/components/navHead.vue";
</script>

<template>
  <div class="priview">
    <nav-head class="priview_nav">
      <template #navtitle>
        <span>信件预览</span>
      </template>
    </nav-head>

    <div class="priview_body">
      <img src="@/assets/images/fe.jpg" class="img" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.priview {
  width: 100%;
  &_nav {
    span {
      flex: 6;
      font-size: 1.5rem;
      @include flex-box-set(center, center);
    }
  }

  &_body {
    height: 92vh;
    .img {
      @include wh(100%, 100%);
    }
  }
}
</style>
