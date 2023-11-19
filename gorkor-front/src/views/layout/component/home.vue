<script setup>
import { ref, reactive } from "vue";
</script>

<template>
  <div class="home">
    <div class="home_head">
      <span class="home_head_span">过客</span>
    </div>
    <nav class="home_nav"></nav>
    <div class="home_brige"></div>
    <div class="home_feature"></div>
    <div class="home_list"></div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 93vh;
  background-color: $brigecolor;
  &_head {
    display: flex;
    justify-content: center;
    &_span {
      color: #5d5d5d;
      font-size: 1.8rem;
    }
    background-color: $color-white;
    height: 5rem;
    border-bottom: 2px solid #f7f7f7;
  }

  &_nav {
    height: 13rem;
    background-color: $color-white;
  }

  &_brige {
    margin-top: 2rem;
    height: 9rem;
    background-color: $color-white;
  }

  &_feature {
    margin-top: 2rem;
    height: 18rem;
    background-color: $color-white;
  }

  &_list {
    margin-top: 2rem;
    height: 12rem;
    background-color: $color-white;
  }
}
</style>
