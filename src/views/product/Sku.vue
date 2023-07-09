<template>
    <el-card>

        <!-- 展示sku列表数据 -->
        <el-table border :data="skuData">

            <el-table-column type="index" label="序号" align="center" width="60" />
            <el-table-column label="名称" prop="skuName" width="100" />
            <el-table-column label="描述" prop="skuDesc" />

            <el-table-column label="图片">
                <template #="{ row }">
                    <img :src="serve + '/' + row.skuImgUrl" alt="sku图片" style="width: 100%;">
                </template>
            </el-table-column>

            <el-table-column label="重量" prop="skuWeight" width="80" />
            <el-table-column label="价格" prop="skuPrice" width="80" />
            <el-table-column label="操作" fixed="right" width="300">
                <template #="{ row }">

                    <Svg :name="`commoditymanagement-sku-${row.isListing ? 'delist' : 'listing'}`"
                        @click="skuListingOrDelist(row)" width="40" height="40"
                        style="vertical-align: middle; cursor: pointer;"></Svg>

                    <Svg name="commoditymanagement-sku-edit" @click="skuEdit" width="32" height="32"
                        style="vertical-align: middle; cursor: pointer;"></Svg>

                    <Svg name="commoditymanagement-sku-view" @click="skuView(row)" width="40" height="40"
                        style="vertical-align: middle; cursor: pointer;"></Svg>

                    <el-popconfirm :title="`您确定要删除${row.skuName}吗？`" @confirm="skuDelete(row.id)" :width="200">
                        <template #reference>
                            <Svg name="commoditymanagement-sku-delete" width="40" height="40"
                                style="vertical-align: middle; cursor: pointer;"></Svg>
                        </template>
                    </el-popconfirm>

                </template>

            </el-table-column>

        </el-table>

        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" @update:current-page="currentPageChange"
            @update:page-size="pageSizeChange" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" style="margin-top: 20px;" />


        <!-- 展示查看sku详细信息 -->
        <el-drawer v-model="drawer" direction="btt" size="70%">
            <template #header="{}">
                <h3>详细信息</h3>
            </template>

            <template #="{}">

                <el-row>
                    <el-col :span="2">
                        <h5>平台属性</h5>
                    </el-col>
                    <el-col :span="22">
                        <el-tag v-for="item in skuInfo.platformAttrList" :key="item.id" style="margin-right: 2vw;">{{
                            item.attrName }}</el-tag>
                    </el-col>
                </el-row>

                <el-row style="margin: 3vh 0 3vh 0;">
                    <el-col :span="2">
                        <h5>销售属性</h5>
                    </el-col>
                    <el-col :span="22">
                        <el-tag v-for="item in skuInfo.salesAttrList" :key="item.id" style="margin-right: 2vw;">{{
                            item.attrName }}</el-tag>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="2" style="margin-bottom: 1vh;">
                        <h5>商品图片</h5>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-carousel trigger="click" height="auto">
                            <el-carousel-item v-for="item in skuInfo.salesImgList" :key="item.id" style="height: 100vh;">
                                <img :src="serve + '/' + item.imgUrl" alt="销售图片" style="width:100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>




            </template>
        </el-drawer>

    </el-card>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';


//引入项目商品管理下sku管理相关接口
import { reqGetSku, reqSkuListing, reqSkuDelist, reqSkuInfo, reqDeleteSku } from '@/api/product/sku/index.ts';
//引入sku管理接口数据的类型
import { SkuData, skuInfo } from '@/api/product/sku/type.ts';
import { ElMessage } from 'element-plus';


//定义请求服务域名
const serve = import.meta.env.VITE_SERVE;


// 当前页数
const currentPage = ref<number>(1);
//当前页数显示数量
const pageSize = ref<number>(10);
//分页器总数
const total = ref<number>(100);

onMounted(() => {
    getSkuData();
});

//定义sku数据
const skuData = ref<SkuData[]>([]);


//定义获取sku数据方法
const getSkuData = async (page = 1) => {

    currentPage.value = page;

    const result = await reqGetSku(currentPage.value, pageSize.value);
    if (result.code === 200) {
        skuData.value = result.data.records;
        total.value = result.data.total;
    };
};



//分页器页数改变
const currentPageChange = (page: number) => {
    getSkuData(page);
};

//分页器显示数量改变
const pageSizeChange = () => {
    getSkuData();
};


//sku上架或下架svg图标点击事件回调
const skuListingOrDelist = async (row: SkuData) => {
    if (row.isListing) {
        //下架
        const result = await reqSkuDelist(row.id as number);
        if (result.code === 200) {
            ElMessage({ type: 'success', message: '下架成功' });
            getSkuData(currentPage.value);
        };

    } else {
        //上架
        const result = await reqSkuListing(row.id as number);

        if (result.code === 200) {
            ElMessage({ type: 'success', message: '上架成功' });
            getSkuData(currentPage.value);
        };
    };
};


//sku编辑svg图标点击事件回调
const skuEdit = () => { ElMessage({ type: 'success', message: '编辑功能正在开发中~' }) };


//定义是否显示sku详细信息的抽屉
const drawer = ref<boolean>(false);

//定义指定的sku信息数据
const skuInfo = ref<skuInfo>({
    platformAttrList: [],
    salesAttrList: [],
    salesImgList: []
});


//sku查看svg图标点击事件回调
const skuView = async (row: SkuData) => {
    drawer.value = true;

    const result = await reqSkuInfo(row.id as number);
    if (result.code === 200) {
        //console.log(result.data);
        skuInfo.value = result.data;
    };
};

//sku删除svg图标点击事件回调
const skuDelete = async (skuId: number) => {
    const { code } = await reqDeleteSku(skuId);
    if (code === 200) {
        ElMessage({ type: 'success', message: '成功' });
        getSkuData(skuData.value.length > 1 ? currentPage.value : currentPage.value - 1);
    } else ElMessage({ type: 'error', message: '失败' });
};



</script>

<style scoped lang="scss">
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>