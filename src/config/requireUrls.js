/* eslint-disable no-empty-label */
import AJAX_CONFIG from './ajaxConfig'
const { get, post } = AJAX_CONFIG.methods

export const login = {
  url: '/login',
  method: post
}

export const GetUserInfo = {
  url: '/userInfo',
  method: get
}
