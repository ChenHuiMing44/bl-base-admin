//用户获取routes路由

// let s = {
//   code: 0,
//   data: {
//     result: [
//       {
//         children: [
//           {
//             children: [
//               {
//                 root: {
//                   permission: 'add',
//                   type: 1
//                 }
//               },
//               {
//                 root: {
//                   permission: 'delete',
//                   type: 1
//                 }
//               }
//             ],
//             root: {
//               component: 'SystemMenu',
//               menuName: '菜单配置',
//               path: 'menu',
//               menuId: 2,
//               type: 0 //0:菜单 1按钮 2.页面
//             }
//           },
//           {
//             children: [
//               {
//                 root: {
//                   permission: 'add',
//                   type: 1
//                 }
//               },
//               {
//                 root: {
//                   permission: 'delete',
//                   type: 1
//                 }
//               }
//             ],
//             root: {
//               component: 'PageEdit',
//               menuName: '页面配置',
//               path: 'page_edit',
//               type: 0,
//               menuId: 4
//             }
//           }
//         ],
//         root: {
//           component: 'Layout',
//           menuName: '系统配置',
//           menuId: 3,
//           metaInfo: '{"icon":""}',
//           path: '/system',
//           type: 0
//         }
//       },
//       {
//         root: {
//           component: 'Layout',
//           menuName: '角色管理',
//           metaInfo: null,
//           menuId: 6,
//           path: '/role',
//           type: 0
//         },
//         children: [
//           {
//             root: {
//               component: 'User',
//               menuName: '角色配置',
//               metaInfo: null,
//               menuId: 8,
//               path: 'index',
//               meta: '{}',
//               type: 0
//             }
//           }
//         ]
//       },
//       {
//         root: {
//           component: 'Layout',
//           menuName: '用户管理',
//           metaInfo: '{"icon": "icon-user"}',
//           menuId: 9,
//           path: '/user',
//           type: 0
//         },
//         children: [
//           {
//             root: {
//               component: 'User',
//               menuName: '角色配置',
//               metaInfo: null,
//               menuId: 12,
//               path: 'user_role',
//               meta: '',
//               type: 0
//             }
//           }
//         ]
//       }
//     ],
//     total: 2
//   },
//   msg: '操作成功'
// }
/**
 * 获取用户路由
 *
 * @url /permission/menu/tree
 */
module.exports = {
  code: 0,
  data: {
    result: [
      {
        children: [
          {
            children: [
              {
                root: {
                  permission: 'add',
                  createTime: '1571760114000',
                  modifyTime: '1571760119000',
                  type: 1,
                  menuId: 25,
                  parentId: 2
                }
              },
              {
                root: {
                  permission: 'delete',
                  createTime: '1571760114000',
                  modifyTime: '1571760119000',
                  type: 1,
                  menuId: 23,
                  parentId: 2
                }
              }
            ],
            root: {
              component: 'Menu',
              menuName: '菜单配置',
              path: 'menu',
              menuId: 2,
              orderField: 1,
              parentId: 3,
              permission: null,
              createTime: '1571760114000',
              modifyTime: '1571760119000',
              type: 0 //0:菜单 1按钮 2.页面
            }
          },
          {
            children: [
              {
                root: {
                  permission: 'add',
                  createTime: '1571760114000',
                  modifyTime: '1571760119000',
                  type: 1,
                  menuId: 21,
                  parentId: 4
                }
              },
              {
                root: {
                  permission: 'view',
                  createTime: '1571760114000',
                  modifyTime: '1571760119000',
                  type: 1,
                  menuId: 20,
                  parentId: 4
                }
              }
            ],
            root: {
              component: 'PageEdit',
              menuName: '页面配置',
              path: 'page_edit',
              type: 0,
              orderField: 1,
              parentId: 3,
              permission: null,
              createTime: '1571760114000',
              modifyTime: '1571760119000',
              menuId: 4
            }
          }
        ],
        root: {
          component: 'Layout',
          menuName: '系统管理',
          menuId: 3,
          metaInfo: '{"icon":"icon-power"}',
          path: '/system',
          orderField: 1,
          parentId: 0,
          permission: null,
          createTime: '1571760114000',
          modifyTime: '1571760119000',
          type: 0
        }
      },
      {
        root: {
          component: 'Layout',
          menuName: '角色管理',
          menuId: 6,
          metaInfo: '{"icon":"icon-power"}',
          path: '/role',
          orderField: 1,
          parentId: 0,
          permission: null,
          createTime: '1571760114000',
          modifyTime: '1571760119000',
          type: 0
        },
        children: [
          {
            root: {
              component: 'Role',
              menuName: '角色配置',
              metaInfo: null,
              menuId: 8,
              orderField: 1,
              parentId: 6,
              permission: null,
              createTime: '1571760114000',
              modifyTime: '1571760119000',
              path: 'index',
              meta: '{}',
              type: 0
            }
          }
        ]
      },
      {
        root: {
          component: 'Layout',
          menuName: '用户管理',
          metaInfo: '{"icon": "icon-user"}',
          menuId: 9,
          orderField: 1,
          parentId: 0,
          permission: null,
          createTime: '1571760114000',
          modifyTime: '1571760119000',
          path: '/user',
          type: 0
        },
        children: [
          {
            root: {
              component: 'User',
              menuName: '角色配置',
              metaInfo: null,
              menuId: 12,
              path: 'user_role',
              meta: '',
              orderField: 1,
              parentId: 9,
              permission: null,
              createTime: '1571760114000',
              modifyTime: '1571760119000',
              type: 0
            }
          }
        ]
      }
    ],
    total: 2
  },
  msg: '操作成功'
}
