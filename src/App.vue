<template>
  <div id="app">
    <div class="mybody">
      <div id="myrouter">
        <router-view></router-view>
      </div>

      <div id="mycomponent" v-if="false">
        <h1>自定义组件</h1>
        <nav-bar myname="home" :myright="true" @event="handleEvent">
          <div>我是插槽</div>
        </nav-bar>
        <sildebar v-show="isShow"> </sildebar>
      </div>

      <div id="mybase" v-if="false">
        <h1>基本用法</h1>
        hello-app{{ myname }}<br />
        <img src="/psb.jpg" alt="" /><br />
        <input type="text" v-model="mytext" />
        <button @click="handleAdd">add</button>

        <ul>
          <li v-for="item in datalist" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div v-hello v-if="false">指令这一类</div>

      <p v-if="false">过滤器：{{ testFilter | capitalize }}</p>
    </div>

    <bottom-tab ref="mytab" class="tab" v-show="this.$store.state.isTabbarShow"></bottom-tab>
  </div>
</template>

<script>
//@代表src的绝对路径
import navbar from "@/mycomponents/AppNavBar";
import sildebar from "./mycomponents/SildeBar";
import BottomTab from "@/views/BottomTab.vue";
import Vue from "vue"; /* 导入vue库 */
import axios from "axios";
// import Vant from 'vant';
import Vant from "vant";
import "vant/lib/index.css";

//全局组件
// Vue.component('navBar',navbar)

Vue.use(Vant);

//指令
Vue.directive("hello", {
  inserted(el) {
    el.style.border = "1px solid gray";
  },
});

//过滤器
Vue.filter("capitalize", (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
});

export default {
  data() {
    return {
      myname: "xym",
      datalist: ["111"],
      mytext: "",
      isShow: true,
      testFilter: "wangyalu",
    };
  },
  components: {
    //局部组件
    navBar: navbar,
    sildebar: sildebar,
    bottomTab: BottomTab,
  },
  methods: {
    handleAdd() {
      this.datalist.push(this.mytext);
    },
    handleEvent() {
      this.isShow = !this.isShow;
    },
  },
  computed: {},
  mounted() {
    console.log("tabheight:", this.$refs.mytab.$el.offsetHeight);
    //  https://i.maoyan.com/ajax/filterCinemas?ci=10&optimus_uuid=A8E26320244B11EE8D4145C607F4F74A55EB092785114101A0689BD35BED0C42&optimus_risk_level=71&optimus_code=10
    //  https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E4%B8%8A%E6%B5%B7&ci=10&channelId=4
    console.log("mounted");
    //跨域链接，需要在vue.config.js配置反向代理
    // axios
    //   .get(
    //     "/api/mmdb/movie/v3/list/hot.json?ct=%E4%B8%8A%E6%B5%B7&ci=10&channelId=4"
    //   )
    //   .then((res) => {
    //     console.log("电影", res.data.data.hot);
    //   });

    // axios
    //   .get(
    //     "/xym/ajax/filterCinemas?ci=10&optimus_uuid=A8E26320244B11EE8D4145C607F4F74A55EB092785114101A0689BD35BED0C42&optimus_risk_level=71&optimus_code=10"
    //   )
    //   .then((res) => {
    //     console.log("影院", res.data.brand);
    //   });
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

html,
body {
  width: 100%;
}

#mybase > ul {
  li {
    border-bottom: 1px solid black;
    background: yellow;
    padding: 10px;
  }
}

#mybase ul li:last-child {
  border-bottom: 0px;
}

#mycomponent img {
  width: 150px;
}

#myrouter {
  margin-bottom: 20px;
  height: 100%;
}

#mycomponent {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
}

#mybase {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
}

#mybase img {
  width: 100%;
}

.mybody {
  margin-bottom: 3.125rem;
}
</style>
