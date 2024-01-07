<script setup>
import { ref, reactive } from "vue";
</script>

<template>
  <div class="shop">
    <div class="shop_head">
      <router-link to="/shop/stamp">
        <span class="test">邮票</span>
      </router-link>
      <router-link to="/shop/letter">
        <span>信纸</span>
      </router-link>
      <router-link to="/">
        <span>其他</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.shop {
  @include wh(100%, 100%);
  &_head {
    font-size: 2.2rem;
    margin: 0 auto;
    width: 80%;
    padding: 1rem 3rem 1rem 3rem;
    @include flex-box-set(space-around, center);
    .router-link-exact-active {
      span {
        color: $click-color;
        padding-bottom: 1rem;
        border-bottom: 1px $click-color solid;
      }
    }

    // span > :first-child {
    //   color: $click-color;
    //   padding-bottom: 1rem;
    //   border-bottom: 1px $click-color solid;
    // }
  }
}
</style>
