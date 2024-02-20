<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import navButton from "./component/navButton.vue";
import { getFeature } from "/gorkor/gorkor-front/src/api/homeRender.js";

//RENDER APIT
const featureList = ref([]);
const route = useRouter();
const isFind = ref(false);
const getbanner = async () => {
  const { data } = await getFeature();
  featureList.value = data.navSource;
  console.log(featureList.value);
};

const imgurl = ref(null);
function textUrl() {
  const path = new URL("../../../../assets/images/home.png", import.meta.url);
  console.log(path);
  imgurl.value = path.pathname;
}

onMounted(async () => {
  //pinia获取数据 备用
  const letter = await import(/* @vite-ignore */ "@/stores/letterData.js");
  const letterStore = letter.useletterStore();
  await letterStore.SETOBJ_BACK();
  textUrl();
});

const junmpL = () => {
  route.push("/island");
};

//LIEFT CIRYLE
onMounted(() => getbanner());

//查询是否有未读信件
const unread = ref(false);
const unreadCtx = ref(null);
const color = "#693154";
const scroll = ref(true);
import { getAnyUnread, updateReadStatus } from "@/api/sendAPI.js";
import numberToChinese from "@/utils/numberChange";

onMounted(async () => {
  //pinia获取数据 备用
  const user = await import(/* @vite-ignore */ "@/stores/user.js");
  const userStore = user.useUserStore();
  const { id } = userStore.GETUSERINFO();

  if (id) {
    const { data } = await getAnyUnread(id);
    console.log(data);
    if (data.data.length !== 0) {
      data.data.forEach((e) => {
        e.pNumber = numberToChinese(e.pNumber);
      });
      unreadCtx.value = data.data[0];
      unread.value = true;
      //每日问题滚动区禁用
      scroll.value = false;
    }
  }
});

const router = useRouter();
import { useUserStore } from "@/stores/user.js";
async function toRead() {
  console.log(unreadCtx.value);
  //将信件设置为已读
  const userStore = useUserStore();
  const { id: receiverId } = userStore.GETUSERINFO();
  console.log(receiverId);
  const res = await updateReadStatus({ receiverId });
  console.log(res);
  //跳转到阅读界面
  const { id, sendLoginAt: time } = unreadCtx.value;
  console.log(id);
  router.push({ name: "read", params: { id, time } });
}

//移动距离r
let distance = 0;
//吸附百分比
let moveVw = 0;
// 视口宽度
let startY = 0;
//

const letterwindow = ref(null);
const handleup = () => {
  console.log(document);
  const bodyWidth = letterwindow.value.clientHeight;
  const riseArea = Math.abs(distance) / bodyWidth;
  console.log(moveVw);
  console.log("移动距离" + distance);
  console.log(riseArea);
  //鼠标滑动距离大于视口宽度一半  向右滑
  if (riseArea > 0.5 && moveVw >= 0) {
    console.log("大于50 右移");
    console.log(distance);
    moveVw += 100;
    letterwindow.value.style.transform = `translateY(-${moveVw}vh)`;
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleup);
    //每日问题滚动允许
    scroll.value = true;
  } else {
    moveVw = 0;
    letterwindow.value.style.transform = `translateY(-${moveVw}vh)`;
  }
  distance = 0;
};

const handleDown = (event) => {
  console.log(document.getElementsByClassName("home_unread")[0]);
  console.log(letterwindow.value);
  // console.log(document);
  // console.log(e);
  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchend", handleup);
  startY = event.touches[0].clientY;
  console.log("起始距离" + startY);
};

const handleMove = (event) => {
  let moveX = event.touches[0].clientY;
  distance = startY - moveX;
  // console.log("移动距离" + distance);
  // console.log(distance);
  // console.log(distance);
  //在第一页不能左移 第二页不能右移
  letterwindow.value.style.transform = `translateY(calc(-${moveVw}vh - ${distance}px))`;
};
/////////
import { getQues } from "@/api/questionAPI.js";

//无线下拉变量

const loading = ref(false);
const noMore = computed(() => offset.value >= 30);
const disabled = computed(() => loading.value || noMore.value);
//每日问题列表
const questionList = ref([]);
//偏移量
const offset = ref(0);
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
</script>

