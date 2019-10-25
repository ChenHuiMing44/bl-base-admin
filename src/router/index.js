/* eslint-disable no-empty-label,no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import constRoutes from './constRoutes'
import store from '../store'
Vue.use(Router)

//layout为通配模板页面
const router = new Router({
  routes: constRoutes
})
router.beforeEach((to, from, next) => {
  //切换路由先回判断 vuex里面或者缓存 里面有没有token
  if (store.getters.token) {
    // 判断是否有token
    if (to.path === '/login') {
      next('/')
    } else {
      //判断用户是否已经加载过权限
      if (!store.getters.hasSettingRoutes) {
        store
          .dispatch('RequireUserInfo')
          .then((res) => {
            console.log(res)
            const originRoutes = res.result || []
            store
              .dispatch('InitRoutes', originRoutes)
              .then((accessedRoutes) => {
                console.log(accessedRoutes)
                // debugger
                console.log(router)
                // router.addRoutes(accessedRoutes)
                router.addRoutes(accessedRoutes)
                console.log(router)
                next({ ...to, replace: true })
              })
          })
          .catch(() => {
            store.dispatch('InvalidToken')
            next({ path: '/' })
          })
      } else {
        document.title =
          to.meta && to.meta.title ? to.meta.title : store.getters.appTitle
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else if (to.path === '/login') {
    document.title =
      to.meta && to.meta.title ? to.meta.title : store.getters.appTitle
    next()
  } else {
    next({
      path: '/login'
    }) // 否则全部重定向到登录页
  }
})

function go(to, next) {
  console.log(accessedRoutes)
  // debugger
  console.log(router)
  // router.addRoutes(accessedRoutes)

  router.addRoutes(accessedRoutes)
  console.log(router)
  // next({ ...to, replace: true })
}

export default router
