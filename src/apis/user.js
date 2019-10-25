import $ajax from './../script/ajax'
import { user } from '../config/apis'

export default {
  /**
   * @2019-10-17
   * @author: huimingchen
   * desc: 用户登录
   */
  login: (params, options) => {
    // return $ajax(Object.assign({ ...user.login, data: params }, options))
    return new Promise((resolve) => {
      resolve(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJiYXNlNjRTZWNyZXQiOiJleUpqYkdsbGJuUWlPaUp3WXlJc0luUnBiV1ZUZEdGdGNDSTZNVFUzTXpBeU56ZzBOREF5TVN3aWRYTmxja2xrSWpvM09EVXlPRE15T1RjNU1EQTFNRGczTnpRMGZRPT0iLCJjbGllbnQiOiJwYyIsInRpbWVTdGFtcCI6MTU3MzAyNzg0NDAyMSwidXNlcklkIjo3ODUyODMyOTc5MDA1MDg3NzQ0fQ.bjK42zvGaX6RH82BOz0REgoQWSaxZtoei56s88YZMPo'
      )
    })
  },
  /**
   * @2019-10-17
   * @author: huimingchen
   * desc: 获取用户路由页面
   */
  menuTree: (params, options) => {
    return $ajax(Object.assign({ ...user.menuTree, data: params }, options))
  },
  menuAdd: (params, options) => {
    return $ajax(Object.assign({ ...user.menuAdd, data: params }, options))
  },

  menuUpdate: (params, options) => {
    const api = { ...user.menuUpdate }
    api.url += `/${params.menuId}`
    return $ajax(Object.assign({ ...api, data: params }, options))
  },

  menuDelete: (params, options) => {
    const api = { ...user.menuDelete }
    // api.url += `/${params.menuId}`
    return $ajax(Object.assign({ ...api, data: params }, options))
  }
}
