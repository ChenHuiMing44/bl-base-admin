/* eslint-disable no-empty-label */
import User from './../views/user/User'
import UserAdmin from './../views/user/UserAdmin'
import * as Permits from './../config/permits'
import Layout from './../views/layout/Layout'
import Admin from './../views/admin/index'
import Common1 from './../views/common/Common1'
import Common2 from './../views/common/Common2'

/**
 * @2019/4/18
 * @author: huiming
 * desc:  这里面是默认所有权限都有的路由 依次介绍一下所有的属性 path name component不介绍了
 * 加这些额外的参数主要还是给左侧的sidebar用的
 * 1. hidden 表示不将该路由加载到左侧的栏
 * 2. name 正常来说没有hidden属性必须要有name属性，这个是左侧栏的的名字
 * 3. alwaysShow， 如果设置了这个属性，不管其子路由有没有，这一栏都会显示（用处不大，建议别设置）
 * 4. mate: {
        roles: ["admin", "editor"]  访问权限
        title: 将改变网页的title，不设置默认为项目名
        icon： iconfont图标  建议所有一级设置，二级不要设置
      }
 */

export default [
  {
    path: '/user',
    component: Layout,
    menuName: '用户管理',
    meta: {
      icon: 'icon-user',
      roles: [Permits.admin, Permits.editor]
    },
    children: [
      {
        path: 'index',
        component: User,
        name: 'User',
        menuName: '用户编辑',
        meta: {
          title: '编辑用户',
          roles: [Permits.editor, Permits.admin]
        }
      },
      {
        path: 'admin',
        name: 'UserAdmin',
        menuName: '用户admin',
        component: UserAdmin,
        meta: {
          title: 'admin用户',
          roles: [Permits.admin]
        }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    menuName: 'Admin',
    redirect: '/admin/index',
    meta: {
      icon: 'icon-power',
      roles: [Permits.admin]
    },
    children: [
      {
        path: 'index',
        component: Admin,
        menuName: '超级管理员',
        name: 'Admin',
        meta: {
          title: 'admin',
          roles: [Permits.editor, Permits.admin]
        }
      }
    ]
  },
  {
    path: '/common',
    component: Layout,
    menuName: '通用',
    meta: {
      icon: 'icon-set',
      title: 'common'
      // roles: [Permits.admin]
    },
    children: [
      {
        path: '1',
        component: Common1,
        menuName: '通用',
        name: 'Common1'
      },
      {
        path: '2',
        component: Common2,
        menuName: '通用2',
        name: 'Common2'
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
