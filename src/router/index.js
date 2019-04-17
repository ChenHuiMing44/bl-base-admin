/* eslint-disable no-empty-label,no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
	    component: Layout
    }
  ]
})
