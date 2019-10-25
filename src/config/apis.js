import { XhrMethods as xhr } from './enums'

export const user = {
  login: {
    method: xhr.post,
    url: '/user/login'
  },
  menuTree: {
    method: xhr.get,
    url: '/permission/menu/tree'
  },
  menuList: {
    method: xhr.get,
    url: '/permission/menu/user/list'
  },
  menuAdd: {
    method: xhr.post,
    url: '/permission/menu/add'
  },
  menuUpdate: {
    method: xhr.post,
    url: '/permission/menu/update'
  },
  menuDelete: {
    method: xhr.post,
    url: '/permission/menu/delete'
  }
}

export const role = {
  list: {
    method: xhr.get,
    url: '/permission/role/list'
  },
  update: {
    method: xhr.post,
    url: '/permission/role/update'
  },
  delete: {
    method: xhr.post,
    url: '/permission/role/delete'
  },
  add: {
    method: xhr.post,
    url: '/permission/role/add'
  },
  relationMenu: {
    method: xhr.post,
    url: '/permission/role/associate/menu',
    type: 'body'
  },
  switch: {
    method: xhr.post,
    url: '/permission/role/switch'
  },
  roleMenu: {
    method: xhr.get,
    url: '/permission/role/menu/list'
  }
}

export const menu = {
  userMenu: {
    method: xhr.get,
    url: '/permission/menu/user/tree'
  },
  deleteRow: {
    method: xhr.post,
    url: '/permission/menu/delete'
  }
}
