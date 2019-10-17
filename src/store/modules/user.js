/* eslint-disable no-empty-label */
import router from './../../router'
import { getToken } from '../../utils/auth'
import ajax from './../../script/ajax'
import { GetUserInfo } from '../../config/requireUrls'

export default {
  state: {
    token: getToken(),
    roles: [],
    name: '',
    avatar: ''
  },

  getters: {
    token: (state) => {
      return state.token
    },
    roles: (state) => {
      return state.roles
    },
    avatar: (state) => {
      return state.avatar
    },
    username: (state) => {
      return state.name
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    LogBackByToken: function(store, token) {
      store.getters.storage.setItem('token', token)
      store.commit('SET_TOKEN', token)
    },
    RequireUserInfo({ commit, getters }) {
      // return new Promise((resolve, reject) => {
      // 	ajax({urlInfo: GetUserInfo}).then(res => {
      // 		if (res.ret.roles && res.ret.roles.length > 0) { // 验证返回的roles是否是一个非空数组
      // 			commit('SET_ROLES', res.ret.roles)
      // 		} else {
      // 			reject('getInfo: roles must be a non-null array!')
      // 		}
      // 		commit('SET_NAME', res.ret.name)
      // 		commit('SET_AVATAR', res.ret.avatar)
      // 		resolve(res.ret);
      // 	}).catch(err => {
      // 		reject(err)
      // 	})
      // })
      //模拟
      return new Promise((resolve) => {
        let role = getters.token === 'admin' ? 'ADMIN' : 'EDITOR'
        setTimeout(() => {
          commit('SET_NAME', '陈惠敏')
          commit('SET_AVATAR', '')
          commit('SET_ROLES', [role])
          resolve({
            name: '陈惠敏',
            roles: [role],
            avatar: ''
          })
        })
      }, 500)
    },

    /**
     * @2019/4/18
     * @author: huiming
     * desc:  初始化的时候调用，因为我们有的时候如刷新页面并不可能需要重新登录，
     * 从缓存中读出数据，然后相当于直接登录成功（判断数据有效）
     */
    InvalidToken: function(store) {
      //token过期 清除用户信息进入 login
      store.commit('SET_TOKEN', '')
      store.getters.storage.removeItem('token')
      // router.replace("/login");
      location.reload()
    }
  }
}
