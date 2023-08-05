<template>
  <!-- 声明式导航 -->
  <ul>
    <!-- <li><a href="/#/films">电影</a> </li>
        <li><a href="/#/cinemas">影院</a></li>
        <li><a href="/#/center">我的</a></li> -->
    <!-- 
        <router-link  to="/films" active-class="xymactive" tag="li">电影</router-link>
        <router-link  to="/cinemas" active-class="xymactive" tag="li">影院</router-link>
        <router-link  to="/center" active-class="xymactive" tag="li">我的</router-link> -->

    <router-link to="/films" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="isActive ? 'xymactive' : ''">
       <i class="iconfont icon-dianying"> </i> 
       <span>电影</span>
      </li>
    </router-link>
    <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="isActive ? 'xymactive' : ''">
        <i class="iconfont icon-yingyuan"></i>
        <span>影院</span>
      </li>
    </router-link>
    <router-link to="/center" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="isActive ? 'xymactive' : ''">
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </li>
    </router-link>
  </ul>
</template>

<script>
  import "../assets/font_maizuo/iconfont.css";
  export default{

  }
</script>

<style lang="scss" scoped>
.xymactive {
  color: red;
}


.router-link-active {
  color: red;
  font-weight: bold;
}

ul {
      width: 100%;
      display: flex;
      background: white;
      list-style: none;
      padding: 10px;
      margin: 0px;
      position: fixed;
      opacity: 0.95;
      bottom: 0;
      left: 0;
      z-index: 1;
      font-size: 13px;
      li {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
</style>