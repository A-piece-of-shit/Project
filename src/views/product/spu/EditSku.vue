<template>
    <!-- sku的修改与添加 -->
    <el-form label-width="100">

        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="adddSku.skuName"></el-input>
        </el-form-item>

        <el-form-item label="价格（元）">
            <el-input placeholder="价格" type="number" v-model="adddSku.skuPrice"></el-input>
        </el-form-item>

        <el-form-item label="重量（g）">
            <el-input placeholder="重量" type="number" v-model="adddSku.skuWeight"></el-input>
        </el-form-item>

        <el-form-item label="SKU描述">
            <el-input placeholder="描述" type="textarea" v-model="adddSku.skuDesc"></el-input>
        </el-form-item>

        <el-form-item label="平台属性">
            <el-form inline>

                <el-form-item v-for="item in platformPropertiesData" :key="item.id" :label="item.name">
                    <el-select v-model="item.skuPlatformAttrIdAndValueId">
                        <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
                            :value="`${item.id}:${attrValue.id}`"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-form inline>

                <el-form-item v-for="item in attributeOfSaleData" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.skuSalesAttrIdAndValueId">
                        <el-option v-for="attrValue in item.spuSalesListAttrValueList" :key="attrValue.id"
                            :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>

        <el-form-item label="图片名称">
            <el-table border :data="salesImagesData" ref="salesPictureTableExamples">
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row }">
                        <img :src="serve + '/' + row.imgUrl" alt="品牌图片" style="width:100%">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button @click="settingTheDefaultImage(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="saveAddSku">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>


    </el-form>
</template>

<script setup lang="ts">
const emit = defineEmits(['administrativeNameChange']);
import { reactive, ref } from 'vue';

//用于项目商品管理下属性管理相关接口
import { reqClassifiedData } from '@/api/product/attr/index.ts';
//用于项目商品管理下spu管理相关接口
import { reqSpuBrandImgData, reqSpuSalesListData, reqAddSku } from '@/api/product/spu/index.ts'



//引入spu管理接口数据的类型
import type { spuData, spuBrandImgData, spuSalesList, addSkuData, skuPlatformAttr, skuSalesAttr } from '@/api/product/spu/type.ts'
import type { ClassificationDataList } from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus';


//定义请求服务域名
const serve = import.meta.env.VITE_SERVE;

//取消按钮点击事件回调
const cancel = () => {
    emit('administrativeNameChange', '', 'update');
};

//定义平台数据                     
const platformPropertiesData = ref<ClassificationDataList>([]);
//定义销售属性数据
const attributeOfSaleData = ref<spuSalesList[]>([]);
//定义图片
const salesImagesData = ref<spuBrandImgData[]>([]);

//定义新增sku数据
const adddSku = reactive<addSkuData>({
    classification3Id: '',
    spuId: '',
    brandId: '',
    skuName: '',
    skuPrice: '',
    skuWeight: '',
    skuDesc: '',
    skuPlatformAttrList: [
        // {
        //     attrId: string | number,
        //     valueId: string | number
        // }
    ],
    skuSalesAttrList: [
        // { attrId: string | number, valueId: string | number }
    ],
    skuImgUrl: ''
});


//初始化添加sku数据
const initAddSkuData = async (classification1Id: number, classification2Id: number, row: spuData) => {
    Object.assign(adddSku, {
        classification3Id: '',
        spuId: '',
        brandId: '',
        skuName: '',
        skuPrice: '',
        skuWeight: '',
        skuDesc: '',
        skuPlatformAttrList: [
            // {
            //     attrId: string | number,
            //     valueId: string | number
            // }
        ],
        skuSalesAttrList: [
            // { attrId: string | number, valueId: string | number }
        ],
        skuImgUrl: ''
    });
    //     const adddSku = reactive<addSkuData>({
    //     classification3Id: '',
    //     spuId: '',
    //     brandId: '',
    //     skuName: '',
    //     skuPrice: '',
    //     skuWeight: '',
    //     skuDesc: '',
    //     skuPlatformAttrList: [
    //         // {
    //         //     attrId: string | number,
    //         //     valueId: string | number
    //         // }
    //     ],
    //     skuSalesAttrList: [
    //         // { attrId: string | number, valueId: string | number }
    //     ],
    //     skuImgUrl: ''
    // });
    // console.log(classification1Id);
    // console.log(classification2Id);

    // console.log(row);
    adddSku.classification3Id = row.classification3Id;
    adddSku.spuId = row.id as number;
    adddSku.brandId = row.brandId;


    //获取分类数据接口
    const responseClassifiedData = await reqClassifiedData(classification1Id, classification2Id, row.classification3Id as number);
    platformPropertiesData.value = responseClassifiedData.data;

    //请求获取spu品牌图片数据
    const responseSpuBrandImgData = await reqSpuBrandImgData(row.id as number);
    salesImagesData.value = responseSpuBrandImgData.data;




    //请求获取spu销售列表数据
    const responseSpuSalesListData = await reqSpuSalesListData(row.id as number);
    attributeOfSaleData.value = responseSpuSalesListData.data;


};

//销售图片表格实例
const salesPictureTableExamples = ref();



//设置默认按钮点击事件回调
const settingTheDefaultImage = (row: spuBrandImgData) => {
    console.log(row);

    adddSku.skuImgUrl = row.imgUrl as string;

    //清除所有图片的默认选中
    salesImagesData.value.forEach(item => {
        salesPictureTableExamples.value.toggleRowSelection(item, false);
    });

    salesPictureTableExamples.value.toggleRowSelection(row, true);
};

//保存按钮点击事件回调
const saveAddSku = async () => {

    //收集平台属性数据
    adddSku.skuPlatformAttrList = platformPropertiesData.value.reduce((accumulator: skuPlatformAttr[], currentValue) => {
        if (currentValue.skuPlatformAttrIdAndValueId) {
            const [attrId, valueId] = currentValue.skuPlatformAttrIdAndValueId.split(':');
            accumulator.push({ attrId, valueId });
        };

        return accumulator;
    }, []);

    //收集平台属性数据
    adddSku.skuSalesAttrList = attributeOfSaleData.value.reduce((accumulator: skuSalesAttr[], currentValue) => {
        if (currentValue.skuSalesAttrIdAndValueId) {
            const [attrId, valueId] = currentValue.skuSalesAttrIdAndValueId.split(':');
            accumulator.push({ attrId, valueId });
        };

        return accumulator;
    }, []);

    const result = await reqAddSku(adddSku);
    if (result.code === 200) {
        ElMessage({ type: 'success', message: 'SKU添加成功' });
        emit('administrativeNameChange', '', 'update');
    } else {
        ElMessage({ type: 'error', message: 'SKU添加失败' });
    };

};


defineExpose({ initAddSkuData, });
</script>

<style scoped lang="scss"></style>