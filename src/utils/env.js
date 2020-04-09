/**
 * @2019-07-22
 * @author: huimingchen
 * desc: 判断当前代码环境
 */
export default {
  isPro() {
    //怕配错，就判断不是测试且不是开发
    return process.env.EVN_CONFIG !== 'test' && process.env.EVN_CONFIG !== 'dev'
  },
  isDev() {
    return process.env.EVN_CONFIG === 'dev'
  },
  isTest() {
    return process.env.EVN_CONFIG === 'test'
  },
  //当前请求是否为模拟请求
  isMock() {
    return process.env.EVN_CONFIG === 'dev' && process.env.MOCK
  }
}
