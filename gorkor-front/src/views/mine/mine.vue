<script setup>
import selectBox from "./component/selectBox.vue";
import { ref, reactive } from "vue";
</script>

<template>
  <div class="mine">
    <div class="mine_head">
      <span class="mine_head_span">个人</span>
    </div>
    <div class="mine_identity">
      <div class="mine_identity_left">
        <div class="mine_identity_left_photo"></div>
        <div class="mine_identity_left_title">
          <h2>小心我猹你</h2>
          <span>蟒蟒 看猹</span>
        </div>
      </div>
      <div class="mine_identity_right">
        <img src="@/assets/images/arror.png" alt="" class="img" />
      </div>
    </div>

    <select-box class="mine_notif">
      <template #photo>
        <img src="../../assets/images/home.png" class="limg" alt="" />
      </template>
      <template #title>
        <span>通知</span>
      </template>
    </select-box>
    <router-link to="/shop/stamp">
      <select-box>
        <template #photo>
          <img src="../../assets/images/home.png" class="limg" alt="" />
        </template>
        <template #title>
          <span>商城</span>
        </template>
      </select-box>
    </router-link>
    <select-box>
      <template #photo>
        <img src="../../assets/images/home.png" class="limg" alt="" />
      </template>
      <template #title>
        <span>积分</span>
      </template>
    </select-box>
    <select-box>
      <template #photo>
        <img src="../../assets/images/home.png" class="limg" alt="" />
      </template>
      <template #title>
        <span>邀请</span>
      </template>
    </select-box>

    <select-box style="margin-top: 2rem">
      <template #photo>
        <img src="../../assets/images/home.png" class="limg" alt="" />
      </template>
      <template #title>
        <span>设置</span>
      </template>
    </select-box>
  </div>
</template>

<style lang="scss" scoped>
.limg {
  width: 100%;
  height: 100%;
}
.mine {
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

  &_identity {
    padding: 0 2rem;
    height: 8rem;
    background-color: $color-white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_left {
      @include wh(16rem, 7rem);
      @include flex-box();
      &_photo {
        border-radius: 50%;
        background-color: blue;
        width: 5rem;
        height: 5rem;
      }

      &_title {
        @include wh(8rem, 5rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h2 {
          font-size: 1.6rem;
        }
        span {
          color: gray;
          font-size: 1.4rem;
        }
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
  &_notif {
    margin: 2rem 0;
  }
}
</style>
