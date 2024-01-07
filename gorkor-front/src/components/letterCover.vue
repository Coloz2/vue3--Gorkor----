<script setup>
import { ref, reactive, onMounted } from "vue";

const props = defineProps({
  gcolor: {
    type: String,
  },
  content: {
    type: Object,
  },
});

const pNumber = ref(props.content.pNumber);
const sendword = ref(props.content.sendword);
const id = ref(props.content.id);
const time = ref(props.content.sendLoginAt);
onMounted(() => {
  //定义颜色
  document.documentElement.style.setProperty("--color-cover", props.gcolor);
  console.log(pNumber, sendword);
});

import { useRouter } from "vue-router";
const router = useRouter();
function toRead() {
  if (id.value == 0) return;
  router.push({ name: "read", params: { id: id.value, time: time.value } });
}
</script>

<template>
  <div class="box" @click="toRead">
    <div class="box_type">
      <div class="box_type_des">新人信件</div>
    </div>
    <div class="box_title">
      <div class="box_title_des" v-if="id !== 0">过客 · {{ pNumber }}</div>
      <div class="box_title_des" v-else>陌生过客</div>
      <div class="box_title_pen">
        <img src="@/assets/images/pen.png" class="img" alt="" />
      </div>
    </div>

    <div class="box_stamp">
      <img src="@/assets/images/rose-02.jpg" class="img" alt="" />
    </div>

    <div class="box_sendWord">
      <div class="box_sendWord_des">{{ sendword }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  background-color: rgb(250, 250, 250);
  height: 48.5rem;
  width: 30rem;
  box-shadow: 0px 2px 4px 5px rgba(106, 105, 105, 0.5);

  &_stamp {
    @include wh(7rem, 9rem);
    background-color: rgb(166, 147, 147);
    position: absolute;
    outline: 2px solid var(--color-cover);
    outline-offset: 3px;
    top: 2rem;
    left: 2rem;
    .img {
      width: 100%;
      height: 100%;
    }
  }

  &_type {
    font-size: 1.6rem;
    @include wh(3rem, 13rem);
    color: white;
    background-color: var(--color-cover);
    @include flex-box-set(center, center);
    margin-left: 85%;
    &_des {
      width: 1.6rem;
      margin: 0 auto;
    }
  }

  &_title {
    @include pCenter(-50%, -58%);
    height: 28rem;
    width: 4rem;
    border: 2px var(--color-cover) solid;
    font-size: 2.1rem;
    padding: 1.3rem 4px;
    flex-direction: column;
    @include flex-box-set(space-between, center);

    &_des {
      width: 2.1rem;
    }
    &_pen {
      width: 2.1rem;

      img {
        @include wh(100%, 100%);
      }
    }
  }

  &_sendWord {
    @include wh(25rem, 5rem);
    margin: 28rem auto 0;
    font-size: 2.2rem;
    color: var(--color-cover);
    @include flex-box-set(center, center);
  }
}
</style>
