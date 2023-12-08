import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({});

  const SETUSER = (user) => {
    userInfo.value = user;
  };

  return {
    userInfo,
    SETUSER,
  };
});
