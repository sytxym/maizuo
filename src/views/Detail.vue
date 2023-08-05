<template>
  <div v-if="filmInfo" id="box">
    <detail-header v-scroll="80" style="display: none">{{
      filmInfo.name
    }}</detail-header>
    <div
      class="poster"
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div>
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">{{ filmInfo.premiereAt | dataFilter }}</div>
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div class="detail-text" :class="isShowMore ? 'hidden' : ''">
          {{ filmInfo.synopsis }}
        </div>
        <div style="text-align: center" @click="isShowMore = !isShowMore">
          <i
            class="iconfont"
            :class="
              isShowMore
                ? 'icon-jiantou_liebiaozhankai'
                : 'icon-jiantou_liebiaoshouqi'
            "
          ></i>
        </div>
      </div>

      <div>
        <div>主演人员</div>
        <detail-swiper :slidesPerView="4" :name="'zhuyan'">
          <detail-swiper-item
            v-for="(item, index) in filmInfo.actors"
            :key="index"
          >
            <div
              class="avatar"
              :style="{
                backgroundImage: 'url(' + item.avatarAddress + ')',
              }"
            ></div>
            <div style="font-size: 13px">{{ item.name }}</div>
            <div class="detail-role">{{ item.role }}</div>
          </detail-swiper-item>
        </detail-swiper>
      </div>

      <div>
        <div>剧照</div>
        <detail-swiper :slidesPerView="2" :name="'juzhao'">
          <detail-swiper-item
            v-for="(item, index) in filmInfo.photos"
            :key="index"
          >
            <div
              @click="preView(index)"
              class="avatar"
              :style="{
                backgroundImage: 'url(' + item + ')',
                height: 10,
              }"
            ></div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import http from "@/util/http"; //自己封装的axios
import Vue from "vue";
import moment from "moment"; //日期显示库
import "../assets/font_maizuo/iconfont.css"; //阿里巴巴字体图标库
import detailSwiper from "@/mycomponents/detail/DetailSwiper";
import detailSwiperItem from "@/mycomponents/detail/DetailSwiperItem.vue";
import detailHeader from "@/mycomponents/detail/DetailHeader.vue";
import { ImagePreview } from "vant";
import obj from '@/util/mixinObj'

console.log(moment().format("YYYY-MM-DD"));

Vue.filter("dataFilter", (value) => {
  return moment(value * 1000).format("YYYY-MM-DD");
});

Vue.directive("scroll", {
  inserted(el, binding) {
    window.onscroll = function () {
      console.log("scroll");
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        console.log("显示");
        el.style.display = "block";
      } else {
        console.log("隐藏");
        el.style.display = "none";
      }
    };
  },
  unbind() {
    window.onscroll = null;
  },
});



export default {
  mixins:[obj],
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader,
  },
  data() {
    return {
      myid: "",
      filmInfo: null,
      isShowMore: true,
    };
  },
  mounted() {
  
    //获取参数

    //1.bom获取路径，手动截取
    // console.log(location.href)

    //2.this.$route 当前匹配的路由
    this.myid = this.$route.params.myid;
    console.log("created", this.myid);

    //3.根据id查询详情
    // https://m.maizuo.com/gateway?filmId=6435&k=4123276

    http({
      url: `/gateway?filmId=${this.myid}&k=4123276`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      console.log(res.data);
      this.filmInfo = res.data.data.film;

    });
  },
  methods: {
    preView(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 13.125rem;
  background-position: center;
  background-size: cover;
}

.content {
  padding: 15px;
  .detail-text {
    font-size: 13px;
    color: #797d82;
    margin-top: 10px;
  }
}

.hidden {
  overflow: hidden;
  height: 30px;
  line-height: 15px;
}
.avatar {
  margin-top: 10px;
  width: 100%;
  height: 5.3125rem;
  background-position: center;
  background-size: cover;
}

.detail-role {
  font-size: 12px;
  color: gray;
  text-align: center;
}
</style> 