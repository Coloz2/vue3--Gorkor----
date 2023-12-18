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

onMounted(async () => {
  //1.获取userId
  const user = await import(/* @vite-ignore */ "@/stores/user.js");
  const { id } = user.GETUSERINFO();
  //2.获取信件列表
  //3.渲染信件列表
});
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
      >
        <swiper-slide>
          <letter-cover :gcolor="color"></letter-cover>
        </swiper-slide>
        <swiper-slide>
          <letter-cover :gcolor="color"></letter-cover>
        </swiper-slide>
        <swiper-slide>
          <letter-cover :gcolor="color"></letter-cover>
        </swiper-slide>
      </swiper>
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
  }
}
</style>
