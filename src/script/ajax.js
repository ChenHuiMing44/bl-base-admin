/**
 * @2019-07-22
 * @author: huimingchen
 * desc: 全军请求接口，我还是觉得 ajax 好听一点
 */
import axios from 'axios'
import {
  // TEST_URL,
  xhrDefaultType,
  aesSwitch,
  mockUrl,
  defaultMethods,
  xhrLimitTimeout,
  successResCode
} from '../config/config'
import { encrypt } from './aesEncryption'
import Env from './../utils/env'
/**
 * @2019-07-22
 * @author: huimingchen
 * desc: 第一个是api
 */

export default (params) =>
  new Promise((resolve, reject) => {
    let timeout = params.timeout || xhrLimitTimeout
    Promise.race([
      axios({
        url: params.url,
        method: params.method || defaultMethods,
        params: params.data,
        headers: {
          'Content-type': params.contentType || xhrDefaultType,
          token: params.token
        }
      }),
      new Promise((resolve1, reject1) => {
        setTimeout(() => {
          reject1('timeout')
        }, timeout)
      })
    ])
      .then((res) => {
        typeof params.willEnd === 'function' && params.willEnd(res.data)
        //这个地方判断其code的正确性
        !res.data && (res.data = {})
        if (res.data.retCode === successResCode) {
          //如果需要携带message信息，则将返回对象直接出去，否则抛出去的是其data属性
          resolve(params.withMessage ? res.data : res.data.ret)
        } else {
          reject({
            errMsg: res.data.retMsg || '呀，系统开了点小差',
            errCode: res.data.retCode,
            errData: res.data.ret,
            err: res
            // errType:  暂时不定义
          })
        }
      })
      .catch((err) => {
        typeof params.willEnd === 'function' && params.willEnd(err)
        const errMsg = err === 'timeout' ? '请求超时' : '呀，系统开了点小差'
        reject({ err, errMsg })
      })
  })

axios.interceptors.request.use((config) => {
  if (Env.isMock()) {
    config.baseURL = mockUrl
  } else if (Env.isDev()) {
    config.baseURL = '/api'
  } else {
    config.baseURL = '/api'
  }
  // config.baseURL = TEST_URL
  //如果开启了加解密
  if (aesSwitch) {
    config.params = encrypt(config.params)
  }
  return config
})
