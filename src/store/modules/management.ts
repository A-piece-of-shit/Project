import { defineStore } from 'pinia';

//引入属性管理数据请求接口
import { reqPrimaryClassificationAttr, reqSecondaryClassificationAttr, reqThreelevelClassificationAttr } from '@/api/product/attr/index.ts';

//引入属性管理数据类型接口
// import { reqPrimaryClassificationAttr } from '@/api/product/attr/index.ts';

//引入仓库数据类型接口
import type { ManagementState } from '@/store/modules/types/type.ts'


const useManagementStore = defineStore('Management', {
    state: (): ManagementState => ({
        //一级分类id
        classification1Id: '',
        //一级分类数据
        classification1Data: [],

        //二级分类id
        classification2Id: '',
        //二级分类数据
        classification2Data: [],

        //三级分类id
        classification3Id: '',
        //三级分类数据
        classification3Data: [],


        isAddOrEditClassificationData: ''
        /*
            为空：用于组件展示数据
            为attr：用于组件 Attr 是否展示添加or编辑属性管理数据
            为spu：用于组件 Spu 是否展示添加or编辑spu管理数据
            为sku：用于组件 Sku 是否展示添加or编辑spu管理数据
        */


    }),
    actions: {

        //请求一级分类数据请求
        async getPrimaryClassification() {
            const result = await reqPrimaryClassificationAttr();
            if (result.code === 200) {
                this.classification1Data = result.data;
            }
        },

        //请求二级分类数据请求
        async getSecondaryClassification() {
            const result = await reqSecondaryClassificationAttr(this.classification1Id as number);
            if (result.code === 200) {
                this.classification2Data = result.data;
            }
        },

        //请求三级分类数据请求
        async getThreelevelClassification() {
            const result = await reqThreelevelClassificationAttr(this.classification2Id as number);
            if (result.code === 200) {
                this.classification3Data = result.data;
            }
        }



    },
    getters: {}
});

export default useManagementStore;