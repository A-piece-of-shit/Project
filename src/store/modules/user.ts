import { defineStore } from 'pinia';

//引入数据类型接口
import type { loginForm, loginResponseData, userInfoResponseData, logoutResponseData } from '@/api/user/typs.ts'

//引入请求接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user/index.ts'

//引入用户仓库数据类型
import { UserState } from '@/store/modules/types/type.ts'

//引入token工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN, GET_THEME, REMOVE_THEME } from '@/utils/token.ts';

//引入路由
import { constantRoute, permissionsRoutes, captureRoutes } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'

//引入路由
import router from '@/router/index.ts'





function deepClone(value: any) {//深克隆
    if (typeof value === 'function' || typeof value === 'object' || value === null) return value;
    const result: any = Array.isArray(value) ? [] : {};
    for (const key in value) {
        result[key] = deepClone(value[key]);
    };
    return result;
}



/*
根据用户已有权限对动态路由过滤
接受参数：1.需要过滤的动态路由数组（必须，类型为 RouteRecordRaw[] ）
         2.后端返回用户已有权限的数组（必须，类型暂定为为 string[] ）
返回值：过滤后的动态路由
*/
function filterRoutes(routes: RouteRecordRaw[], permissionsList: string[]) {//过滤路由函数
    return routes.filter((item: RouteRecordRaw) => {
        // console.log(item);
        if (permissionsList.includes(item.meta?.title as string)) {
            if (item.children && item.children.length > 0) {

                item.children = filterRoutes(item.children, permissionsList);
            };
            return true;
        };
    });
};





const useUserStore = defineStore('User', {
    // state: (): UserState => ({ token: localStorage.getItem('TOKEN') }),
    state: (): UserState => ({
        token: GET_TOKEN(),
        menuRouters: (constantRoute as RouteRecordRaw[]),
        userName: '',
        useravatar: '',
        isDarkMode: GET_THEME()
    }),
    //计算属性
    getters: {
    },
    actions: {
        //登录
        async userLogin(data: loginForm) {
            const result: loginResponseData = await reqLogin(data);
            if (result.code === 200) {
                this.token = result.data;


                SET_TOKEN(result.data);
                return '成功';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },

        //退出登录
        async userLogout() {
            const result: logoutResponseData = await reqLogout();
            if (result.code === 200) {
                //清空仓库中用户数据
                this.token = '';
                this.userName = '';
                this.useravatar = '';
                REMOVE_TOKEN();

                REMOVE_THEME();
                return '成功'
            } else {
                return Promise.reject(new Error(result.message));
            }

        },

        //获取用户信息
        async userInfo() {

            const { code, message, data: { username, useravatar, userRightsList } }: userInfoResponseData = await reqUserInfo();
            if (code === 200) {
                this.userName = username;
                this.useravatar = useravatar;


                const filteredDynamicRoutes = filterRoutes(deepClone(permissionsRoutes), userRightsList);

                this.menuRouters = [...constantRoute, ...filteredDynamicRoutes, ...captureRoutes];


                //注册动态路由
                ([...filteredDynamicRoutes, ...captureRoutes] as RouteRecordRaw[]).forEach((item: RouteRecordRaw) => {
                    router.addRoute(item)
                });


                return '成功'
            } else {
                return Promise.reject(new Error(message));
            }

        }
    }
});

export default useUserStore