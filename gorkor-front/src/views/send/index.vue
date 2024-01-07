<script setup>
import { ref, onBeforeUnmount } from "vue";
const color = ref("#69a4ed");

const props = defineProps({
  id: String,
  bgUrl: String,
});

//页面关闭时清空send
import { useSendStore } from "@/stores/send";
const sendStore = useSendStore();

onBeforeUnmount(() => {
  sendStore.CLEARSEND();
});

import { sendLetter } from "@/api/sendAPI";
const send = async () => {
  const ctx = sendStore.GETSENDOBJ();
  const res = await sendLetter(ctx[0]);
  console.log(res);
};

const rdctx = ref({
  id: 0,
  pNumber: null,
  sendword: "痛苦的思想者",
  sendLoginAt: "000",
  useranme: null,
});
</script>

<template>
  <div class="sendBox">
    <nav-head class="sbox_head">
      <template #navtitle>
        <span>信件预览</span>
      </template>
    </nav-head>
    <div class="sendBox_cover">
      <letter-cover :gcolor="color" :content="rdctx"></letter-cover>
    </div>
    <div class="sendBox_body">
      <div class="sendBox_body_bottom">
        <div class="sendBox_body_bottom_top">
          <span>对方将及时收到你的信件</span>
        </div>
        <div class="sendBox_body_bottom_down">
          <div class="left">
            <div class="left_center">
              <input type="checkbox" />发送同时保存草稿箱
            </div>
          </div>
          <div class="right" @click="send">
            <div class="right_center">发送</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sendBox {
  &_body {
    @include wh(100vw, calc(100vh - 5rem));
    transform: translateY(5rem);
    background-color: rgb(235, 234, 234);

    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100vw;
      height: 12rem;
      &_top {
        color: white;
        height: 3.5rem;
        font-size: 1.8rem;
        background-color: grey;
        @include flex-box-set(center, center);
      }

      &_down {
        display: flex;
        font-size: 1.6rem;
        height: calc(100% - 3.5rem);
        .left {
          @include flex-box-set(center, center);
          &_center {
            @include flex-box-set(center, center);

            input {
              @include wh(25px, 25px);
              margin-right: 1rem;
            }

            input::before {
              content: "";
              position: fixed;
              width: 16px;
              height: 16px;
              background: rgb(96, 228, 255);
              margin-right: 8px;
              z-index: 30;
            }
            // input:checked::after {
            //   content: "✓";
            //   color: #fff;
            //   font-size: 15px;
            //   line-height: 25px;
            //   background-color: rgb(19, 179, 207);
            // }
          }

          flex: 3;
          background-color: rgb(255, 255, 255);
        }

        .right {
          font-size: 2.3rem;
          background-color: $click-color;
          flex: 2;
          color: white;
          @include flex-box-set(center, center);
        }
      }
    }
  }

  &_cover {
    position: absolute;
    z-index: 1;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
