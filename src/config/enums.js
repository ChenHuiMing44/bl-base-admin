/* eslint-disable no-empty-label */

export const Themes = {
  navy: {
    sideBack: '#2e4356',
    sideActiveBack: '#2e4356',
    sideHoverBack: '#263445',
    sideColor: '#f4f4f5 ',
    sideActiveColor: '#409EFA',
    headerBack: '#fff',
    color: '#333',
    mainBack: '#fff',
    loginTheme: '#2e4356'
  },
  blue: {
    sideBack: '#fff',
    sideActiveBack: '#409EFF',
    sideHoverBack: '#f6f6f6',
    sideColor: '#333',
    sideActiveColor: '#409EFF',
    headerBack: '#00dda8',
    mainBack: '#fff',
    color: '#333',
    loginTheme: '#409EFF'
  }
}

/**
 * @2019/4/18
 * @author: huiming
 * desc:  用户信息的缓存信息级别，local代表永久缓存，后端不删除不会删除，
 * session表示关闭浏览器消失
 * 安全级别不是特别高的建议local 否者选session
 */
export const StorageList = {
  local: 'LOCAL',
  Session: 'SESSION'
}

export const XhrMethods = {
  get: 'GET',
  post: 'POST',
  catch: 'CATCH',
  put: 'PUT'
}

export const XhrRespondeCode = {
  success: 0
}

export const XhrContentTypes = {
  www: 'application/x-www-form-urlencoded;charset=utf-8',
  json: 'application/json;charset=utf-8',
  form: 'multipart/form-data'
}
