<template>
  <div class="swiper zenglihua">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
//下载swiper插件 npm i swiper -S --legacy-peer-deps

// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

function init(loop) {
  console.log("loop", loop);
  new Swiper(".swiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    // direction: "vertical", // 垂直切换选项
    loop: loop,
    autoplay: {
      delay: 3000, //3秒切换一次
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    // on: {
    //   slideChange: function () {
        // console.log("下标", this.activeIndex);
      // },
    // },
  });
}

export default {
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    init(this.loop);
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 11.25rem;
  margin-bottom: 10px;
}


</style>