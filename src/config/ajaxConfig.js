/* eslint-disable no-empty-label */

export default {
  simpleAjaxErr: {
    paramsErr: 'paramsErr',
    businessErr: 'businessErr',
    other: 'other',
    timeout: 'timeout'
  },
  methods: {
    get: 'GET',
    post: 'POST',
    catch: 'CATCH',
    put: 'PUT'
  },
  contentTypes: {
    www: 'application/x-www-form-urlencoded;charset=utf-8',
    json: 'application/json;charset=utf-8',
    form: 'multipart/form-data'
  },

  limitTimeout: 15000,

  retCodes: {
    success: '0000',
    invalid: '10002'
  }
}
