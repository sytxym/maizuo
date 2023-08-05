<template>
  <div>
    <film-swiper :loop="true" :key="list.length">
      <film-swiper-item v-for="item in list" :key="item">
        <img :src="item" alt="" />
      </film-swiper-item>
    </film-swiper>
    <film-header class="sticky"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import FilmSwiper from "@/mycomponents/films/FilmSwiper.vue";
import FilmSwiperItem from "@/mycomponents/films/FilmSwiperItem.vue";
import FilmHeader from "@/mycomponents/films/FilmHeader.vue";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted(){
    setTimeout(() => {
      //模拟ajax异步，延迟一下
      this.list = [
        "/banner1.jpg",
        "/banner2.jpg",
      ];
    }, 1000);
  },
  components: {
    FilmSwiper,
    FilmSwiperItem,
    FilmHeader
  },
};
</script>

<style lang="scss" scoped>
  div{
    margin-bottom: 10px;
  }
 

  .sticky{
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
  }

</style>