<script setup>
import { ref, watchEffect, nextTick, getTransitionRawChildren } from "vue";
import NavHead from "@/components/navHead.vue";
import { useletterStore } from "@/stores/letterData.js";

const textarea1 = ref("");
const ListStroe = useletterStore();
const myTextarea = ref(null); // 创建 ref

const sendData = () => {
  // const letterList = textarea1.value.split(/\r?\n|\r/);
  console.log(textarea1.value.split(""));
  const hero = document.querySelector(".hero");
  console.log(hero.offsetWidth);
  console.log(hero.getBoundingClientRect());
  ListStroe.createLetter({ own: textarea1 });
};

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
    <nav-head class="letter_nav" :nRoute="'preView'">
      <template #navtitle>
        <span @click="sendData">给TA写信</span>
      </template>
      {{ textarea1 }}
    </nav-head>
    <div class="letter_inputtext">
      <span class="letter_inputtext_statictext_top">亲爱的过客朋友</span>
      <span class="hero">.</span>
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
  background-color: #ffffe0; /* 淡黄色 */
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
    span {
      flex: 6;
      font-size: 1.5rem;
      @include flex-box-set(center, center);
    }
  }

  &_inputtext {
    background-color: #ffffe0; /* 淡黄色 */
    width: 100%;
    min-height: 95vh;
    &_textarea {
      background-color: #ffffe0; /* 淡黄色 */
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
