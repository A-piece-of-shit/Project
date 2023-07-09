import { createApp } from 'vue'
import App from './App.vue'

// svg注册脚本
import 'virtual:svg-icons-register'

// 清除默认样式
import '@/style/reset.scss'

// 引入animate动画
import 'animate.css';






const app = createApp(App);


// 引入注册全局组件插件
import registeringGlobalComponents from '@/plugins/rgc.ts'
// 应用注册全局组件插件
app.use(registeringGlobalComponents)


// import ElementPlus from 'element-plus'
import ElementPlus from 'element-plus'
// 引入element样式
import 'element-plus/dist/index.css'
// 引入element暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'

//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

app.use(ElementPlus, {
    locale: zhCn,
})


// 引入pinia仓库
import pinia from '@/store/index.ts'
// 应用pinia仓库
app.use(pinia)


// 引入路由
import router from '@/router/index.ts'
// 引入路由鉴权
import '@/authentication.ts';
// 应用路由
app.use(router);





app.mount('#app')