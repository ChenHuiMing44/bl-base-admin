/* eslint-disable no-empty-label */
// import * as Permits from './../../config/permits'
// import asyncRoutes from './../../router/asyncRouterMap'
import constRoutes from './../../router/constRoutes'
import componentList from './../../config/componentList'
import Layout from './../../views/layout/Layout'
import Utils from './../../utils'

//根据后台返回的page component key
function getAsyncComponent(pageComp) {
  const componentPath = componentList[pageComp]
  if (!componentPath) {
    return Layout
  }
  // return Layout
  return view(componentPath)
}

function handleRoute(originRoute) {
  let tmp = { ...originRoute }
  if (tmp.component) {
    //添加name属性
    tmp.name = tmp.component
    tmp.component = getAsyncComponent(tmp.component)
  }

  tmp.meta = Utils.tunefulParse(tmp.meta)
  //实际后台返回的 route权限在 第一层
  return tmp
}

function filterRoutes(routes) {
  const asyncRoutes = []
  routes.forEach((route) => {
    const tmp = handleRoute(route)
    if (tmp.children) {
      tmp.children = filterRoutes(tmp.children)
    }
    asyncRoutes.push(tmp)
  })
  return asyncRoutes
}
function view(path) {
  return function(resolve) {
    //必须这么写 不然会报错， import 函数必须有匹配，即匹配 @ xxx  和  .vue前后匹配
    //或者可以用函数require 函数，但是实现不了懒加载目的
    import(`@/views/${path}.vue`).then((mod) => {
      resolve(mod)
    })
  }
}

/**
 * @2019/4/17
 * @author: huiming
 * desc:  用户权限模块
 * 权限为两种类型， 一个是page的权限（往往伴随左侧的side ）然后通过 router拦截
 * 一个是 功能性权限 这个需要全局getter 出去判断
 */
export default {
  state: {
    routes: [],
    addRoutes: [],
    hasSetting: false
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constRoutes.concat(routes)
    },
    SET_SETTING: (state, val = false) => {
      state.hasSetting = val
    }
  },
  getters: {
    permissionRoutes: (state) => state.routes,
    hasSettingRoutes: (state) => state.hasSetting
  },
  actions: {
    InitRoutes({ commit }, originRoutes) {
      return new Promise((resolve) => {
        let accessedRoutes = filterRoutes(originRoutes)

        commit('SET_ROUTES', accessedRoutes)
        commit('SET_SETTING', true)
        resolve(accessedRoutes)
      })
    }
  }
}
