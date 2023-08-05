<template>
  <div>
    <h3>login页面</h3>
    用户名 <input type="text" name="" id=""><br>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogin() {
      setTimeout(() => {
        localStorage.setItem("token", "token数据");
        // this.$router.back()

        //1.获取query
        console.log('路由源',this.$route.query.redirect)
        //2.//跳转到当前想要跳的页面去(也就是回到上一个页面，我们称为路由源)
        this.$router.push(this.$route.query.redirect);
      }, 1000);
    },
  },
};
</script>