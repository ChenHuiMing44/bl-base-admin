import { XhrMethods as xhr } from './enums'

export const user = {
  login: {
    method: xhr.post,
    url: '/user/login'
  },
  routes: {
    method: xhr.post,
    url: '/user/routes'
  }
}
