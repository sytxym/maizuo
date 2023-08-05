import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Cinemas from '@/views/Cinemas'
import Center from '@/views/Center'
import HotPlaying from '@/views/HotPlaying'
import NowPlaying from '@/views/NowPlaying'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
// import Login from '@/views/Login'
import City from '@/views/City'

Vue.use(VueRouter)

//路由配置表
const routes = [
  {//一级路由
    path: '/films',
    component: Films,
    children: [//嵌套路由
      {
        path: '/films/hotplaying',
        component: HotPlaying
      },
      {
        path: '/films/nowplaying',
        component: NowPlaying
      },
      {
        path: '/films',
        redirect: '/films/hotplaying'
      }
    ]
  }
  , {
    path: '/cinemas',
    component: Cinemas,
    meta: {
      isXymRequired: true
    }
  }, {
    path: '/city',
    component: City
  },  {
    path: '/center',
    component: Center,
    // beforeEnter: (to, from, next) => {//独享路由拦截
    //   if (localStorage.getItem("token")) {
    //     next()
    //   } else {
    //     next({
    //       path: '/login',
    //       query: { redirect: to.fullPath }
    //     })
    //   }
    // }
  }, {
    path: '/cinemas/search',
    component: Search,
    alias: '/aaa'
  }, {
    path: '/login',
    // component: Login
    component: ()=> import('@/views/Login')//路由懒加载，就是用到的时候再加载，优化js文件过大首屏页面加载过慢的问题
  }, {
    name: 'xymdetail',//命名路由
    path: '/detail/:myid',//动态路由
    component: Detail
  },
  {
    path: '/',//*是所有的 /是整个域名
    redirect: '/films' //重定向
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

//全局拦截（守卫）
// router.beforeEach((to,from,next) => {
//   // console.log(to.fullPath,from)
//   if(to.fullPath==='/center'||to.meta.isXymRequired){//需要登录的，就进行拦截，fullPath看是否登录,多个路径可以自定义isXymRequired字段判断

//     console.log(localStorage.getItem("token"))
//     if(localStorage.getItem("token")){
//         next()
//       }else{
//         // next('/login')//回到登录页面
//         next({
//           path:'/login',
//           query:{redirect: to.fullPath}
//         })
//       }
//   }else{
//     next()//不需要拦截，放行
//   }
// })

export default router
