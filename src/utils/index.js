/* eslint-disable no-empty-label */

import { userCache } from '../config/config'
import { StorageList } from '../config/enums'

export default {
  isJson: function(jsonStr) {
    if (typeof jsonStr === 'string') {
      try {
        JSON.parse(jsonStr)
        return true
      } catch (e) {
        return false
      }
    }
    return false
  },
  storage: () => {
    if (userCache === StorageList.Session) {
      return sessionStorage
    }
    return localStorage
  },
  getTimeWithStamp: (stamp) => {
    return new Date(Number(stamp))
  },
  tunefulParse: (jsonStr, defaultReturn) => {
    if (typeof jsonStr === 'string') {
      try {
        return JSON.parse(jsonStr)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(jsonStr + ' is not a json')
      }
    }
    return defaultReturn || jsonStr
  }
}
