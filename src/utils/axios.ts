import axios from 'axios';

//
import { GET_TOKEN } from '@/utils/token.ts'

// 创建axios实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVE,
    timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么


    //每次请求添加token
    config.headers.token = GET_TOKEN();

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    // 直接返回响应数据
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;