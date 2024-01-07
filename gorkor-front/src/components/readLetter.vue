<script setup>
import { ref, onMounted, nextTick, onBeforeMount, onBeforeUnmount } from "vue";
import letterPage from "@/components/letterPage.vue";
import NavHead from "@/components/navHead.vue";
import { getNewLetter } from "@/api/sendAPI.js";
//最终数据
const replacedArray = ref(null);
//信件数据
const letterData = ref(null);
//props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
//获取receiverId
const imgUrl = ref(null);

//获取内容
const getLetterContent = () => {
  //处理换行格式
  replacedArray.value = letterData.value.content.replace(/\n/g, "<br/>");
  replacedArray.value = `亲爱的过客朋友<br />${replacedArray.value}<br /><div class="sb"><p>小心我猹你</p><p>11.28</p><div>`;
};

onMounted(async () => {
  const { id: senderId, time: sendLoginAt } = props;
  console.log("---0");
  const { data } = await getNewLetter(senderId, sendLoginAt);
  console.log(data);
  letterData.value = data.data;
  imgUrl.value = letterData.value.bgUrl;
  console.log("---------1");
  console.log(imgUrl.value);
  getLetterContent();
});

//页数
const counts = ref(0);

const setCount = (count) => {
  counts.value = count;
};
//当前页数
const curCts = ref(1);
//移动距离
let distance = 0;
//吸附百分比
let moveVw = 0;
// 视口宽度
let startX = 0;
//
const letterwindow = ref(null);
const handleup = () => {
  if (counts.value == 1) return;

  if (
    (curCts.value == 1 && distance < 0) ||
    (curCts.value == counts.value && distance > 0)
  ) {
    return;
  }

  const bodyWidth = letterwindow.value.clientWidth;
  const riseArea = Math.abs(distance) / bodyWidth;
  console.log(moveVw);
  console.log("移动距离" + distance);
  console.log(riseArea);
  //鼠标滑动距离大于视口宽度一半  向右滑
  if (riseArea > 0.5 && moveVw >= 0) {
    if (distance > 0) {
      console.log("大于50 右移");
      console.log(distance);
      moveVw += 100;
      curCts.value += 1;
      letterwindow.value.style.transform = `translateX(-${moveVw}vw)`;
    } else {
      console.log("大于50 左移");
      console.log(distance);
      curCts.value -= 1;
      moveVw -= 100;
      letterwindow.value.style.transform = `translateX(-${moveVw}vw)`;
    }
  } else {
    //移动距离小于0.5  在第一页
    letterwindow.value.style.transform = `translateX(-${moveVw}vw)`;
    // }
    console.log(distance);
  }
  distance = 0;
};

const handleDown = (event) => {
  if (counts.value == 1) return;
  // console.log(e);
  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchend", handleup);

  startX = event.touches[0].clientX;
  console.log("起始距离" + startX);
};

const handleMove = (event) => {
  if (counts.value == 1) return;
  console.log(event);
  let moveX = event.touches[0].clientX;
  distance = startX - moveX;
  console.log("移动距离" + moveX);
  console.log(distance);
  // console.log(distance);
  //在第一页不能左移 第二页不能右移
  if (
    (curCts.value == 1 && distance < 0) ||
    (curCts.value == counts.value && distance > 0)
  ) {
    return;
  }

  letterwindow.value.style.transform = `translateX(calc(-${moveVw}vw - ${distance}px))`;
};

const isshow = ref(true);
function open() {
  isshow.value = false;
}

function down() {
  isshow.value = true;
}

//免邮回复按钮
import { useRouter } from "vue-router";
const router = useRouter();
function recover() {
  router.push({ name: "write", params: { id: props.id } });
}

onBeforeUnmount(() => {
  document.removeEventListener("touchmove", handleMove);
  document.removeEventListener("touchend", handleup);
});
</script>

<template>
  <div class="priview" @touchstart="handleDown">
    <div class="overlay" :class="{ show: isshow }">
      <div class="overlay_popup" :class="{ showUp: !isshow }">
        <div class="overlay_popup_up">
          <div class="overlay_popup_up_ctx">
            <span @click="recover">免邮回复</span>
          </div>
          <div class="overlay_popup_up_ctx">
            <span>免邮回复</span>
          </div>
          <div class="overlay_popup_up_ctx">
            <span>免邮回复</span>
          </div>
        </div>

        <div class="overlay_popup_down" @click="down">
          <span>取消</span>
        </div>
      </div>
    </div>
    <nav-head class="priview_nav" :nRoute="'send'">
      <template #navtitle>
        <span>查看信件</span>
      </template>

      <template #navright>
        <img src="@/assets/images/lettercover.png" @click="open" class="img" />
      </template>
    </nav-head>

    <div ref="letterwindow">
      <letter-page
        :letter-content="replacedArray"
        :image-url="imgUrl"
        @set="setCount"
      ></letter-page>
    </div>

    <div class="priview_count">
      <p>{{ curCts }}/{{ counts }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show {
  display: none;
}

.showUp {
  transform: translateY(10vh);
}
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 背景颜色设置透明度为 0.5 */
  z-index: 1000; /* 确保遮罩位于其他元素之上，可以根据需要调整层级 */

  &_popup {
    top: 50rem;
    position: absolute;
    width: 95vw;
    transition: transform 0.3s ease; /* 添加过渡效果 */
    border-radius: 10px;
    margin: 0 1rem 3rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &_up {
      background-color: #fff;
      border-radius: 10px;
      width: 100%;
      &_ctx {
        font-size: 2rem;
        line-height: 5rem;

        @include flex-box-set(center, center);
      }
      &_ctx:not(:last-child) {
        border-bottom: 1px solid #eeecec; // 添加除最后一个元素外的所有元素的下划线
      }
    }

    &_down {
      background-color: #fff;
      transform: translateY(4rem);
      width: 100%;
      border-radius: 10px;
      margin: 0 1rem 2rem 1rem;
      height: 5rem;
      background-color: #fff;
      @include flex-box-set(center, center);
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
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
  &_count {
    position: fixed;
    margin-top: 1.6rem;
    font-size: 2.2rem;
    z-index: 10;
  }
}
</style>
