//导出配置路由

//静态路由：所有用户下的路由信息
export const constantRoute = [

    //初始路由，重定向到首页路由
    {
        path: '/',
        //重定向到/home路由
        redirect: '/home',
        meta: {
            hidden: true
        }
    },

    //登录路由
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        name: 'Login',
        meta: {
            hidden: true
        }
    },

    //404路由
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            hidden: true
        }
    },

    //首页路由
    {
        path: '/home',
        component: () => import('@/views/index.vue'),
        name: 'Home',
        redirect: 'home/index',
        children: [
            {
                path: '/index',
                component: () => import('@/views/home/index.vue'),
                name: 'Index',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'home'

                }
            },
        ],
        meta: {
            hidden: true
        }
    },

    //我的路由
    // {
    //     path: '/mine',
    //     component: () => import('@/views/mine/index.vue'),
    //     name: 'Mine',
    //     meta: {
    //         title: '个人中心',
    //         hidden: false
    //     }
    // },

    //数据大屏路由
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'commoditymanagement-screen-screen'
        }
    }

];


//动态路由：权限下用户下的路由信息
export const permissionsRoutes = [

    //权限管理路由
    {
        path: '/acl',
        component: () => import('@/views/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'commoditymanagement-permissions-permissions'
        },
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/User.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'commoditymanagement-user-user'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/Role.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    icon: 'commoditymanagement-position-position'
                }
            }
            // {
            //     path: '/acl/permission',
            //     component: () => import('@/views/acl/Permission.vue'),
            //     name: 'Permission',
            //     meta: {
            //         title: '菜单管理'
            //     }
            // },
        ]
    },

    //商品管理路由
    {
        path: '/product',
        component: () => import('@/views/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'commoditymanagement-commodity-commodity'
        },
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/Trademark.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'commoditymanagement-brand-brandicon'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/Attr.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'commoditymanagement-attr-attr'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/Spu.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    icon: 'commoditymanagement-spu-spu'

                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/Sku.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'commoditymanagement-sku-sku'

                }
            },
        ]
    }

]


//捕获路由：限制权限外的路由信息
export const captureRoutes = [

    //违规路由
    {
        //匹配违规路径，重定向到404路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            hidden: true
        }
    }

];
