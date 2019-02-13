import Vue from 'vue'
import Router from 'vue-router'
// @代表一个绝对路径，就是 项目根目录中的 src 这一层目录
// 可以在 build->webpack.base.config.js中找到resolve 中 配置 的 @
import Login from '@/components/login'
// 导入后台的 Home 主页
import Home from '@/components/Home'

// 导入欢迎组件
import Welcome from '@/components/Welcome'

// 导入用户列表组件
import Users from '@/components/user/Users'
// 导入角色 组件
import Roles from '@/components/rights/Roles'
// 导入权限组件
import Rights from '@/components/rights/Rights'
// 导入商品分类组件
import Categories from '@/components/goods/Categories'
// 导入分类参数组件
import Params from '@/components/goods/Params'
// 导入订单参数组件
import Orders from '@/components/order/Orders'
// 导入商品分类 商品首页 列表页 添加页的 组件
import GoodsContainer from '@/components/goods/GoodsContainer'
import GoodsList from '@/components/goods/List'
import GoodsAdd from '@/components/goods/Add'

// 导入 数据报表 的组件
import Reports from '@/components/report/Reports'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      // 每当来访问 /home 的时候，除了要展示一个 Home 组件，还要重定向到 /welcome 中，
      // 从而，在 home 组件的右侧展示一个欢迎的子组件
      redirect: '/welcome',
      children: [
        // 注意，只要是 children 属性，匹配到的 子路由，这些即将要展示的子路由对应的组件，必须替换到 父组件 的 router-view 中
        // 以后，所有的功能页面，都放到了 Home 的子路由中进行展示
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/orders',
          component: Orders
        },
        {
          path: '/goods',
          redirect: '/goods/list',
          component: GoodsContainer,
          children: [
            {path: '/goods/list', component: GoodsList},
            {path: '/goods/add', component: GoodsAdd}
          ]
        },
        {
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
})
