import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useSendStore = defineStore("send", () => {
  const sendObj = ref([]);

  const SETSEND = (obj) => {
    sendObj.value.push(obj);
  };

  function GETSENDOBJ() {
    return sendObj.value;
  }

  function CLEARSEND() {
    sendObj.value = [];
  }

  return {
    CLEARSEND,
    sendObj,
    SETSEND,
    GETSENDOBJ,
  };
});
