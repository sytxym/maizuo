<template>
  <div class="header">
    <i class="iconfont icon-jiantou_liebiaozhankai" @click="back"></i>
    <slot></slot>
  </div>
</template>




<style lang="scss" scoped>
.header {
  position: fixed;
  height: 2.75rem;
  width: 100%;
  top: 0;
  left: 0;
  line-height: 44px;
  text-align: center;
  background: white;
  i {
    font-size: 30px;
    height: 2.75rem;
    float: left;
    margin-left: 10px;
    line-height: 44px;
    text-align: center;
  }
}
</style>

<script>
import "../../assets/font_maizuo/iconfont.css"; //阿里巴巴字体图标库
export default {
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>