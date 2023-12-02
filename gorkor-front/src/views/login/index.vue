<script setup>
import { ref, reactive } from "vue";
</script>

<template>
  <div class="login">
    <div class="login_logo">
      <img src="@/assets/images/pen2.png" alt="" class="img" />
    </div>

    <div class="login_group">
      <div class="login_group_one">
        <input
          type="text"
          class="login__input"
          placeholder="账号名称"
          id="name"
          required
        />
        <label for="name" class="login__label">账号名称</label>
      </div>

      <div class="login_group_one">
        <input
          type="email"
          class="login__input"
          placeholder="账号密码"
          id="email"
          required
        />
        <label for="email" class="login__label">账号密码</label>
      </div>
    </div>

    <div class="login_button">
      <div class="login_button_title">登录</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &_logo {
    @include wh(15rem, 15rem);
    margin: 10rem auto 5rem;
    .img {
      @include wh(100%, 100%);
    }
  }

  &_group {
    &_one {
      width: 65%;
      margin: 0 auto;
      margin-bottom: 3rem;
    }

    // &_one:not(:last-child) {
    // }
  }

  &__input {
    font-size: 2rem;
    font-family: inherit;
    padding: 1.5rem 2rem;
    border-radius: 2px;
    color: inherit;
    background-color: rgba(226, 220, 222, 0.5);
    border: none;
    display: block;
    border-bottom: 3px solid transparent;
    width: 100%;

    &:focus {
      outline: none;
      border-bottom: 3px solid $click-color;
      box-shadow: 3px solid $click-color;
    }

    &:focus:invalid {
      border-bottom: 3px solid rgb(234, 134, 63);
    }
    //占位符 预输入文字的颜色
    &::-webkit-input-placeholder {
      color: $color-font;
    }
  }

  &__label {
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: 2rem;
    margin-top: 0.7rem;
    display: block;
    transition: all 0.9s;
    color: $click-color;
  }

  &__input:placeholder-shown + &__label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }

  &_button {
    @include wh(65%, 5rem);
    margin: 0 auto;
    background-color: $click-color;
    border-radius: 3px;
    color: white;
    position: relative;
    &_title {
      font-size: 2rem;
      @include pCenter(-50%, -50%);
    }
  }
}
</style>
