<script setup>
import { ref, reactive } from "vue";
import CompareResult from "@/components/CompareResult.vue";
import replyPerson from "./component/replyPerson.vue";
import { onMounted } from "vue";
import usePopup from "@/hooks/usePopup";
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
});

//问题信息
const qusList = ref([]);
const disList = ref([]);
import { getQuesById, getDisById } from "@/api/questionAPI";

async function getData() {
  const { data } = await getDisById(props.id);
  disList.value = data.data;
  console.log(disList.value);
}

onMounted(async () => {
  await getData();
  const { data } = await getQuesById(props.id);
  qusList.value = data.data[0];
  console.log(qusList.value);
});

function updateColor(msg) {
  console.log(msg);
}

const textarea1 = ref(null);

//从hooks导入评论相关方法
const { openR, clicked, submitTo } = usePopup();

async function handleChange() {
  if (clicked.value == false) {
    openR();
  } else {
    await submitTo(props.id, textarea1.value);
    getData();
  }
}
</script>

<template>
  <nav-head>
    <template #navtitle>
      <span @click="print">每日问题</span>
    </template>
  </nav-head>
  <div class="box">
    <div class="box_question">
      <div class="box_question_title">
        <p>{{ qusList.text }}</p>
      </div>
      <div class="box_question_compare" v-if="qusList.length !== 0">
        <CompareResult
          @submitAgree="updateColor"
          :height="6"
          :Rwidth="90"
          :yes="qusList.agree"
          :no="qusList.disagree"
        ></CompareResult>
      </div>
    </div>
    <div class="box_bridge">
      <p>共有101条回复</p>
    </div>
    <div class="box_reply">
      <replyPerson v-for="item in disList" :ctx="item"></replyPerson>
      <p style="padding: 2rem; font-size: 1.5rem">暂时没有更多了哦</p>
    </div>
  </div>
  <div class="bottom" :class="clicked ? 'clicked' : ''">
    <p
      class="bottom_button"
      :class="clicked ? 'movedown' : ' '"
      @click="handleChange"
    >
      添加回复
    </p>

    <el-input
      v-model="textarea1"
      ref="myTextarea"
      type="textarea"
      show-word-limit
      :autosize="{ minRows: 5, maxRows: 10 }"
      class="bottom_textarea"
      maxlength="300"
      placeholder="不知道怎么回~"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  background-color: #faf7ea; /* 淡黄色 */
  box-shadow: none;
  height: 10rem;
  resize: none;
  overflow: hidden;
}

p {
  width: fit-content;
  margin: 0 auto;
}
.box {
  background-color: #f6f6f4;
  min-height: calc(100vh - 5rem);
  transform: translateY(5rem);

  &_question {
    background-color: #fff;
    height: 20rem;
    &_title {
      padding: 1rem 0;
      @include flex-box-set(center, center);
      p {
        font-size: 2rem;
      }
    }

    &_compare {
      height: 15rem;
      @include flex-box-set(center, center);
    }
  }

  &_bridge {
    height: 3rem;
    margin-bottom: 5rem;
    width: 100%;
    padding: 0 1rem 0 1rem;
    @include flex-box-set(space-between, center);
    p {
      font-size: 1.5rem;
      color: grey;
    }
  }

  &_reply {
    width: 100%;
    transform: translateY(-5rem);
  }
}

.bottom {
  padding: 1rem;
  width: 100%;
  height: 60rem;
  background-color: #ffffff;
  bottom: 0;
  z-index: 10;
  position: fixed;
  border-top: 1px solid #dad6d8;
  transform: translateY(55rem);
  transition: all 1s;
  p {
    width: 10rem;
    height: 3rem;
    background-color: #693154;
    color: #fff;
    border-radius: 1rem;
    @include flex-box-set(center, center);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

.clicked {
  transform: translateY(0rem);
}

.movedown {
  transform: translate(0, 20rem);
}
</style>
