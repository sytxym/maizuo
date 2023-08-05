import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import http from "@/util/http";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer:(state)=>{
      return{
        cityId:state.cityId,
        cityName:state.cityName
      }
    }
  })],//持久化
  //公共状态
  state:{
    cityId:'310100',
    cityName:'上海',
    cinemasList:[],
    isTabbarShow:true
  },

  //支持异步和同步
  actions:{
    getCimemaData(store,cityId){
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=3992679`,
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      }).then((res) => {
        console.log("store actions getCimemaData",res.data.data.cinemas);
        store.commit('changeCinemasData',res.data.data.cinemas)
      });
    }
  },
  //支持同步
  mutations:{
    changeCityName(state,cityName){
      state.cityName=cityName
    },
    changeCityId(state,cityId){
      state.cityId=cityId
    },
    changeCinemasData(state,data){
      state.cinemasList=data
    },
    clearCinema(state){
      state.cinemasList=[]
    },
    tabShow(state){
      state.isTabbarShow=true
    },
    tabHidde(state){
      state.isTabbarShow=false
    }
  }
})
