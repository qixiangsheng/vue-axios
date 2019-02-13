import Vue from 'vue'
import App from './App'
// 如果要加载 某个目录中的 index.js文件，可以省略 index.js 这个后缀名
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
// 导入 字体图标库
import './assets/fonts/iconfont.css'
// 导入 axios
import axios from 'axios'

// 导入树形表格组件
import TreeGird from 'vue-table-with-tree-grid'

// 导入和安装 ElementUI 组件库
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 把树形表格，注册为全局的组件
// console.log(TreeGird.name) zk-table
// 自己改成自己的名字
Vue.component('tree-grid', TreeGird)

// 添加路由导航守卫，只有登陆的情况下，才允许访问有权限的页面，否则，跳转到登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取令牌
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

// 配置 baseurl 地址
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 改成我们本地配置的 服务器
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 把 axios 挂载到 vue 上
Vue.prototype.$http = axios

// 给 axios 请求配置 令牌参数 请求拦截器
axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  const token = sessionStorage.getItem('token')
  // 把令牌添加到每次请求的 ajax 请求头中
  config.headers.Authorization = token
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// 默认为开发环境
Vue.config.productionTip = false

/* 配置即使初始化一个 Vue 实例，但是没有接收，也不报错 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
