//对于网络数据请求封装

import axios from "axios";
import { Toast } from 'vant';



// 1.第一种，函数式封装
// function httpForList(){
//    return axios({
//         url: "https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=2464406",
//         headers: {
//           "X-Client-Info":
//             '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688721161304689274945537","bc":"310100"}',
//           "X-Host": "mall.film-ticket.film.list",
//         },
//         method: "get",
//       })
// }

// function httpForDetail(params){
//     return axios({
//       url: `https://m.maizuo.com/gateway?filmId=${params}&k=4123276`,
//         headers: {
//           "X-Client-Info":
//             '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688721161304689274945537","bc":"310100"}',
//           "X-Host": "mall.film-ticket.film.info",
//         },
//     })
//  }

//  export default{
//     httpForList,httpForDetail
//  }


// 2.axios自带封装方案
const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 5000,
    headers: {
        "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688721161304689274945537","bc":"310100"}'
    }
});


// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent

    console.log("开始拦截了",config)
    Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration:0
      });
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.clear()
    return {...response,aaa:222};
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default http