<template>
  <div class="home">
    <div
      v-if="unread"
      class="home_unread"
      @touchstart="handleDown"
      ref="letterwindow"
    >
      <div class="home_unread_cover">
        <letter-cover :gcolor="color" :content="unreadCtx"></letter-cover>
      </div>
      <div class="home_unread_select">
        <button class="home_unread_select_true" @click="toRead">✔</button>
        <button class="home_unread_select_false" @click="">❌</button>
      </div>
    </div>
    <nav-head class="priview_nav" :nRoute="'send'">
      <template #navtitle>
        <span @click="print">过客</span>
      </template>
    </nav-head>

    <div class="home_total">
      <nav class="home_nav">
        <router-link :to="{ path: `/write/${0}` }">
          <navButton bgcColor="#ce9294">
            <template #bphoto>
              <img :src="imgurl" class="bphoto" alt="" />
            </template>
            <template #title>
              <span class="home_nav_title">写信</span>
            </template>
          </navButton>
        </router-link>

        <navButton bgcColor="#8da4d0">
          <template #bphoto>
            <img src="@/assets/images/home.png" class="bphoto" alt="" />
          </template>
          <template #title>
            <span class="home_nav_title">油桶</span>
          </template>
        </navButton>

        <router-link to="/mailbox">
          <navButton bgcColor="#79aea6">
            <template #bphoto>
              <img src="@/assets/images/home.png" class="bphoto" alt="" />
            </template>
            <template #title>
              <span class="home_nav_title">信箱</span>
            </template>
          </navButton>
        </router-link>

        <navButton bgcColor="#a39de3">
          <template #bphoto>
            <img src="@/assets/images/home.png" class="bphoto" alt="" />
          </template>
          <template #title>
            <span class="home_nav_title">邮票</span>
          </template>
        </navButton>
      </nav>
      <div class="home_brige"></div>
      <div class="home_feature">
        <div
          class="home_feature_fbutton"
          v-for="item of featureList"
          :key="item.id"
        >
          <div class="home_feature_fbutton_photo">
            <img
              @click="junmpL"
              :src="`http://localhost:3000/${item.imageUrl}`"
              class="img"
              alt=""
            />
          </div>
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="home_roll" :class="scroll ? 'show' : 'hide'">
        <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
          <router-link to="/question">
            <li
              v-for="(item, index) in questionList"
              :key="index"
              class="home_roll_list"
            >
              <div class="home_roll_list_head">
                <div class="home_roll_list_head_left">
                  <img src="../../../../assets/images/问题记录.png" alt="" />
                </div>
                <div class="home_roll_list_head_right">
                  <p>每日问题</p>
                  <p>2024-01-07 15:33</p>
                </div>
              </div>
              <div class="home_roll_list_body">
                <span>你相信星座的说法吗</span>
              </div>
            </li>
          </router-link>
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
      </div>
      <!-- <div class="home_list"></div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hide {
  max-height: 30rem;
  overflow: hidden;
}

.show {
  overflow: auto;
}
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
.bphoto {
  @include wh(70%, 70%);
}
.home {
  min-height: 93vh;
  background-color: #efefef;
  &_unread {
    position: absolute;
    z-index: 10;
    width: 100%;
    bottom: 0;
    background: linear-gradient(#e66465, #9198e5);
    height: 100vh;
    &_cover {
      @include pCenter(-50%, -70%);
    }

    &_select {
      @include flex-box-set(space-around, center);
      transform: translateY(75vh);
      padding: 0 8rem 0 8rem;
      &_true {
        @include wh(7rem, 7rem);
        font-size: 3rem;
        box-shadow: 0px 2px 4px 5px rgba(106, 105, 105, 0.5);
        // padding: 3rem;
        border: none;
        border-radius: 50%;
      }

      &_false {
        @include wh(7rem, 7rem);
        font-size: 3rem;
        box-shadow: 0px 2px 4px 5px rgba(106, 105, 105, 0.5);
        border: none;
        border-radius: 50%;
      }
    }
  }

  &_total {
    transform: translateY(53px);
  }
  &_head {
    display: flex;
    justify-content: center;
    &_span {
      color: #5d5d5d;
      font-size: 1.8rem;
      line-height: 5rem;
    }
    background-color: $color-white;
    height: 5rem;
    border-bottom: 2px solid #f7f7f7;
  }

  &_nav {
    padding: 0 1rem;
    height: 13rem;
    background-color: $color-white;
    @include flex-box();
    font-size: 1.5rem;
    span {
      display: block;
    }
  }

  &_brige {
    margin-top: 2rem;
    height: 9rem;
    background-color: $color-white;
  }

  &_feature {
    margin-bottom: 8rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    height: 20rem;
    background-color: $color-white;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    overflow: hidden;
    &_fbutton {
      font-size: 1.3rem;
      @include flex-box2();
      height: 8rem;
      width: 6rem;
      &_photo {
        width: 100%;
        height: 5rem;

        .img {
          @include wh(400%, 450%);
          transform: translateX(-37%) translateY(-38%);
        }
      }
    }
  }

  &_roll {
    overflow: hidden;
    z-index: 3;
    margin-top: 2rem;
    transform: translateY(-5rem);
    min-height: 20rem;
    // background-color: $color-white;
    &_list {
      height: 13rem;
      margin-bottom: 3rem;
      background-color: #ffffff;
      &_head {
        @include flex-box-set(start, center);
        font-size: 1.8rem;

        color: rgb(190, 190, 190);
        height: 8rem;
        &_left {
          height: 7rem;
          width: 7rem;
          @include flex-box-set(center, center);
          img {
            @include wh(60%, 60%);
          }
        }
      }

      &_body {
        @include flex-box-set(start, center);
        font-size: 2rem;
        padding-left: 10%;
      }
    }
  }
}
</style>
