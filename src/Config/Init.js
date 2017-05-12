import axios from 'axios';
import target from '../Config/Config';


// 添加接口验证权限
const AUTH_TOKEN = {

};

/* eslint-disable */
/* 添加请求拦截器*/
axios.interceptors.request.use((config) => {
     /* 在发送请求之前做某事*/
  NProgress.start();
  console.log(config);
  return config;
}, (error) => {
   /* 请求错误时做些事*/
  NProgress.done();
  return Promise.reject(error);
});

/* 添加响应拦截器*/
axios.interceptors.response.use((response) => {
  /* 对响应数据做些事*/
  NProgress.done();
  const { code, data, msg, config } = response.data;
  // 通过后端返回的状态码，判断是否登录，是否有权限，接口错误，参数错误等等情况
  if (code !== 200) {
    // 处理一些事情
    console.log(`${config.url}接口返回格式错误`);
  } else {
    return data;
  }
}, (error) => {
     /* 请求错误时做些事*/
  NProgress.done();
  return Promise.reject(error);
});
/* eslint-disable */

axios.defaults.baseURL = target;
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
