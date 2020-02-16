import Layout from '@/views/layout'

export default [{
    path: '',
    component: Layout,
    name: 'SystemResource',
    meta: {
        title: '系统资源',
        icon: 'globe'
    },
    children: [{
            path: '/system-resource/system-menu',
            component: () =>
                import ('@/views/system-resource/system-menu/index.vue'),
            name: 'SystemMenu',
            meta: {
                title: '菜单管理',
                icon: 'bars'
            },
            children: [{
                path: '/system-resource/system-menu/system-menusub',
                component: () =>
                    import ('@/views/system-resource/system-menu/system-menusub/index.vue'),
                name: 'SystemMenuSub',
                meta: {
                    title: '菜单管理1',
                    icon: 'bars'
                }
            }, {
                path: '/system-resource/system-menu/system-menusub2',
                component: () =>
                    import ('@/views/system-resource/system-menu/system-menusub2/index.vue'),
                name: 'SystemMenuSub2',
                meta: {
                    title: '菜单管理2',
                    icon: 'bars'
                }
            }]
        },
        {
            path: '/system-resource/system-dic',
            component: () =>
                import ('@/views/system-resource/system-dic'),
            name: 'SystemDic',
            meta: {
                title: '字典码表',
                icon: 'book'
            }
        }
    ]
}, {
    path: '/auth-manage',
    component: Layout,
    name: 'AuthManage',
    meta: {
        title: '权限管理',
        icon: 'gears'
    },
    children: [{
            path: 'system-user',
            component: () =>
                import ('@/views/system-auth/system-user'),
            name: 'SystemUser',
            meta: {
                title: '用户管理',
                icon: 'group'
            }
        },
        {
            path: 'system-role',
            component: () =>
                import ('@/views/system-auth/system-role'),
            name: 'SystemRole',
            meta: {
                title: '角色管理',
                icon: 'user-plus'
            }
        },
        {
            path: 'system-auth',
            component: () =>
                import ('@/views/system-auth/system-auth'),
            name: 'SystemAuth',
            meta: {
                title: '授权管理',
                icon: 'plus-square'
            }
        }
    ]
}, {
    path: '/org-manage',
    component: Layout,
    name: 'OrgManage',
    meta: {
        title: '组织机构',
        icon: 'site-map'
    },
    children: [{
        path: 'system-org',
        component: () =>
            import ('@/views/system-org/system-org'),
        name: 'SystemOrg',
        meta: {
            title: '机构管理',
            icon: 'pie-chart'
        }
    }]
}]