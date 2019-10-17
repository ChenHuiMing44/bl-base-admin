/* eslint-disable no-empty-label,no-mixed-spaces-and-tabs */
import {
  theme,
  sideWidth,
  appName,
  sideCloseWidth,
  appTitle
} from '../../config/config'

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    theme: theme,
    sideWidth,
    appName,
    appTitle,
    sideCloseWidth
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  },
  getters: {
    sidebarOpen: function(state) {
      return state.sidebar.opened
    },
    appTitle(state) {
      return state.appTitle
    }
  }
}

export default app
