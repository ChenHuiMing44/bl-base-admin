/* eslint-disable no-empty-label */
import dayjs from 'dayjs'
import { userCache } from '../config/config'
import { StorageList } from '../config/enums'

const DEFAULT_TIME_REG = 'YYYY-MM-DD HH:mm:ss'

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
  },
  //根据时间戳和正则格式获取时间
  //格式 形如  'YYYY-MM-DD HH:mm:ss'
  stampFormat(stamp, reg = DEFAULT_TIME_REG) {
    stamp = Number(stamp)
    return dayjs(stamp).format(reg)
  },
  /**
   * @2019-07-22
   * @author: huimingchen
   * @params: time reg
   * desc: 该方法用于任何时间（字符串，dayjs对象 date对象 转成特定格式）
   */
  timeFormat(time, reg = DEFAULT_TIME_REG) {
    return dayjs(time).isValid() ? dayjs(time).format(reg) : dayjs().format(reg)
  }
}
