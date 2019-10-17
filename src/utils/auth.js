/* eslint-disable no-empty-label */
import Utils from './index'

export const getToken = function() {
  return Utils.storage().getItem('token')
}
