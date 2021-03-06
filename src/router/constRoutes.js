/* eslint-disable no-empty-label */
import Layout from '@/views/layout/Layout'
import Error404 from '@/views/error/404'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome/Welcome'
/**
 * @2019/4/18
 * @author: huiming
 * desc:  这里面是默认所有权限都有的路由 依次介绍一下所有的属性 path name component不介绍了
 * 加这些额外的参数主要还是给左侧的sidebar用的
 * 1. hidden 表示不将该路由加载到左侧的栏
 * 2. name 正常来说没有hidden属性必须要有name属性，这个是左侧栏的的名字
 * 3. alwaysShow， 如果设置了这个属性，不管其子路由有没有，这一栏都会显示（用处不大，建议别设置）
 * 4. mate: {
        roles: ["admin", "editor"]  访问权限
        title: 将改变网页的title，不设置默认为项目名
        icon： iconfont图标  建议所有一级设置，二级不要设置
        fixTag: 固定缓存标签页
      }
 */

export default [
  {
    //模板页面 建议不用动
    path: '/',
    component: Layout,
    hidden: true,
    name: '首页',
    redirect: '/index',
    meta: {
      title: '贝连管理系统'
    },
    children: [
      {
        path: 'index',
        component: Welcome,
        name: 'Welcome',
        meta: {
          fixTag: true
        }
      }
    ]
  },
  // {      //有的时候需要一来重定向到一个特定的页面 这个时候删除上面那个 使用 这个
  // 	path: "/",
  // 	component: Layout,
  // 	redirect: 'index',
  // 	children: [
  // 		{
  // 			path: "index",
  // 			component: "XXX",
  // 			name: "XXX"
  // 		}
  // 	]
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: Error404,
    hidden: true,
    meta: {
      title: '404错误'
    }
  },
  {
    path: '/error',
    component: Layout,
    hidden: true,
    meta: {
      title: '401错误',
      icon: '401'
    },
    children: [
      {
        path: '401',
        component: Error404,
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      }
    ]
  }
]
