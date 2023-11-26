import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useletterStore = defineStore("letter", () => {
  const letterObj = ref({});

  const createLetter = (data) => {
    console.log(data);
    Object.assign(letterObj.value, data);
  };

  return {
    letterObj,
    createLetter,
  };
});
