<script setup>
import { ref, reactive, computed } from "vue";

//点击和被点击的图片路径
const getImagePath = (imageName) => `/src/assets/images/${imageName}`;
const homeImage = getImagePath("home.png");
const homeCliCK = getImagePath("home-click.png");
const islandImage = getImagePath("island.png");
const islandClick = getImagePath("island-click.png");
const meImage = getImagePath("me.png");
const meClick = getImagePath("me-clike.png");

//computed
//根据Index动态切换图片路径
const homePath = computed(() =>
  activeIndex.value === 0 ? homeCliCK : homeImage
);
const islandPath = computed(() =>
  activeIndex.value === 1 ? islandClick : islandImage
);
const mePath = computed(() => (activeIndex.value == 2 ? meClick : meImage));

//点击切换图片方法
const activeIndex = ref(null);
const pageChange = (index) => {
  if (activeIndex.value !== index) {
    activeIndex.value = index;
  } else {
    activeIndex.valie = null;
  }
};
</script>

<template>
  <div>
    <div class="box">
      <nav class="box_nav">
        <router-link to="/">
          <div class="box_nav_img" @click="pageChange(0)">
            <img :src="homePath" class="img" alt="" />
          </div>
        </router-link>
        <router-link to="/island">
          <div class="box_nav_img" @click="pageChange(1)">
            <img :src="islandPath" class="img" alt="" />
          </div>
        </router-link>
        <router-link to="/mine">
          <div class="box_nav_img" @click="pageChange(2)">
            <img :src="mePath" class="img" alt="" />
          </div>
        </router-link>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: $brigecolor;

  &_nav {
    height: 5rem;
    z-index: 100;
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0px -2px 17px 10px rgba(#c8c5c5, 0.15);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    &_img {
      width: 3rem;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
