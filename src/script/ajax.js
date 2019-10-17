/* eslint-disable no-empty-label */
//simple Ajax
import axios from 'axios'
import Utils from './../utils'
import { baseUrl, aesSwitch } from './../config/config'
import { decrypt, encrypt } from './aesEncryption'
import store from './../store'
import AJAX_CONFIG from './../config/ajaxConfig'
import { Message } from 'element-ui'

const ErrorType = AJAX_CONFIG.simpleAjaxErr
//除了 0000 以外 其他都是reject 然后 错误类型 和错误信息
export default function(ajaxParams) {
  return new Promise((resolve, reject) => {
    if (typeof ajaxParams !== 'object') {
      reject({ type: ErrorType.paramsErr })
    }
    ajaxParams.url = ajaxParams.url || ajaxParams.urlInfo.url
    ajaxParams.method = ajaxParams.method || ajaxParams.urlInfo.method
    const {
      url,
      method,
      data,
      willEnd,
      noneToast,
      contentType,
      timeout
    } = ajaxParams

    if (typeof url !== 'string') {
      reject({ type: ErrorType.paramsErr })
    }
    let token = store.state.token
    console.log('请求参数————' + url)
    console.log(JSON.parse(JSON.stringify(data)))
    let params = aesSwitch ? { encryptContent: encrypt(data) } : data
    let promise = axios({
      url: baseUrl + url,
      method: method || AJAX_CONFIG.methods.get,
      timeout: timeout || AJAX_CONFIG.limitTimeout,
      headers: {
        'Content-type': contentType || AJAX_CONFIG.contentTypes.www,
        token: token
      },
      params: params
    })
    Promise.race([
      promise,
      new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject('timeout')
        }, timeout || AJAX_CONFIG.limitTimeout)
      })
    ])
      .then(function(res) {
        willEnd && willEnd(res)
        if (res.data.retCode === AJAX_CONFIG.retCodes.success) {
          //请求成功  判断是否加密
          if (aesSwitch) {
            let backParams = res.data.ret && decrypt(res.data.ret)
            res.data.ret = Utils.isJson(backParams)
              ? JSON.parse(backParams)
              : backParams
          }
          console.log('——————返回参数——————' + url)
          console.log(res.data.ret)
          res.ret = res.data.ret || {}
          resolve(res)
        } else if (res.date.retCode === AJAX_CONFIG.retCodes.invalid) {
          //通知token过期
          store.dispatch('InvalidToken')
          reject({ type: ErrorType.businessErr, err: res })
        } else {
          reject({ type: ErrorType.businessErr, err: res })
        }
      })
      .catch(function(err) {
        willEnd && willEnd(err)
        if (err && err.toString().search('timeout') !== -1) {
          !noneToast && Message('请求超时')
          reject({ type: ErrorType.timeout })
        } else {
          reject({ type: ErrorType.other, err: err })
        }
      })
  })
}
