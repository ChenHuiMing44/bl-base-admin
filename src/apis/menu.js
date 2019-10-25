import { menu } from '../config/apis'
import $ajax from './../script/ajax'

export default {
  userMenu: (params, options) => {
    return $ajax(Object.assign({ ...menu.userMenu, data: params }, options))
  },
  deleteRow: (params, options) => {
    const api = menu.deleteRow
    console.log(params.menuId)
    api.url += `/${params.menuId}`
    return $ajax(Object.assign({ ...api, data: params }, options))
  }
}
