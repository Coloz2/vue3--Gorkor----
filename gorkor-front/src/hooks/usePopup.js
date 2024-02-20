import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { addDis } from "@/api/questionAPI";
const userStore = useUserStore();

export default function () {
  //回复框升降
  const clicked = ref(false);

  //打开
  function openR() {
    clicked.value = true;
  }

  //提交方法
  async function submitTo(qid, textValue) {
    console.log("grgr");
    console.log(qid, textValue);
    const { id } = userStore.GETUSERINFO();
    console.log(id);
    const res = await addDis({
      id,
      question_id: qid,
      content: textValue,
    });
    console.log(res);
    clicked.value = false;
  }

  return {
    clicked,
    openR,
    submitTo,
  };
}
