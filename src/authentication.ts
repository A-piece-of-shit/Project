//对路由的权限进行限制，并作出其他的处理

//引入路由器
import router from '@/router/index.ts';

//引入仓库
import pinia from '@/store/index.ts'
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore(pinia);

//引入token工具
import { REMOVE_TOKEN } from '@/utils/token.ts';

//引入进度条及样式


// import * as NProgress from 'nprogress'

// import 'nprogress/nprogress.css';



//全局前置守卫
router.beforeEach(async (to, from, next) => {

    // console.log(to);
    // console.log(from);
    //进度条开始
    // NProgress.start();

    if (userStore.token) {
        //允许访问除login之外的全部路由
        if (to.path === '/login') next({ path: from.path });
        else {

            if (userStore.userName) next();
            else {
                try {
                    await userStore.userInfo();
                    next({ ...to, replace: true });
                }
                catch (err) {
                    REMOVE_TOKEN();
                }
            }
        }

    } else {
        //只允许访问login路由
        if (to.path === '/login') next();
        else next({ path: '/login' });
    }


});

//全局后置守卫
router.afterEach((to) => {
    document.title = to.meta.title as string;

    //进度条结束
    // NProgress.done();
});