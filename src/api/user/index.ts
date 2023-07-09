//用于管理项目用户相关接口

//引入axios实例
import instance from '@/utils/axios.ts'

import { loginForm, loginResponseData, logoutResponseData, userInfoResponseData } from '@/api/user/typs.ts'

enum API {
    LOGIN_URL = '/user/login',//用户登录路径
    LOGOUT_URL = '/user/logout',//用户退出登录路径
    USERINFO_URL = '/user/info',//用户信息路径
}

//暴露接口

//用户登录请求接口
export const reqLogin = (data: loginForm) => instance.post<any, loginResponseData>(API.LOGIN_URL, data, { headers: { 'content-Type': 'application/json; charset=utf-8' } })

//用户退出登录请求接口
export const reqLogout = () => instance.get<any, logoutResponseData>(API.LOGOUT_URL);
//用户信息请求接口
export const reqUserInfo = () => instance.get<any, userInfoResponseData>(API.USERINFO_URL)
