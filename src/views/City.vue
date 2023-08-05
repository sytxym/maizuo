<template>
  <div>
    <detail-header style="position: static;"> 当前城市 </detail-header>

    <div class="hotcity">
      <p>热门城市</p>
      <div class="itemhot">
        <div v-for="item in hotCitys" :key="item.cityId" @click="clickItem(item)">{{ item.name }}</div>
      </div>
    </div>

    <van-index-bar :index-list="indexList" @select="handleChange">
      <div v-for="item in cityList" :key="item.type">
        <van-index-anchor :index="item.type"> </van-index-anchor>
        <van-cell
          :title="data.name"
          v-for="data in item.citys"
          :key="data.cityId"
          @click="clickItem(data)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import http from "@/util/http";
import { Toast } from "vant";
import detailHeader from "@/mycomponents/detail/DetailHeader.vue";
import obj from '@/util/mixinObj'

export default {
  mixins:[obj], //混入生命周期函数
  components: {
    detailHeader,
  },
  data() {
    return {
      cityList: [],
      hotCitys: [],
    };
  },
  computed: {
    indexList() {
      return this.cityList.map((item) => item.type);
    },
  },
  destroyed(){
    // this.$store.commit('tabShow')
  },
  mounted() {
    // this.$store.commit('tabHidde')
    http({
      url: "/gateway?k=8567585",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      //   console.log(res.data);
      this.cityList = this.render(res.data.data.cities);
    });
  },
  methods: {
    render(list) {
      this.hotCitys = list.filter(
        (
          item //取出热门城市
        ) => item.isHot === 1
      );

      var chars = [];
      var cityList = [];
      //转换a-z
      for (let index = 65; index < 91; index++) {
        var char = String.fromCharCode(index);
        // console.log(char)
        chars.push(char);
      }

      //把a-z的城市数据分组过滤出来
      chars.forEach((nt) => {
        // console.log(nt);
        // console.log(list);
        var myclist = list.filter((item) => {
          return nt === item.pinyin.substring(0, 1).toUpperCase();
        });
        console.log("过滤后:", myclist);

        //自定义数据格式，方便渲染
        myclist.length > 0 &&
          cityList.push({
            type: nt,
            citys: myclist,
          });
        console.log("格式数据:", cityList);
      });

      return cityList;
    },
    handleChange(data) {
      console.log("change", data);
      Toast(data);
    },
    clickItem(item){
        console.log(item.name,item.cityId)
        //传统的多页面方案
        // location.href='#/cinemas?cityname='+item.name
        
        //单页面方案
        // 1.中间人模式
        //2. bus事件总线 $on,$emit

        //vuex -状态管理模式
        // this.$store.state.cityName=item.name
        // this.$store.state.cityId=item.cityId
        this.$store.commit('changeCityName',item.name)
        this.$store.commit('changeCityId',item.cityId)
        this.$router.back()
    }
  },
};
</script>

<style lang="scss" scoped>
.hotcity {
  z-index: 100;  
  p {
    color: gray;
    font-size: 16px;
    margin: 10px;
  }

  .itemhot {
    display: flex;
    flex-wrap: wrap;

    div {
      border: 1px solid gray;
      background: #eee;
      color: black;
      margin: 10px 5px;
      font-size: 13px;
      width: 30%;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>