<script setup>
import { ref, reactive, onMounted } from "vue";
const props = defineProps({
  ctx: Object,
});

const disList = ref({});
onMounted(() => {
  disList.value = props.ctx;
  console.log(disList.value);
});
</script>

<template>
  <div class="recover">
    <div class="recover_title">
      <div class="recover_title_left">
        <div class="recover_title_left_avatar"></div>
        <div class="recover_title_left_ctx">
          <div class="recover_title_left_ctx_top">
            <p>过客ID {{ disList.passer_id }}</p>
            <p :style="{ color: '#c9c9c9' }">51 👍</p>
          </div>

          <span>{{ disList.id }}楼 {{ disList.recoverAt }}</span>
        </div>
      </div>
    </div>

    <div class="recover_talk">
      <p>
        {{ disList.comment_text }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recover {
  padding: 1rem;
  min-height: 10rem;
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid rgb(239, 239, 239);
  &_title {
    height: 6rem;
    // @include flex-box-set(start, center);
    &_left {
      height: 100%;
      width: 100%;
      @include flex-box-set(start, center);
      &_avatar {
        height: 100%;
        margin-right: 1rem;
        width: 6rem;
        border-radius: 50%;
        background-color: bisque;
      }
      &_ctx {
        height: 100%;
        width: calc(100vw - 8rem);
        &_top {
          @include flex-box-set(space-between, center);
        }
        p {
          font-size: 1.8rem;
          padding: 5px 0;
        }
        span {
          font-size: 1.2rem;
          color: rgb(198, 196, 196);
        }
      }
    }

    // &_name {
    //   width: 8rem;
    //   height: 100%;
    //   background-color: red;
    // }
  }

  &_talk {
    margin-left: 7rem;
    margin-bottom: 2rem;
    font-size: 2rem;
    width: calc(100% - 7rem);
  }
}
</style>
