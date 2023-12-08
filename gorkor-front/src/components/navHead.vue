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

    <div class="navhead_mid">
      <span><slot name="navtitle"></slot></span>
    </div>

    <div class="navhead_right" @click="goNext">
      <slot name="navright"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navhead {
  &_mid {
    flex: 6;
    span {
      font-size: 1.5rem;
      @include flex-box-set(center, center);
    }
  }
  height: 5rem;
  @include flex-box();
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 10;
  width: 100vw;
  &_left {
    flex: 1;
    transform: rotate(180deg);
    @include flex-box-set(center, center);
    .img {
      // margin: 0 auto;
      @include wh(60%, 60%);
    }
  }

  &_right {
    @include flex-box-set(center, center);
    flex: 1;
  }
}
</style>
