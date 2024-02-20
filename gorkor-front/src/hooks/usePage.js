import { ref, onBeforeUnmount } from "vue";

export default function () {
  //页数
  const counts = ref(0);
  //当前页数
  const curCts = ref(1);
  //移动距离
  let distance = 0;
  //吸附百分比
  let moveVw = 0;
  // 视口宽度
  let startX = 0;
  //
  let cWindow;

  const handleup = () => {
    if (counts.value == 1) return;

    if (
      (curCts.value == 1 && distance < 0) ||
      (curCts.value == counts.value && distance > 0)
    ) {
      return;
    }

    const bodyWidth = cWindow.clientWidth;
    const riseArea = Math.abs(distance) / bodyWidth;
    console.log(moveVw);
    console.log("移动距离" + distance);
    console.log(riseArea);
    //鼠标滑动距离大于视口宽度一半  向右滑
    if (riseArea > 0.5 && moveVw >= 0) {
      if (distance > 0) {
        console.log("大于50 右移");
        console.log(distance);
        moveVw += 100;
        curCts.value += 1;
        cWindow.style.transform = `translateX(-${moveVw}vw)`;
      } else {
        console.log("大于50 左移");
        console.log(distance);
        curCts.value -= 1;
        moveVw -= 100;
        cWindow.style.transform = `translateX(-${moveVw}vw)`;
      }
    } else {
      //移动距离小于0.5  在第一页
      cWindow.style.transform = `translateX(-${moveVw}vw)`;
      // }
      console.log(distance);
    }
    distance = 0;
  };

  const handleDown = (event, currentWindow) => {
    if (counts.value == 1) return;
    // console.log(e);
    cWindow = currentWindow;
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleup);
    console.log(event);
    startX = event.touches[0].clientX;
    console.log("起始距离" + startX);
  };

  const handleMove = (event) => {
    if (counts.value == 1) return;
    console.log(event);
    let moveX = event.touches[0].clientX;
    distance = startX - moveX;
    console.log("移动距离" + moveX);
    console.log(distance);
    // console.log(distance);
    //在第一页不能左移 第二页不能右移
    if (
      (curCts.value == 1 && distance < 0) ||
      (curCts.value == counts.value && distance > 0)
    ) {
      return;
    }

    cWindow.style.transform = `translateX(calc(-${moveVw}vw - ${distance}px))`;
  };

  //在页面摧毁前注销监听事件
  onBeforeUnmount(() => {
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleup);
  });

  return {
    counts,
    curCts,
    handleDown,
    handleMove,
    handleup,
  };
}
