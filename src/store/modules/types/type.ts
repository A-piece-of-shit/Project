import type { RouteRecordRaw } from 'vue-router'

//引入属性管理数据类型接口
import type { Classification } from '@/api/product/attr/type.ts'


//定义用户仓库数据类型
export interface UserState {
    token: string | null;
    menuRouters: RouteRecordRaw[],
    userName: string,
    useravatar: string,
    isDarkMode: string | null
}



//定义分类仓库数据类型
export interface ManagementState {
    classification1Id: number | string,
    classification1Data: Classification[],

    classification2Id: number | string,
    classification2Data: Classification[],

    classification3Id: number | string,
    classification3Data: Classification[],

    //是否展示添加or编辑管理数据
    isAddOrEditClassificationData: string
};