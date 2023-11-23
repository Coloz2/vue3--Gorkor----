<script setup>
import { ref, reactive, onMounted } from "vue";
import navButton from "./component/navButton.vue";

// import { one } from "@/api/1.js";
// const getbanner = async () => {
//   const res = await one();
//   console.log(res);
// };

// onMounted(() => getbanner());
</script>

<template>
  <div class="home">
    <div class="home_head">
      <span class="home_head_span">过客</span>
    </div>
    <nav class="home_nav">
      <router-link to="/writeLetter">
        <navButton bgcColor="#ce9294">
          <template #bphoto>
            <img src="@/assets/images/home.png" class="bphoto" alt="" />
          </template>
          <template #title>
            <span class="home_nav_title">写信</span>
          </template>
        </navButton>
      </router-link>

      <navButton bgcColor="#8da4d0">
        <template #bphoto>
          <img src="@/assets/images/home.png" class="bphoto" alt="" />
        </template>
        <template #title>
          <span class="home_nav_title">油桶</span>
        </template>
      </navButton>

      <navButton bgcColor="#79aea6">
        <template #bphoto>
          <img src="@/assets/images/home.png" class="bphoto" alt="" />
        </template>
        <template #title>
          <span class="home_nav_title">信箱</span>
        </template>
      </navButton>

      <navButton bgcColor="#a39de3">
        <template #bphoto>
          <img src="@/assets/images/home.png" class="bphoto" alt="" />
        </template>
        <template #title>
          <span class="home_nav_title">邮票</span>
        </template>
      </navButton>
    </nav>
    <div class="home_brige"></div>
    <div class="home_feature">
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="@/assets/images/home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="/src/assets/images/home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="@\\assets\\images\\home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="@/assets/images/home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="@/assets/images/home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="@/assets/images/home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
      <div class="home_feature_fbutton">
        <div class="home_feature_fbutton_photo">
          <img src="@/assets/images/home.png" class="img" alt="" />
        </div>
        <span>树洞</span>
      </div>
    </div>
    <div class="home_list"></div>
  </div>
</template>

<style lang="scss" scoped>
.bphoto {
  @include wh(70%, 70%);
}
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
    padding: 0 1rem;
    height: 13rem;
    background-color: $color-white;
    @include flex-box();
    font-size: 1.5rem;
    span {
      display: block;
    }
  }

  &_brige {
    margin-top: 2rem;
    height: 9rem;
    background-color: $color-white;
  }

  &_feature {
    padding: 1rem 2rem;
    margin-top: 2rem;
    height: 18rem;
    background-color: $color-white;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    &_fbutton {
      @include flex-box2();
      height: 7rem;
      width: 5rem;
      &_photo {
        width: 100%;
        height: 5rem;
        .img {
          @include wh(100%, 100%);
        }
      }
    }
  }

  &_list {
    margin-top: 2rem;
    height: 12rem;
    background-color: $color-white;
  }
}
</style>
