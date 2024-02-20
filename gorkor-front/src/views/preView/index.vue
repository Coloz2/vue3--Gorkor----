<script setup>
import { ref, reactive, onMounted, computed, onBeforeUnmount } from "vue";
import letterPage from "@/components/letterPage.vue";
import popupBox from "./components/popupBox.vue";
import NavHead from "@/components/navHead.vue";
import { useletterStore } from "@/stores/letterData.js";
const ListStroe = useletterStore();
//最终数据
const replacedArray = ref(null);
//弹出层控制
const show = ref(true);

//props
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
});
//获取receiverId
const recId = computed(() => props.id);
//获取内容
const getLetterContent = () => {
  //根据ID 找到对应的信件内
  const letter = ListStroe.letterObj.find(
    (item) => item.receiverId == recId.value
  );
  //处理换行格式
  replacedArray.value = letter.content.replace(/\n/g, "<br/>");
  replacedArray.value = `亲爱的过客朋友<br />${replacedArray.value}<br /><div class="sb"><p>小心我猹你</p><p>11.28</p><div>`;
};

const showBox = () => {
  show.value = false;
};

onMounted(() => {
  console.log(props.id);
  getLetterContent();
});

const letterwindow = ref(null);

import usePage from "@/hooks/usePage";
const { counts, curCts, handleDown } = usePage();

const imgUrl = ref("images/paper/rose-01.jpg");

import { useRouter } from "vue-router";
const router = useRouter();

import { useSendStore } from "@/stores/send";
const sendStore = useSendStore();

const send = (obj) => {
  sendStore.SETSEND(obj);
};

const senddata2 = () => {
  //找到对应信件
  const letter = ListStroe.letterObj.find(
    (item) => item.receiverId == recId.value
  );
  //最终发送的信件格式
  const finalObj = {
    ...letter,
    bgUrl: imgUrl.value,
    leCount: counts.value,
    isRead: true,
  };

  //将最终信件格式传入pinia
  send(finalObj);
  //跳转路由
  router.push({ name: "send" });
  // const finalObj = {};
};

const setCount = (count) => {
  counts.value = count;
};
</script>

<template>
  <div class="priview" @touchstart="handleDown($event, letterwindow)">
    <nav-head class="priview_nav" :nRoute="'send'">
      <template #navtitle>
        <span @click="print">信件预览</span>
      </template>

      <template #navright>
        <img
          src="@/assets/images/lettercover.png"
          @click="senddata2"
          class="img"
          alt=""
        />
      </template>
    </nav-head>
    <div ref="letterwindow">
      <letter-page
        :letter-content="replacedArray"
        :image-url="imgUrl"
        @set="setCount"
      ></letter-page>
    </div>

    <!-- 弹出层 -->
    <div class="priview_popup" @click="showBox">
      <span>信纸模板</span>
      {{ id }}
      <span class="priview_popup_count">{{ curCts }}/{{ counts }}</span>
    </div>

    <popup-box v-model:isShow="show" v-model:bgUrl="imgUrl"></popup-box>
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
  width: 300px;
  height: 388px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.el-textarea__inner) {
  background-color: transparent; //背景设置透明
  box-shadow: none;
  caret-color: red;
  resize: none;
  font-size: 20px;
  overflow: hidden;
  line-height: 45px;
}

:deep(.el-textarea__inner:focus) {
  outline: none;
  box-shadow: none;
}

.priview {
  width: 100%;
  position: fixed;
  &_nav {
    .img {
      width: 50%;
    }
  }

  &_popup {
    @include wh(100vw, 6rem);
    background-color: $color-white;
    opacity: 0.85;
    position: fixed;
    bottom: 0;
    color: $click-color;
    @include flex-box-set(center, center);
    font-size: 1.8rem;
    z-index: 9;
    span {
      margin-left: auto;
    }
    &_count {
      margin-left: auto;
    }
  }
}
</style>
