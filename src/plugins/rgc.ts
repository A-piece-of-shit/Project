// 用于注册全局组件的插件

//全局svg
import Svg from '@/components/Svg.vue'

//全局svg
import Classification from '@/components/Classification.vue'

const globalComponent: any = { Svg, Classification };

export default {
    install(app: any) {
        Object.keys(globalComponent).forEach(key => {
            app.component(key, globalComponent[key]);
        });
    }
};