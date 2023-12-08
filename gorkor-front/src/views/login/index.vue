<script setup>
import { ref, reactive, resolveDirective } from "vue";
import { loginAPI } from "@/api/login.js";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const user = ref("蟒蟒2");
const pass = ref(null);
const input2 = ref(null);
const label = ref("账号密码");
const submitLogin = async () => {
  const username = user.value;
  const password = pass.value;
  try {
    const res = await loginAPI({ username, password });
    console.log(res);
    //把token存入本地
    window.localStorage.setItem("jwtToken", res.data.token);
    //跳转
    router.replace({ path: "/" });
    //把用户数据存入pinia
    userStore.SETUSER(res.data.data);
  } catch (err) {
    console.log("444");
    label.value.innerText = err.message;
    label.value.style.color = "red";
    input2.value.classList.add("error");
  }
};

const sixsix = () => {
  input2.value.classList.remove("error");
  label.value.innerText = "账号密码";
  label.value.style.color = "#693154";
};

const print = () => {
  console.log("ggg");
};
</script>

<template>
  <div class="login">
    <div class="login_logo" @click="submitLogin">
      <img src="@/assets/images/pen2.png" alt="" class="img" />
    </div>
    {{ pass }}
    <div class="login_group">
      <div class="login_group_one">
        <input
          v-model="user"
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
          ref="input2"
          v-model="pass"
          type="text"
          class="login__input"
          placeholder="账号密码"
          id="email"
          @input="sixsix"
          required
        />
        <label for="email" class="login__label" ref="label">账号密码</label>
      </div>
    </div>

    <div class="login_button" @click="submitLogin">
      <div class="login_button_title">登录</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  border-bottom: 3px solid rgb(231, 4, 0) !important;
}
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
      border-bottom: 3px solid rgb(254, 1, 1);
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
    z-index: 3;
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
