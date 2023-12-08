<script setup>
import { ref, reactive, onMounted } from "vue";
// Import Swiper Vue.js components
// import Swiper core and required modules
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { getPapperBg } from "@/api/homeRender.js";
//swiper modules
const modules = ref([FreeMode, Pagination]);
defineProps({
  isShow: {
    type: Boolean,
    // 直接设置默认值为 true
  },
});

const emit = defineEmits(["update:isShow", "update:bgUrl"]);

const closeBox = () => {
  console.log("333");
  emit("update:isShow", true);
};

//获取图片资源
const papperList = ref([]);
const getpapper = async () => {
  const { data } = await getPapperBg();
  papperList.value = data.navSource;
  console.log(papperList.value);
};

const changeBg = (url) => {
  console.log(url);
  emit("update:bgUrl", url);
};

onMounted(() => getpapper());
</script>

<template>
  <div class="priview_body_upbox" :class="{ hidden: isShow }">
    <div class="priview_body_upbox_head">
      <span></span>
      <span class="title">信纸模板</span>
      <span @click="closeBox">收起</span>
    </div>

    <div class="priview_body_upbox_body">
      <swiper
        :slidesPerView="3"
        :spaceBetween="30"
        :freeMode="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="item in papperList" :key="item">
          <img
            :src="`http://localhost:3000/${item.imageUrl}`"
            class="img"
            @click="changeBg(item.imageUrl)"
          />
        </swiper-slide>
        <swiper-slide class="addImg"> </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.priview_body_upbox {
  @include wh(100vw, 22rem);
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: white;

  &_head {
    color: $click-color;
    height: 5rem;
    padding: 0 2rem;
    @include flex-box();
    .title {
      font-size: 1.8rem;
    }
  }

  &_body {
    padding: 0 2rem;
    height: 15rem;
    .swiper-slide {
      width: 11em;
      height: 14rem;
      .img {
        @include wh(100%, 100%);
      }
    }
    .addImg {
      background-color: orchid;
      width: 11em;
      height: 14rem;
    }
  }
}
</style>
