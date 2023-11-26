<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

//PROPS
const props = defineProps({
  nRoute: String,
});

const nextRoute = ref(props.nRoute);

const goback = () => {
  console.log("!1111");
  router.back();
};

const goNext = () => {
  router.push(`/${nextRoute.value}`);
};
</script>

<template>
  <div class="navhead">
    <div class="navhead_left" @click="goback">
      <img src="@/assets/images/arror.png" alt="" class="img" />
    </div>

    <slot name="navtitle"></slot>

    <div class="navhead_right" @click="goNext">
      <img src="@/assets/images/arror.png" alt="" class="img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navhead {
  height: 5rem;
  @include flex-box();
  background-color: rgb(171, 171, 171);
  position: fixed;
  z-index: 10;
  width: 100%;
  &_left {
    @include wh(100%, 100%);
    flex: 1;
    .img {
      @include wh(100%, 100%);
    }
  }

  &_right {
    @include wh(100%, 100%);
    flex: 1;
    .img {
      @include wh(100%, 100%);
    }
  }
}
</style>
