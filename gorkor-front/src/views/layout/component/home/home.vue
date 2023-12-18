<script setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import navButton from "./component/navButton.vue";
import { getFeature } from "/gorkor/gorkor-front/src/api/homeRender.js";
import { getDraftsList } from "@/api/draftsAPI.js";
import App from "@/App.vue";
// import { useUserStore } from "@/stores/user";
// import { useletterStore } from "@/stores/letterData";

//RENDER APIT
const featureList = ref([]);
const route = useRouter();
const isFind = ref(false);
const getbanner = async () => {
  const { data } = await getFeature();
  featureList.value = data.navSource;
  console.log(featureList.value);
};

const imgurl = ref(null);
function textUrl() {
  const path = new URL("../../../../assets/images/home.png", import.meta.url);
  console.log(path);
  imgurl.value = path.pathname;
}

onMounted(async () => {
  //pinia获取数据 备用
  const user = await import(/* @vite-ignore */ "@/stores/letterData.js");
  const letterStore = letter.useletterStore();
  await letterStore.SETOBJ_BACK();

  textUrl();
});
// import("../../../../assets/images/home.png").then((res) => {
//   imageUrl.value = res.default;
// });

const junmpL = () => {
  route.push("/island");
};
//LIEFT CIRYLE
onMounted(() => getbanner());
</script>

<template>
  <div class="home">
    <div class="home_head">
      <span class="home_head_span">过客</span>
    </div>
    <nav class="home_nav">
      <router-link to="/write">
        <navButton bgcColor="#ce9294">
          <template #bphoto>
            <img :src="imgurl" class="bphoto" alt="" />
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

      <router-link to="/mailbox">
        <navButton bgcColor="#79aea6">
          <template #bphoto>
            <img src="@/assets/images/home.png" class="bphoto" alt="" />
          </template>
          <template #title>
            <span class="home_nav_title">信箱</span>
          </template>
        </navButton>
      </router-link>

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
      <div
        class="home_feature_fbutton"
        v-for="item of featureList"
        :key="item.id"
      >
        <div class="home_feature_fbutton_photo">
          <img
            @click="junmpL"
            :src="`http://localhost:3000/${item.imageUrl}`"
            class="img"
            alt=""
          />
        </div>
        <span>{{ item.title }}</span>
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
      line-height: 5rem;
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
    justify-items: center;
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
          @include wh(400%, 400%);
          transform: translateX(-37%) translateY(-38%);
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
