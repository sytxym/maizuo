<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的哦"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="handleChangePage(item.filmId)"
      >
        <img :src="item.poster" alt="" />
        <div>{{ item.name }}</div>
        <p>
          观众评分：<span style="color: red">{{ item.grade }}</span>
        </p>
        <p class="myactor">主演： {{ item.actors | actorFilter }}</p>
        <span> 时长: {{ item.runtime }} 分钟</span>
        <!-- <router-link to="/detail">{{item}}</router-link> -->
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// import axios from "axios";
import http from "@/util/http"; //自己封装的axios
import Vue from "vue";

Vue.filter("actorFilter", (data) => {
  if (data === undefined) {
    return;
  }
  return data.map((item) => item.name).join("");
});

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "夏洛特烦恼",
        },
        {
          id: 2,
          name: "战狼",
        },
        {
          id: 3,
          name: "前任3",
        },
      ],
      finished: false,
      loading: false,
      pageNum:1
    };
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=2464406`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
      method: "get",
    }).then((res) => {
      console.log(res.data.data.films);
      this.list = res.data.data.films;
    });
  },
  methods: {
    handleChangePage(id) {
      // location.href="#/detail"
      //编程式导航
      console.log(id);
      //通过路径跳转
      //   this.$router.push(`/detail/${id}`)

      //通过命名路由跳转
      this.$router.push({
        name: "xymdetail",
        params: {
          myid: id,
        },
      });
    },
    onLoad() {
      console.log("到底了");
      this.pageNum++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=2464406`,
        headers: {
          "X-Host": "mall.film-ticket.film.list", 
        },
        method: "get",
      }).then((res) => {
        console.log(res.data);
        this.list = [...this.list,...res.data.data.films];
        this.loading=false
        if(this.list.length===res.data.data.total){
          this.finished=true
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.van-list {
  width: 18.75rem;
  margin: 10px;
  overflow: hidden;
  p,
  span {
    margin-top: .1875rem;
    font-size: 13px;
    color: #797d82;
  }
}

.myactor{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.van-cell img {
  width: 4.125rem;
  height: 6rem;
  margin-right: 10px;
  float: left;
}

.van-cell div {
  font-weight: bold;
}
</style>