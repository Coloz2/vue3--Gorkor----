import { defineStore } from "pinia";
import { ref } from "vue";
import { getDraftsList } from "@/api/draftsAPI.js";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

export const useletterStore = defineStore("letter", () => {
  const letterObj = ref([]);
  const isRequest = ref(false);
  const createLetter = (data, role) => {
    letterObj.value.push({
      content: data,
      receiverId: role,
      senderId: user.GETUSERINFO().id,
    });
  };

  //增加页数
  const INCREMENT_COUNT = (num, role) => {
    // console.log("svvv" + num);
    // letterObj.value[role].count = num;
  };

  const getIndex = (id) => {
    let index = letterObj.value.findIndex((e) => e.receiverId == id);
    return index;
  };

  //更新背景图片
  const SETBGURL = (url, id) => {
    const letter = getIndex(role);
    letter.bgurl = url;
  };

  //更新数据-前端
  const SETCONTENT_FRONT = (data, role) => {
    const index = getIndex(role);
    console.log("INDEX---------" + index);
    console.log(letterObj.value); // 记录整个数组
    console.log("赋值前:", letterObj.value[index].content);

    letterObj.value[index].content = data;

    console.log("赋值后:", letterObj.value[index].content);
  };

  //获取数据 从pinia
  const GETCONTENT = (id) => {
    console.log("-------------------");
    const index = getIndex(id);
    console.log(index);
    if (index !== -1) {
      return letterObj.value[index].content;
    }
  };

  function GETALL() {
    return letterObj.value;
  }

  //从后端请求数据存入pinia
  async function SETOBJ_BACK() {
    if (isRequest.value == true) return;
    const user = await import(/* @vite-ignore */ "@/stores/user.js");
    const userStore = user.useUserStore(); // 从模块中获取 useUserStor
    const { id: senderId } = userStore.GETUSERINFO();
    //如果登录
    if (senderId) {
      //只在第一次页面渲染时 查找数据库的数据
      const res = await getDraftsList(senderId);
      //赋值
      letterObj.value = res.data.data;
      //已经请求
      isRequest.value = true;
    }
  }
  //

  return {
    SETOBJ_BACK,
    print,
    letterObj,
    SETCONTENT_FRONT,
    GETALL,
    SETBGURL,
    createLetter,
    INCREMENT_COUNT,
    GETCONTENT,
  };
});
