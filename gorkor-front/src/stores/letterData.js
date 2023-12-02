import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useletterStore = defineStore("letter", () => {
  const letterObj = ref({});

  const createLetter = (data) => {
    letterObj.value.own = { count: "0", content: `${data}` };
  };

  const INCREMENT_COUNT = (num) => {
    console.log("svvv" + num);
    letterObj.value.own.count = num;
  };

  return {
    letterObj,
    createLetter,
    INCREMENT_COUNT,
  };
});
