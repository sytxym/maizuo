<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>

export default {
  //路由生命周期拦截
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  },
};
</script>
<style lang="scss" scoped>

</style>
