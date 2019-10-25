/* eslint-disable no-empty-label */
// import * as Permits from './../../config/permits'
// import asyncRoutes from './../../router/asyncRouterMap'
import constRoutes from './../../router/constRoutes'
import componentList from './../../config/componentList'
import Utils from './../../utils'
import EmptyPage from './../../views/common/emptyPage'

// const Layout = () => import('./../../views/layout/Layout')
//根据后台返回的page component key
function getAsyncComponent(pageComp) {
  const componentPath = componentList[pageComp]
  if (!componentPath) {
    return EmptyPage
  }
  return view(componentPath)
}

const trees = {
  menu: 0,
  permit: 1,
  page: 2
}

function handleRoute(originRoute) {
  let tmp = {}
  tmp.meta = Utils.tunefulParse(originRoute.root.metaInfo, {})
  tmp.meta.menuId = originRoute.root.menuId
  if (originRoute.root.type === trees.permit) {
    tmp.permissions = originRoute.root
  } else {
    if (originRoute.root.component) {
      tmp.name = 'page' + originRoute.root.menuId
      tmp.component = getAsyncComponent(originRoute.root.component)
    }
    tmp.path = originRoute.root.path
    tmp.menuName = originRoute.root.menuName
    tmp.meta.inMenu = originRoute.root.type === trees.menu
  }
  return {
    ...tmp,
    children: originRoute.children,
    isPage: originRoute.root.type !== trees.permit
  }
}

function filterRoutes(routes) {
  const asyncRoutes = []
  const asyncPermissions = []
  routes.forEach((route) => {
    const tmp = handleRoute(route)
    if (tmp.children && tmp.children.length) {
      const child = filterRoutes(tmp.children)
      if (child.isPage) {
        tmp.children = child.routes
      } else {
        tmp.meta.permissions = child.permissions
        delete tmp.children
      }
    }
    if (tmp.isPage) {
      asyncRoutes.push(tmp)
    } else {
      asyncPermissions.push(tmp.permissions)
    }
  })
  return {
    routes: asyncRoutes,
    permissions: asyncPermissions,
    isPage: !asyncPermissions.length
  }
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
    userTree: (state) => state.routes || [],
    hasSettingRoutes: (state) => state.hasSetting
  },
  actions: {
    InitRoutes({ commit }, originRoutes) {
      return new Promise((resolve) => {
        const accessedRoutes = filterRoutes(originRoutes).routes
        console.log(accessedRoutes.length)
        commit('SET_ROUTES', accessedRoutes)
        commit('SET_SETTING', true)
        resolve(accessedRoutes)
      })
    }
  }
}
