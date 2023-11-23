<script setup>
import { ref, reactive } from "vue";
import NavHead from "@/components/NavHead.vue";

const inputValue = ref("");

const textarea1 = ref(null);
///方法
</script>

<template>
  <div class="letter">
    <nav-head class="letter_nav">
      <template #navtitle>
        <span>给TA写信</span>
      </template>
    </nav-head>
    <div class="letter_inputtext">
      <span class="letter_inputtext_statictext_top">亲爱的过客朋友</span>
      <!-- <textarea
        class="letter_inputtext_textarea"
        @input="adjustHeight"
        placeholder="第一封信总是很难&#10;不如聊聊你最近看过的一本书，&#10;或者一部印象深刻的电影，&#10;说不动TA也看过呢?&#10;&#10;温馨提示：别上来就把笔友当树洞，满满负能量、特别痛苦的信会让TA不知道怎么回~"
      ></textarea> -->

      <el-input
        v-model="textarea1"
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
    @include wh(100%, 95vh);
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
