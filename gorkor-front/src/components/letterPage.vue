<script setup>
import { ref, reactive, onMounted, watch, nextTick, watchEffect } from "vue";

import { useletterStore } from "@/stores/letterData.js";

const divBox = ref(null);
const divContent = ref(null);
const count = ref(null);
const loopLine = ref(null);
const divLine = ref(null);
const bg = ref(null);

//背景图片样式
const bgsize = ref({});
//
const ListStroe = useletterStore();
//
const print = () => {
  const content = divContent.value;
  const box = divBox.value;
  const line = divLine.value;
  //文本高度
  const cHeight = content.clientHeight;
  const cWidth = content.clientWidth;
  const boxHeight = box.clientHeight;
  // console.log("文本高度-----" + cHeight);
  // console.log("当前页高度----" + boxHeight);
  // console.log("当前宽度---" + cWidth);
  //计算页数px
  count.value = Math.ceil(cHeight / boxHeight);
  //计算下划线 每页19条
  loopLine.value = count.value * 18;
  console.log("页数---" + count.value);
  ListStroe.INCREMENT_COUNT(`${count.value}`);
  console.log(cWidth);
  // 根据页数分隔
  box.style.columnCount = count.value;
  // 每隔宽度
  box.style.columnWidth = `${cWidth}px`;
  //背景图片样式
  bgsize.value = {
    "background-size": `100vw 100%`,
    width: `${Number(cWidth) * Number(count.value) + 22 * count.value}px `,
  };
};

const props = defineProps({
  letterContent: String,
  imageUrl: {
    type: String,
  },
});

// const imageUrl = `http://localhost:3000/images/paper/rose-01.jpg`;
onMounted(() => {
  bg.value.style.background = `url(http://localhost:3000/images/paper/rose-01.jpg) repeat-x`;
  //在页面渲染完成后计算
  nextTick(() => {
    print();
  });
});

watch(
  () => props.imageUrl,
  (newImageUrl) => {
    const normalizedImageUrl = newImageUrl.replace(/\\/g, "/");
    bg.value.style.background = `url(http://localhost:3000/${normalizedImageUrl}) repeat-x`;
  }
);
</script>

<template>
  <div class="priview_body">
    <div class="priview_body_content" ref="divBox">
      {{ props.imageUrl }}
      <p ref="divContent" v-html="letterContent"></p>
    </div>

    <!-- 背景 -->
    <div class="priview_body_bg" ref="bg" :style="bgsize">
      <div class="priview_body_line" ref="divLine">
        <div
          class="priview_body_line_test"
          v-for="item in loopLine"
          :key="item"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.priview_body {
  height: calc(100vh - 5rem);
  // background-repeat: no-repeat; /* 防止图片平铺 */
  transform: translateY(5rem) translateY(0rem);
  font-size: 1.5rem;
  .img {
    left: 0;
    @include wh(100%, 100%);
  }

  &_content {
    line-height: 45px;
    font-size: 20px;
    padding-left: 2.2rem;
    height: 92.5%;
  }

  &_bg {
    top: 0;
    height: 100%;

    // background-size: cover;
    position: absolute;
    z-index: -10;
  }

  &_line {
    position: absolute;
    z-index: 3;
    top: 0;
    @include wh(100%, 92.5%);
    overflow: hidden;
    &_test {
      height: 45px;
      width: 100%;
      border-bottom: 2px saddlebrown solid;
    }
  }
}
</style>
