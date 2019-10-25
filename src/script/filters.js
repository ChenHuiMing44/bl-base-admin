/* eslint-disable no-empty-label */

import Vue from 'vue'
import Utils from './../utils'

let filters = {
  stampFormat(stamp, reg) {
    return Utils.stampFormat(stamp, reg)
  },
  timeFormat(time, reg = 'HH:mm:ss') {
    return Utils.stampFormat(time, reg)
  },
  dateFormat(time, reg = 'YYYY-MM-DD') {
    return Utils.stampFormat(time, reg)
  },
  /**
   * @2019/4/21
   * @author: hm
   * desc: 保留多为小数,默认两位,也可以传一个参数保留多为
   */
  transNumber: function(value, decimalPrecision = 2) {
    if (!value || !Number(value)) {
      value = 0
      return value.toFixed(decimalPrecision)
    }
    return value.toFixed(decimalPrecision)
  },
  /**
   * @2019/4/21
   * @author: hm
   * desc: 将数字转换成 没三位一个逗号
   */
  toThousands(num) {
    let result = '',
      counter = 0
    num = (num || 0).toString()
    for (let i = num.length - 1; i >= 0; i--) {
      counter++
      result = num.charAt(i) + result
      if (!(counter % 3) && i != 0) {
        result = ',' + result
      }
    }
    return result
  }
}

//因为 在vue对象中定义成 属性的话其子组件没法用，故而在此定义成全局的filter

for (let i in filters) {
  Vue.filter(i, filters[i])
}
