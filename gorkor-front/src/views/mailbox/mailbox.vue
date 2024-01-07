<script setup>
import { ref, reactive, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-coverflow";
import "swiper/scss/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
const modules = ref([EffectCoverflow, Pagination]);
//信件主题色
// const color = ref("#693154");
const color = "#693154";

//获取每个写信用户最最近的一封信
import { getLetterByPasser } from "@/api/sendAPI.js";
import numberToChinese from "@/utils/numberChange";
//轮播图信息 渲染列表
const passerLetter = ref([]);
// let id = "";
let cid = "";
onMounted(async () => {
  // 1.获取userId
  const user = await import(/* @vite-ignore */ "@/stores/user.js");
  const userStore = user.useUserStore();
  const { id } = userStore.GETUSERINFO();
  console.log(id);
  cid = id;
  //2.获取信件列表
  const { data } = await getLetterByPasser(id);
  console.log(data);
  //3.格式处理
  data.data.forEach((item) => {
    let cleanedData = item.map((item) => {
      let accepts = {};
      for (const key in item) {
        if (key.startsWith("accepts.")) {
          const cleanedKey = key.replace("accepts.", ""); // 去除前缀
          accepts[cleanedKey] = item[key];
        } else {
          accepts[key] = item[key];
        }
      }
      return accepts;
    });

    cleanedData.forEach((e) => {
      e.pNumber = numberToChinese(e.pNumber);
    });
    //4.赋值
    passerLetter.value.push(cleanedData[0]);
  });
  sid.value = passerLetter.value[0].id;
  console.log(sid.value);
});

const sid = ref(null);
function slideChange(swiper) {
  sid.value = passerLetter.value[swiper.activeIndex].id;
  console.log(sid.value);
}

import { useRouter } from "vue-router";
const router = useRouter();
function toSkeleton() {
  router.push({ name: "skeleton", params: { cid, sid: sid.value } });
}
</script>
<template>
  <div class="sbox">
    <nav-head class="sbox_head">
      <template #navtitle>
        <span>信件预览</span>
      </template>
    </nav-head>

    <div class="sbox_body">
      <swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :modules="modules"
        class="mySwiper"
        @slideChange="slideChange"
      >
        <swiper-slide v-for="(item, index) in passerLetter" :key="index">
          <letter-cover :gcolor="color" :content="item"></letter-cover>
        </swiper-slide>
      </swiper>

      <div class="sbox_body_skeleton" @click="toSkeleton"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 30rem;
  height: 50rem;
  ::v-deep .swiper-slide-shadow-left {
    background-image: none;
  }
  ::v-deep .swiper-slide-shadow-right {
    background-image: none;
  }

  // ::v-deep
  //   .swiper-slide.swiper-slide-visible.swiper-slide-prev {
  //   transform: translate3d(22px, 0px, 0px) scale(0.9);
  // }
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}

.sbox {
  &_head {
    img {
      @include wh(60%, 60%);
      margin: 0 auto;
    }
    span {
      flex: 6;
      font-size: 1.5rem;
      @include flex-box-set(center, center);
    }
  }

  &_body {
    background-color: $color-bg;
    width: 100%;
    height: calc(100vh - 5rem);
    transform: translateY(5rem);

    &_skeleton {
      width: 10rem;
      height: 10rem;
      background-color: rgb(235, 228, 20);
    }
  }
}
</style>
