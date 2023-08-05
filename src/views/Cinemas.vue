<template>
  <div>
    <div
      style="
        position: sticky;
        left: 0;
        top: 0;
        background-color: white;
        z-index: 100;
      "
      
    >
      <van-nav-bar ref="navbar" title="影院" @click-left="onClickLeft" @click-right="jumpSearch">
        <template #left>
          <span
            >{{ $store.state.cityName
            }}<van-icon name="arrow-down" color="black"
          /></span>
        </template>
        <template #right>
          <van-icon name="search" size="18" color="black"/>
        </template>
      </van-nav-bar>
    </div>

    <div class="box">
      <ul >
        <li v-for="item in cinemasList" :key="item.cinemaId">
          <div class="left">
            <div>{{ item.name }}</div>
            <div class="cimemas-address" style="color: gray; font-size: 12px">
              {{ item.address }}
            </div>
          </div>
          <div class="right">
            <span style="color: red; font-size: 13px"
              >￥{{ item.lowPrice / 100 }}起</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.left {
  width: 12.5rem;
  float: left;
  font-size: 15px;
  white-space: nowrap;
  .cimemas-address {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.right {
  float: right;
}

.box ul li {
  padding: 10px;
  height: 3.75rem;
  line-height: 1.875rem;
  border-bottom: 1px solid #eee;
}

.box {
  position: relative;
  overflow: hidden;
  height: 600px;
}
</style>


<script>
import http from "@/util/http"
import "../assets/font_maizuo/iconfont.css"//阿里巴巴字体图标库
import BScroll from "@better-scroll/core"

//vuex 新写法 this.cinemasList，
// 不然需要this.$store.state.cinemasList
import {mapState,mapActions,mapMutations} from 'vuex'


export default {
  data() {
    return {
      dataList: [1, 2, 3],
    };
  },
  mounted() {
    // https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=3992679
    
    this.height = document.documentElement.clientHeight-this.$refs.navbar.$el.offsetHeight-document.querySelector('.tab').offsetHeight+"px"
    console.log('height',this.height,document.querySelector('.tab').offsetHeight,this.$refs.navbar.$el.offsetHeight)
    var cityId=this.cityId

    if (this.cinemasList.length === 0) {
    //   this.getCimemaData(cityId).then(
    //     res=>{
    //         this.$nextTick(() => {
    //             new BScroll(".box", {
    //             scrollbar:{
    //                 fade: true
    //             }
    //         });
    //     });
    //     }
    //   )

      this.$store.dispatch('getCimemaData',cityId).then(
        res=>{
            this.$nextTick(() => {
                new BScroll(".box", {
                scrollbar:{
                    fade: true
                }
            });
        });
        }
      )
    } else {
        this.$nextTick(() => {
            new BScroll(".box", {
                scrollbar:{
                    fade: true
                }
            });
        });
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=3992679`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   console.log(res.data.data);
    //   this.dataList = res.data.data.cinemas;
    //   this.$nextTick(() => {
    //     new BScroll(".box", {
    //       probeType: 3,
    //       scrollbar: true,
    //     });
    //   });
    // });
  },
  methods: {
    ...mapActions(['getCimemaData']),
    ...mapMutations(['clearCinema']),
    jumpSearch() {
      this.$router.push(`/cinemas/search`);
    },
    onClickLeft() {
      this.$router.push("/city");

      //清空cinemasList 为了切换城市，能够重新发起请求，否则会一直缓存不变的bug
      this.clearCinema() //vuex 新简洁写法
    //   this.$store.commit('clearCinema') //vuex 直观老写法

    },
  },
  computed:{
        ...mapState(['cinemasList','cityId'])
    }
};
</script>