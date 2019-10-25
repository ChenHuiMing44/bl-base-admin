/**
 * @2019-07-22
 * @author: huimingchen
 * desc: 全军请求接口，我还是觉得 ajax 好听一点
 */
import axios from 'axios'
import md5 from 'js-md5'
import buffer from 'buffer'

import {
  xhrDefaultType,
  aesSwitch,
  defaultMethods,
  xhrLimitTimeout,
  successResCode
} from '../config/config'
import { encrypt } from './aesEncryption'
/**
 * @2019-07-22
 * @author: huimingchen
 * desc: 第一个是api
 */

function getSignAuth(config) {
  let defaultUrl = config.url
  let union = '&'
  let contentLength = -1
  let paramsStr = ''
  if (!config.method || config.method === defaultMethods) {
    let urlParamsStr = ''
    for (let i = 0; i < Object.keys(config.data || {}).length; i++) {
      let paramKey = Object.keys(config.data)[i]
      urlParamsStr +=
        (i === 0 ? '' : '&') + paramKey + '=' + config.data[paramKey]
    }
    paramsStr =
      Object.keys(config.data || {}).length !== 0 ? union + urlParamsStr : ''
  } else {
    if (config.data && Object.keys(config.data).length) {
      contentLength = buffer.Buffer.byteLength(
        JSON.stringify(config.data),
        'utf8'
      )
    } else {
      contentLength = 0
    }
  }

  let tempUrl = defaultUrl.toLocaleLowerCase() + paramsStr
  tempUrl = tempUrl.replace('?', '')
  let baseString = config.method.toLocaleUpperCase() + tempUrl + contentLength
  let token = localStorage.getItem('token')

  const auth = token + ' ' + md5(baseString + token)
  const sign = md5(baseString + 'bank.abc.imyxg')
  return { auth, sign }
}

export default (params) =>
  new Promise((resolve, reject) => {
    let timeout = params.timeout || xhrLimitTimeout
    const signAuth = getSignAuth(params)
    Promise.race([
      axios({
        url: params.url,
        method: params.method || defaultMethods,
        params: params.type !== 'body' && params.data,
        data: params.type !== 'query' && params.data,
        headers: {
          'Content-type': params.contentType || xhrDefaultType,
          token: localStorage.getItem('token'),
          auth: signAuth.auth,
          sign: signAuth.sign
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
        if (res.data.code === successResCode) {
          //如果需要携带message信息，则将返回对象直接出去，否则抛出去的是其data属性
          resolve(params.withMessage ? res.data : res.data.data)
        } else {
          reject({
            errMsg: res.data.msg || '呀，系统开了点小差',
            errCode: res.data.code,
            errData: res.data.data,
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
  config.baseURL = '/api'
  // config.baseURL = TEST_URL
  //如果开启了加解密
  if (aesSwitch) {
    config.params = encrypt(config.params)
  }
  return config
})
