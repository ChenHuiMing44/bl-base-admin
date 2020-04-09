import $ajax from './../script/ajax'
import { role } from '../config/apis'

export default {
  delete: (params, options) => {
    const api = { ...role.delete }
    api.url += `/${params.roleId}`
    return $ajax(Object.assign({ ...api, data: params }, options))
  },
  add: (params, options) => {
    return $ajax(Object.assign({ ...role.add, data: params }, options))
  },
  update: (params, options) => {
    const api = { ...role.update }
    api.url += `/${params.roleId}`
    return $ajax(Object.assign({ ...api, data: params }, options))
  },
  list: (params, options) => {
    return $ajax(Object.assign({ ...role.list, data: params }, options))
  },
  relationMenu: (params, options) => {
    return $ajax(Object.assign({ ...role.relationMenu, data: params }, options))
  },
  switch: (params, options) => {
    return $ajax(Object.assign({ ...role.switch, data: params }, options))
  },
  roleMenu: (params, options) => {
    // const api = { ...role.roleMenu }
    // api.url += `/${params.roleId}`
    return $ajax(Object.assign({ ...role.roleMenu, data: params }, options))
  }
}
