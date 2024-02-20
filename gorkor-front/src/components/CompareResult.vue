<script setup>
import { ref, reactive, computed, defineEmits, onMounted } from "vue";

const props = defineProps({
  yes: {
    type: Number,
  },
  no: {
    type: Number,
  },
  Rwidth: {
    type: Number,
    default: 80,
  },
  height: {
    type: Number,
    default: 5,
  },
});

onMounted(() => {
  console.log(props.yes);
});
//对比数据
const data1 = ref(props.yes);
const data2 = ref(props.no);

const total = computed(() => data1.value + data2.value);
const percentage1 = computed(() =>
  Math.round((data1.value / total.value) * 100)
);
const percentage2 = computed(() =>
  Math.round((data2.value / total.value) * 100)
);
const rectangleStyle = computed(() => ({
  background: `linear-gradient(90deg, #8fd7db ${percentage1.value}%,0%, #ffb3a8 ${percentage2.value}%)`,
}));

//子传父
const emit = defineEmits("submitAgree");
function submitYes() {
  console.log("ff");
  emit("submitAgree", "true");
}

function submitNo() {
  emit("submitAgree", "false");
}
</script>

<template>
  <div class="list" :style="{ height: height + 'rem' }">
    <div class="list_result" :style="{ width: Rwidth + 'vw' }">
      <div class="list_result_select list_result_left" @click="submitYes">
        <p>是</p>
      </div>
      <div :style="rectangleStyle" class="list_result_area">
        <p>{{ data1 }}</p>
        <p>{{ data2 }}</p>
      </div>
      <div class="list_result_select list_result_right" @click="submitNo">
        <p>否</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  width: 100vw;
  &_result {
    height: 100%;
    margin: 0 auto;
    display: flex;
    &_select {
      font-size: 2rem;
      @include flex-box-set(center, center);
      width: 8rem;
      height: 100%;
    }
    &_left {
      border-radius: 1rem 0 0 1rem;
      color: #8fd7db;
      border: 1px solid #8fd7db;
      overflow: hidden;
    }
    &_right {
      border-radius: 0 1rem 1rem 0;
      border: 1px solid #ffb3a8;
      color: #ffb3a8;
    }
    &_area {
      height: 100%;
      width: 100%;
      font-size: 2.4rem;
      color: #fff;
      @include flex-box-set(between, center);
      p {
        padding: 1rem;
      }
    }
  }

  &_ques {
    @include flex-box-set(center, center);
    width: 50%;
    margin: 0 auto;
    font-size: 1.7rem;
    font-weight: bold;
  }
}
</style>
