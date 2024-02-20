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

const setCount = (count) => {
  counts.value = count;
};



//
const letterwindow = ref(null);
import usePage from "@/hooks/usePage";
const { counts, curCts, handleDown } = usePage();


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
</script>

<template>
  <div class="priview" @touchstart="handleDown($event, letterwindow)">
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
