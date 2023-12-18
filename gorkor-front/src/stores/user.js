import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({});

  const SETUSER = (user) => {
    userInfo.value = user;
  };

  function GETUSERINFO() {
    return userInfo.value;
  }

  return {
    userInfo,
    SETUSER,
    GETUSERINFO,
  };
});
