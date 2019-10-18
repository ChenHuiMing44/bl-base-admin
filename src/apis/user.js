import $ajax from './../script/ajax'
import { user } from '../config/apis'

export default {
  /**
   * @2019-10-17
   * @author: huimingchen
   * desc: 用户登录
   */
  login: (params, options) => {
    return $ajax(Object.assign({ ...user.login, data: params }, options))
  },
  /**
   * @2019-10-17
   * @author: huimingchen
   * desc: 获取用户路由页面
   */
  routes: (params, options) => {
    return $ajax(Object.assign({ ...user.routes, data: params }, options))
  }
}
