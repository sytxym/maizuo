import Vue from 'vue'/* 导入vue库 */
import App from './App.vue' // 导入根节点
// import App from './PCApp.vue' // 导入根节点
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,//this.$router 访问到router
  store,//this.$store 访问到store
  render: h => h(App)
}).$mount('#app')

const obj = {
  name: 'xym',
  age: 19,
  sex: '男'
}

console.log(obj)
