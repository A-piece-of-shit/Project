<template>
    <div>
        <!-- 全局组件：管理 -->
        <Classification :administrativeName="administrativeName" @addSpu="addSpu" />

        <el-card shadow="always">

            <!-- 展示已有的spu -->
            <div v-show="ManagementStore.isAddOrEditClassificationData === '' ? true : false">
                <el-table stripe style="width: 100%" :data="spuData">
                    <el-table-column type="index" label="序号" width="80" center />
                    <el-table-column prop="spuName" label="SPU名称" width="100" />
                    <el-table-column label="SPU描述">
                        <template #="{ row }">
                            <p>{{ row.description }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作" width="220">
                        <template #="{ row }">
                            <el-button type="primary" size="small" title="添加SKU" plain @click="addSku(row)">
                                <Svg name="commoditymanagement-spu-add"></Svg>
                            </el-button>
                            <el-button type="primary" size="small" title="修改SPU" plain @click="editSpu(row)">
                                <Svg name="commoditymanagement-spu-modification"></Svg>
                            </el-button>
                            <el-button type="primary" size="small" title="查看SPU" plain @click="getSKU(row)">
                                <Svg name="commoditymanagement-spu-view"></Svg>
                            </el-button>

                            <el-popconfirm :title="`您确定要删除${row.spuName}吗？`" width="300px"
                                @confirm="confirmDeletionSpu(row)">
                                <template #reference>
                                    <el-button type="primary" size="small" title="删除SPU" plain>
                                        <Svg name="commoditymanagement-spu-delete"></Svg>
                                    </el-button>
                                </template>
                            </el-popconfirm>

                        </template>
                    </el-table-column>


                    <template #empty="">
                        <Svg name="commoditymanagement-attr-nodataavailable" width="100%" height="100%"></Svg>
                        暂无数据
                    </template>
                </el-table>

                <el-pagination v-model:current-page="currentPageCount" @update:current-page="currentPageCountChange"
                    v-model:page-size="currentPageCountNumberOfDisplays"
                    @update:page-size="currentPageCountNumberOfDisplaysChange" :page-sizes="[3, 5, 7, 9]" background
                    layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
            </div>

            <!-- 展示对spu的添加与修改 -->
            <EditSpu ref="editSpuComponentInstance"
                v-show="ManagementStore.isAddOrEditClassificationData === 'spu' ? true : false"
                @administrativeNameChange="administrativeNameChange">
            </EditSpu>

            <!-- 展示对sku的添加与修改 -->
            <EditSku ref="editSkuComponentInstance"
                v-show="ManagementStore.isAddOrEditClassificationData === 'sku' ? true : false"
                @administrativeNameChange="administrativeNameChange">
            </EditSku>


            <!-- 展示查看当前spu下sku -->
            <el-drawer v-model="drawer" title="SKU列表" with-header direction="ltr" size="50%">
                <el-table border :data="sku">
                    <el-table-column label="SKU名称" prop="skuName" />
                    <el-table-column label="SKU价格" prop="skuPrice" />
                    <el-table-column label="SKU重量" prop="skuWeight" />
                    <el-table-column label="SKU图片">
                        <template #="{ row }">
                            <img :src="row.skuImgUrl" alt="SKU图片">
                        </template>
                    </el-table-column>

                </el-table>
            </el-drawer>

        </el-card>

    </div>
</template>

<script setup lang="ts">

import { ref, watch, onBeforeUnmount } from 'vue';

//引入用于项目商品管理下spu管理相关接口
import { reqGetAnExistingSpu, reqSkuInfo, reqDeleteSpu } from '@/api/product/spu/index.ts'

//引入spu管理接口数据的类型
import type { Records, spuData, addSkuData } from '@/api/product/spu/type.ts'


//引入管理相关的小仓库
import useManagementStore from '@/store/modules/management.ts'
//加载管理仓库
const ManagementStore = useManagementStore();

//引入子组件
import EditSpu from '@/views/product/spu/EditSpu.vue'
import EditSku from '@/views/product/spu/EditSku.vue'
import { ElMessage } from 'element-plus';


//清空管理仓库数据
onBeforeUnmount(() => {
    ManagementStore.$reset();
});




//
watch(() => ManagementStore.classification3Id, (newValue) => {

    if (typeof newValue === 'number') {
        getSpuData();
    };
});

//获取spu数据
const getSpuData = async (page = 1) => {
    currentPageCount.value = page;
    const result = await reqGetAnExistingSpu(currentPageCount.value, currentPageCountNumberOfDisplays.value, ManagementStore.classification3Id as number);

    if (result.code === 200) {
        // console.log(result);
        spuData.value = result.data.records;
        total.value = result.data.total;
    };


};




//分页器当前页数
const currentPageCount = ref(1);
//分页器当前页数改变
const currentPageCountChange = (newCurrentPageCount: any) => {
    getSpuData(newCurrentPageCount);
};

//分页器每页显示条目个数
const currentPageCountNumberOfDisplays = ref(3);
//分页器每页显示条目个数改变
const currentPageCountNumberOfDisplaysChange = () => {
    getSpuData();
};

//分页器数据总数
const total = ref<number>(0);

//spu数据
const spuData = ref<Records>([]);

//定义用来确定显示何种新增编辑管理
const administrativeName = ref('spu');

const administrativeNameChange = (newAdministrativeName: string, operationFlag: string) => {
    ManagementStore.isAddOrEditClassificationData = newAdministrativeName;
    // console.log(administrativeName.value);

    //更新留在当前页面
    if (operationFlag === 'update') getSpuData(currentPageCount.value);

    else getSpuData();
};


//定义EditSpu组件实例
const editSpuComponentInstance = ref();
//定义EditSku组件实例
const editSkuComponentInstance = ref();


//修改spu按钮点击事件
const editSpu = (row: any) => {
    //展示修改spu
    ManagementStore.isAddOrEditClassificationData = 'spu';

    //初始化当前spu的数据
    editSpuComponentInstance.value.initUpdateSpuData(row);
};


//自定义事件回调：添加spu
const addSpu = () => {
    //初始化当前spu的数据
    editSpuComponentInstance.value.initAddSpuData(ManagementStore.classification3Id);
};



//添加sku按钮点击事件
const addSku = (row: any) => {
    //展示修改sku
    ManagementStore.isAddOrEditClassificationData = 'sku';

    //初始化添加sku数据
    editSkuComponentInstance.value.initAddSkuData(ManagementStore.classification1Id, ManagementStore.classification2Id, row);
};

//定义当前spu下sku数据
const sku = ref<addSkuData[]>([]);




//查看sku按钮点击事件
const getSKU = async (row: spuData) => {
    const result = await reqSkuInfo(row.id as number);
    if (result.code === 200) {
        sku.value = result.data;
        drawer.value = true;
    }
};


//确认删除spu按钮回调
const confirmDeletionSpu = async (row: spuData) => {
    const result = await reqDeleteSpu(row.id as number);
    if (result.code === 200) {
        ElMessage({ type: 'success', message: '删除成功' });

        getSpuData(spuData.value.length > 1 ? currentPageCount.value : currentPageCount.value - 1);
    } else {
        ElMessage({ type: 'warning', message: '删除失败' });

    };
};

//定义是否显示抽屉
const drawer = ref<boolean>(false);

</script>

<style scoped lang="scss"></style>