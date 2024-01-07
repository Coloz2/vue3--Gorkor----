<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import NavHead from "@/components/navHead.vue";
import { useletterStore } from "@/stores/letterData.js";
import { codDrafts } from "@/api/draftsAPI";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const textarea1 = ref("");
const ListStroe = useletterStore();
const myTextarea = ref(null); // 创建 ref
//首次打开从数据库请求数据 后面从Pinia请求
// const lControl = ref(false);
//创造或者更新
const props = defineProps({
  id: {
    type: String,
    default: "0",
  },
});

function save(value, id) {
  console.log("----------ID------------");
  console.log(id);
  const item = ListStroe.letterObj.find((item) => item.receiverId == id);
  console.log(item);
  console.log(id);
  console.log("-SAVE--SAVE----");
  if (item) {
    console.log("abcdefg");
    ListStroe.SETCONTENT_FRONT(value, id);
  } else {
    console.log("b");
    ListStroe.createLetter(value, props.id);
  }
}

import { useRouter } from "vue-router";
const router = useRouter();

const sendData = () => {
  router.push({ name: "priView", params: { id: props.id } });
  console.log(textarea1.value);
  save(textarea1.value, 0);
};

onMounted(async () => {
  console.log(props.id);
  // 注册全局事件 关闭保存
  window.onbeforeunload = async function () {
    save(textarea1.value, 0);
    //引入pinia中所有的letterObj数据
    const allLetter = ListStroe.GETALL();
    console.log(allLetter);
    const res = await codDrafts(allLetter);
    console.log(res);
  };

  //获取pinia中的数据 赋值给文本框
  const letter = await import(/* @vite-ignore */ "@/stores/letterData.js");
  const letterStore = letter.useletterStore();
  console.log(props.id);
  textarea1.value = letterStore.GETCONTENT(props.id);
  console.log(letterStore.GETCONTENT(props.id));
});

onBeforeUnmount(() => {
  //在当前页面关闭时保存数据
  save(textarea1.value, props.id);
});

// const checkOverflow = () => {
//   // 通过 .value 访问引用的元素
//   const aa = document.querySelector(".letter_inputtext_textarea");
//   console.log(aa);
// };

// watchEffect(() => {
//   checkOverflow();
// });

///方法
</script>

<template>
  <div class="letter">
    <nav-head class="letter_nav">
      <template #navtitle>
        <span>给TA写信</span>
      </template>

      <template #navright>
        <img
          src="@/assets/images/eyes.png"
          @click="sendData"
          class="img"
          alt=""
        />
      </template>
      {{ textarea1 }}
    </nav-head>
    <div class="letter_inputtext">
      <span class="letter_inputtext_statictext_top">亲爱的过客朋友</span>
      <el-input
        v-model="textarea1"
        ref="myTextarea"
        autosize
        type="textarea"
        class="letter_inputtext_textarea"
        placeholder="第一封信总是很难&#10;不如聊聊你最近看过的一本书，&#10;或者一部印象深刻的电影，&#10;说不动TA也看过呢?&#10;&#10;温馨提示：别上来就把笔友当树洞，满满负能量、特别痛苦的信会让TA不知道怎么回~"
      />
      <span class="letter_inputtext_statictext_bottom">小心我猹你</span>
      <span class="letter_inputtext_statictext_bottom">2023.11.23</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  background-color: #faf7ea; /* 淡黄色 */
  box-shadow: none;
  caret-color: red;
  resize: none;
  overflow: hidden;
}

:deep(.el-textarea__inner:focus) {
  outline: none;
  box-shadow: none;
}

.letter {
  &_nav {
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

  &_inputtext {
    background-color: #faf7ea; /* 淡黄色 */
    width: 100%;
    min-height: calc(100vh - 5rem);
    transform: translateY(5rem);
    &_textarea {
      background-color: #faf7ea; /* 淡黄色 */
      width: 100%;
      border: none; /* 无边框 */
      outline: none; /* 点击时不显示轮廓 */
      padding: 10px; /* 内填充 */
      font-size: 1.8rem;
    }

    &_textarea::placeholder {
      line-height: 3rem; /* 调整占位符的行高 */
    }

    &_statictext {
      &_line {
        position: absolute;
        z-index: 3;
        width: 100%;
        height: calc(100vh - 5rem);
        &_test {
          height: 45px;
          width: 100%;
          border-bottom: 2px saddlebrown solid;
        }
      }

      span {
        font-weight: bold;
      }
      &_top {
        display: flex;
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
