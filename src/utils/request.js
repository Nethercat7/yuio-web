import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router';
import { getStorage } from "./storage";
import { Loading } from 'element-ui';

// loading动画配置
let loading;
let requestCount = 0;

function enableLoading() {
  if (requestCount === 0) {
    loading = Loading.service({
      target: "#content",
      lock: true,
      text: "请稍等..."
    });
  }
  requestCount++;
}

function disableLoading() {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) {
    loading.close();
  }
}

//创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

//配置请求拦截器
service.interceptors.request.use(config => {
  //设置请求头
  const token = getStorage("token")
  if (token) {
    config.headers.token = token;
  }
  enableLoading()
  return config
}, error => {
  disableLoading();
  Promise.reject(error)
})

//配置响应拦截器
service.interceptors.response.use(resp => {
  disableLoading();
  return resp.data
}, error => {
  disableLoading();
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = "参数错误"
        break;
      case 402:
        error.message = '未登录'
        router.push("/login")
        break;
      case 401:
        error.message = '登录信息已过期，请重新登录'
        router.push("/login")
        break;
      case 403:
        error.message = '拒绝访问'
        router.push("/error")
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        //window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请刷新当前页')
    }
    error.message('连接服务器失败')
  }
  Message.error(error.message)
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  //return Promise.resolve(error.response)
  return Promise.resolve(error.response)
})

export default service
