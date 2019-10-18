//用户获取routes路由
const Permits = {
  admin: 'admin',
  editor: 'editor',
  add: 'add'
}
/**
 * 获取用户路由
 *
 * @url /user/routes
 */
module.exports = {
  retCode: '0000',
  retMsg: '这个接口请求也成功了！！！！！',
  ret: {
    role: {
      name: '大角色',
      val: 'manager'
    },
    userInfo: {
      name: '李大爷',
      avatar: ''
    },
    routes: [
      {
        path: '/user',
        component: 'Layout',
        menuName: '用户管理',
        meta: {
          icon: 'icon-user',
          roles: [Permits.admin, Permits.add]
        },
        children: [
          {
            path: 'index',
            component: 'User',
            menuName: '用户编辑',
            meta: {
              title: '编辑用户',
              roles: [Permits.editor, Permits.admin]
            }
          },
          {
            path: 'admin',
            menuName: '用户admin',
            component: 'UserAdmin',
            meta: {
              title: 'admin用户',
              roles: [Permits.admin]
            }
          }
        ]
      },
      {
        path: '/admin',
        component: 'Layout',
        menuName: 'Admin',
        redirect: '/admin/index',
        meta: {
          icon: 'icon-power',
          roles: [Permits.admin]
        },
        children: [
          {
            path: 'index',
            component: 'Admin',
            menuName: '超级管理员',
            meta: {
              title: 'admin',
              roles: [Permits.editor, Permits.admin]
            }
          }
        ]
      },
      {
        path: '/common',
        component: 'Layout',
        menuName: '通用',
        meta: {
          icon: 'icon-set',
          title: 'common'
          // roles: [Permits.admin]
        },
        children: [
          {
            path: '1',
            component: 'Common1',
            menuName: '通用1'
          },
          {
            path: '2',
            component: 'Common2',
            menuName: '通用2'
          }
        ]
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}
