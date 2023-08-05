<template>
  <div class="swiper" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
  
  <script>
//下载swiper插件 npm i swiper -S --legacy-peer-deps

// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

export default {
  props: {
    slidesPerView: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: "zhuyan",
    },
  },
  mounted() {
    new Swiper("." + this.name, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 10,
      freeMode: true,
    });
  },
};
</script>
  
