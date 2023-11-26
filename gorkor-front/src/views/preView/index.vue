<script setup>
import { ref, reactive, onMounted } from "vue";
import EventBus from "@/components/EventBus.js";
import NavHead from "@/components/navHead.vue";
import { useletterStore } from "@/stores/letterData.js";

const ListStroe = useletterStore();
const letterList = ref();
const test = ref("hhhhhhhhh<br>hggg<br>rgrg");
const replacedArray = ref();
onMounted(() => {
  console.log(ListStroe.letterObj);
  const values = Object.values(ListStroe.letterObj);
  letterList.value = values.flat();
  console.log(letterList.value);
  replacedArray.value = letterList.value.map((el) =>
    el.replace(/\n/g, "<br />")
  );

  console.log(letterList.value.length);
});

const print = () => {
  const a = document.querySelector(".priview_body_content");
  //窗体宽度
  const b = document.querySelector(".priview_body");
  console.log(b.clientWidth);
  document.querySelector.content;
  console.log(a);
  //页数
  const count = Math.ceil((a.clientHeight + 20) / 720);
  console.log("========================");
  console.log(count);
  b.style.width = b.clientWidth * count;
  b.style.columnCount = Number(count);
  console.log(count);
};
</script>

<template>
  <div class="priview">
    <nav-head class="priview_nav">
      <template #navtitle>
        <span @click="print">信件预览</span>
      </template>
    </nav-head>

    <div class="priview_body">
      <!-- <div
        class="priview_body_test"
        v-for="(item, index) in letterList"
        :key="index"
      >
        <span class="priview_body_statictext_top">{{ item }}</span>
      </div> -->
      <div class="priview_body_line">
        <div
          class="priview_body_line_test"
          v-for="item in 16"
          :key="item"
        ></div>
      </div>
      <div class="priview_body_content">
        <p v-html="replacedArray"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  &_nav {
    span {
      flex: 6;
      font-size: 1.5rem;
      @include flex-box-set(center, center);
    }
  }

  &_body {
    height: calc(100vh - 5rem);
    background: url("@/assets/images/fe.jpg");
    background-size: 10px 50px; /* 具体尺寸，填充整个 div */
    // background-repeat: no-repeat; /* 防止图片平铺 */
    transform: translateY(5rem);
    font-size: 1.5rem;
    .img {
      left: 0;
      @include wh(100%, 100%);
    }

    &_content {
      line-height: 45px;
      font-size: 20px;
      column-width: 370px;
      height: 80%;
      padding-left: 2.2rem;
    }
    &_line {
      position: absolute;
      z-index: 3;
      width: 100%;
      height: calc(100vh - 5rem);
      &_test {
        height: 45px;
        width: 95%;
        transform: translateX(3%);
        border-bottom: 2px saddlebrown solid;
      }
    }

    &_test {
      border-bottom: 1px saddlebrown solid;
      height: 6.25%;
      width: 95%;
      transform: translateX(5%);
    }

    &_statictext {
      span {
        font-weight: bold;
      }
      &_top {
        padding: 1rem;
        font-size: 1.8rem;
      }

      &_bottom {
        @include flex-box2;
        align-items: flex-end;
        padding: 0.5rem;
        font-size: 1.8rem;
      }
    }
  }
}
</style>
