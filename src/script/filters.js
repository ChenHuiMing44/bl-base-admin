/* eslint-disable no-empty-label */

import Vue from 'vue'

let filters = {
   timeFilter(stamp,reg = "yyyy-MM-dd"){
        let format = window.Bee.DateUtils.formt;
        stamp = Number(stamp);
        if(!stamp){
            stamp = 0;
        }
        return format(stamp,reg);
    },
    /**
     * @2019/4/21
     * @author: hm
     * desc: 保留多为小数,默认两位,也可以传一个参数保留多为
     */
    transNumber: function (value,decimalPrecision = 2) {
      if (!value || !Number(value)){
          value = 0;
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
      let result = '', counter = 0;
      num = (num || 0).toString();
      for (let i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { result = ',' + result; }
      }
      return result;
    }


}

//因为 在vue对象中定义成 属性的话其子组件没法用，故而在此定义成全局的filter

for(let i in filters){
    Vue.filter(i,filters[i]);
}

