<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import CompareResult from "@/components/CompareResult.vue";

const loading = ref(false);
const noMore = computed(() => offset.value >= 30);
const disabled = computed(() => loading.value || noMore.value);
//每日问题列表
const questionList = ref([]);
//偏移量
/////////
import { getQues } from "@/api/questionAPI.js";
const offset = ref(1);
const limit = ref(5);

async function getList() {
  const { data } = await getQues(offset.value, limit);
  questionList.value.push(...data.data);
}

const load = async () => {
  loading.value = true;
  await getList();
  setTimeout(async () => {
    await getList();
    console.log(questionList.value);
    offset.value += 5;
    loading.value = false;
  }, 2000);
};
const todayQus = ref({});
onMounted(async () => {
  console.log("father");
  const { data } = await getQues(0, 1);
  todayQus.value = data.data[0];
});

const color = ref(null);
function updateColor(msg) {
  console.log(msg);
}

const show = ref(true);
function agree() {
  show.value = false;
}

import { useRouter } from "vue-router";
const router = useRouter();

//路由跳转
function goEveryday(id) {
  router.push({
    name: "everyday",
    params: { id },
  });
}
</script>

<template>
  <nav-head>
    <template #navtitle>
      <span @click="print">每日问题</span>
    </template>
  </nav-head>
  <div class="box">
    <div class="box_today" v-if="show">
      <div class="box_today_ti">
        <span>{{ todayQus.text }}</span>
      </div>

      <div class="box_today_buttons">
        <button class="box_today_buttons_left" @click="agree">是</button>
        <button class="box_today_buttons_right" @click="disAgree">否</button>
      </div>
    </div>

    <li class="box_list" @click="goEveryday(1)" v-else>
      <div class="box_list_title">
        <div class="box_list_title_left"></div>
        <div class="box_list_title_right">
          <span>143条评论</span><span>></span>
        </div>
      </div>
      <div class="box_list_ques">
        <p>你多大呐</p>
      </div>
      <div class="box_list_result">
        <CompareResult
          @submitAgree="updateColor"
          :yes="50"
          :no="30"
          :height="4"
        ></CompareResult>
      </div>
    </li>

    <p style="width: fit-content">- 往日问题 -</p>
    <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <li
        v-for="(item, index) in questionList"
        :key="index"
        class="box_list"
        @click="goEveryday(item.id)"
      >
        <div class="box_list_title">
          <div class="box_list_title_left"></div>
          <div class="box_list_title_right">
            <span>143条评论</span><span>></span>
          </div>
        </div>
        <div class="box_list_ques">
          <p>{{ item.text }}</p>
        </div>
        <div class="box_list_result">
          <CompareResult
            @submitAgree="updateColor"
            :yes="item.agree"
            :no="item.disagree"
            :height="4"
          ></CompareResult>
        </div>
      </li>
    </ul>
    <p
      v-if="loading"
      style="margin: 0 auto 2rem; width: 10rem; font-size: 2.2rem"
    >
      正在加载
    </p>
    <p
      v-if="noMore"
      style="margin: 0 auto 2rem; width: 10rem; font-size: 2.2rem"
    >
      No more
    </p>

    <!-- <CompareResult class="box_list"></CompareResult>
    <CompareResult class="box_list"></CompareResult>
    <CompareResult class="box_list"></CompareResult>
    <CompareResult class="box_list"></CompareResult> -->
  </div>
</template>

<style lang="scss" scoped>
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
.box {
  background-color: #f6f6f4;
  ul {
    background-color: #f6f6f4;
  }
  li {
    background-color: rgb(254, 254, 254);
  }
  p {
    margin: 0 auto;
    color: grey;
    padding: 1rem 0 1rem 0;
    font-size: 1.5rem;
  }

  height: calc(100vh - 5rem);
  transform: translateY(5rem);
  &_list:not(:first-child) {
    margin-top: 2rem;
  }

  &_list {
    &_title {
      width: 100%;
      height: 5rem;

      @include flex-box-set(space-between, center);
      &_left {
        @include wh(5rem, 5rem);
        background-color: red;
      }

      &_right {
        @include flex-box-set(center, center);
        font-size: 1.5rem;
        color: #ccccca;
        span {
          padding: 5px;
        }
      }
    }
    &_ques {
      text-align: center;
      p {
        font-size: 2rem;
        color: black;
      }
    }

    &_result {
      height: 10rem;
      @include flex-box-set(center, center);
    }
  }

  &_today {
    width: 100vw;
    margin: 0 auto;
    height: 25rem;
    background-color: #fff;
    &_ti {
      width: 100%;
      padding: 5rem 0 5rem 0;
      @include flex-box-set(center, center);
      span {
        color: rgb(0, 0, 0);
        font-size: 2.5rem;
      }
    }

    &_buttons {
      width: 90%;
      margin: 0 auto;
      @include flex-box-set(space-around, center);
      button {
        border: none;
        padding: 1.5rem 7rem 1.5rem 7rem;
        border-radius: 5px;
        color: white;
        font-size: 1.8rem;
      }

      &_left {
        background-color: #8fd7db;
      }

      &_right {
        background-color: #ffb3a8;
      }
      height: 10rem;
    }
  }
}
</style>
