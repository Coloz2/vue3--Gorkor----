<script setup>
import { ref, onMounted, watch, watchEffect } from "vue";

const divBox = ref(null);
const divContent = ref(null);
const count = ref(null);
const loopLine = ref(null);
const divLine = ref(null);
const bg = ref(null);

//背景图片样式
const bgsize = ref({});
//
const print = () => {
  const content = divContent.value;
  const box = divBox.value;
  //文本高度
  const cHeight = content.clientHeight;
  const cWidth = content.clientWidth;
  const boxHeight = box.clientHeight;
  console.log("文本高度-----" + cHeight);
  console.log("当前页高度----" + boxHeight);
  console.log("当前宽度---" + cWidth);
  //计算页数px
  count.value = Math.ceil(cHeight / boxHeight);
  //计算下划线 每页19条
  loopLine.value = count.value * 18;
  console.log("页数---" + count.value);
  // ListStroe.INCREMENT_COUNT(`${count.value}`, "random");
  console.log(cWidth);
  // 根据页数分隔
  // box.style.columnCount = count.value;
  // console.log("分隔----" + box.style.columnCount);
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

const emit = defineEmits(["set"]);

// const imageUrl = `http://localhost:3000/images/paper/rose-01.jpg`;
// onMounted(() => {
//   //在页面渲染完成后计算
//   // const imG = ref(props.imageUrl);
//   // console.log("-1");
//   // console.log(imG.value);
//   // // 在这里更新背景样式或执行其他操作
//   // bg.value.style.background = `url(http://localhost:3000/${imG.value}) repeat-x`;
//   // emit("set", count.value);
//   console.log(divContent.value);
// });
let sizeChange = 0;
const divHeight = ref(0);
onMounted(() => {
  console.log("3");
  //默认背景
  bg.value.style.background = `url(http://localhost:3000/images/paper/rose-02.jpg) repeat-x`;

  //监听size事件
  const resizeObserver = new ResizeObserver((entries) => {
    sizeChange++;
    //渲染两次后  得到初始高度 关闭监听
    for (let entry of entries) {
      console.log(entry);
      divHeight.value = entry.target.clientHeight;
      if (sizeChange == 2) {
        resizeObserver.disconnect();
      }
    }
  });

  //监听<p>
  watchEffect(() => {
    if (divContent.value) {
      resizeObserver.observe(divContent.value);
    }
  });
});

//监听背景图片
watch(
  () => props.imageUrl,
  (newImageUrl) => {
    const normalizedImageUrl = newImageUrl.replace(/\\/g, "/");
    bg.value.style.background = `url(http://localhost:3000/${normalizedImageUrl}) repeat-x`;
  }
);

//监听P元素高度
const stopWatchingHeight = watch(
  () => divHeight.value,
  (newCheight) => {
    if (newCheight) {
      print();
      //发送事件
      emit("set", count.value);
      // 停止监听 divHeight.value
      stopWatchingHeight();
    }
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
