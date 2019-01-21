import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui';
import Cookies from 'js-cookie'
import router from '../router'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
});

service.defaults.withCredentials = true;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(config => {
  if (Cookies.get("AccessToken"))
    config.headers.AccessToken = Cookies.get("AccessToken")
  if (Cookies.get("RefreshToken"))
    config.headers.RefreshToken = Cookies.get("RefreshToken")
  config.params = {
    ...config.params
    _t: Date.parse(new Date()) / 1000,
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true,
      });
    } else {
      if (response.headers) {
        if (response.headers.accesstoken)
          Cookies.set("AccessToken", response.headers.accesstoken);
        if (response.headers.refreshtoken)
          Cookies.set("RefreshToken", response.headers.refreshtoken);
      }
      if (res.status == 40101) {
        Cookies.remove('AccessToken');
        Cookies.remove('RefreshToken');
        router.push({
          name: "/"
        });
      }
      if (res.status == 40102) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000,
          showClose: true,
        });
        return;
      }
      return response.data;
    }
  },
  err => {

    if (err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = err.response.data.message ? err.response.data.message : '服务器内部错误'
          break

        case 50010:
          err.message = '非法参数，请检查参数信息'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }

    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true,
    });

    return Promise.reject(error);
  }
);

// 封装axios的post请求
export function fetch(url, params) {

  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(response => {

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
// 封装axios的get请求
export function get(url) {
  return new Promise((resolve, reject) => {
    service.get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        resolve(error);
        // reject(error);
      })
  })
}


export default {
  JH_news(url, params) {
    return fetch(url, params);
  },
  JH_news2(url) {
    return get(url);
  },
  service
}
