<script setup>
import { ref, reactive } from "vue";
</script>

<template>
  <div class="box">
    <nav class="box_nav">
      <router-link to="/">
        <div class="box_nav_img">
          <img src="/src/assets/images/home.png" class="img" alt="" />
        </div>
      </router-link>
      <router-link to="/island">
        <div class="box_nav_img">
          <img src="/src/assets/images/island.png" class="img" alt="" />
        </div>
      </router-link>
      <router-link to="/mine">
        <div class="box_nav_img">
          <img src="/src/assets/images/me.png" class="img" alt="" />
        </div>
      </router-link>
    </nav>
  </div>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: $brigecolor;

  &_nav {
    height: 5rem;
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
