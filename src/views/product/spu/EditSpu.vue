<template>
    <!-- spu的修改与添加 -->
    <el-form label-width="100">
        <el-form-item label="SPU名称">
            <el-input placeholder="请您输入SPU名称" v-model="spu.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="spu.brandId">
                <el-option v-for="item in allSpuBrand" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请您输入SPU描述" v-model="spu.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <!-- <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload> -->

            <el-upload v-model:file-list="spuBrandImgList" :action="serve + '/spu/upload/brandimg'" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-success="uploadSuccessfulCallback"
                :before-upload="callbackBeforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <!-- <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog> -->

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
            </el-dialog>

        </el-form-item>

        <el-form-item label="SPU销售属性">
            <el-select :placeholder="unSpuSalesAttrList.length ? '请选择' : '无'" v-model="spuSalesAttr">
                <el-option v-for="item in unSpuSalesAttrList" :key="item.id" :label="item.name"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button @click="addSpuSalesList" style="margin-left:2vw"
                :disabled="unSpuSalesAttrList.length === 0 || !spuSalesAttr">添加属性值</el-button>
            <el-table border style="margin-top:3vh" :data="spuSalesList">
                <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                <el-table-column label="销售属性名字" prop="attrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template #="{ row }">
                        <el-tag v-for="(tag, index) in row.spuSalesListAttrValueList" :key="tag.id" class="mx-1" closable
                            :disable-transitions="false" @close="row.spuSalesListAttrValueList.splice(index, 1)"
                            style="margin-right: 1vw;">




                            {{ tag.valueName }}
                        </el-tag>
                        <el-input v-if="row.flag" ref="InputRef" v-model="row.attrValue" class="ml-1 w-20" size="small"
                            @blur="handleInputConfirm(row)" />
                        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput(row)">
                            + New Tag
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #="{ $index }">
                        <el-button type="primary" size="small" @click="spuSalesList.splice($index, 1)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addOrEditSpu">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
const emit = defineEmits(['administrativeNameChange']);

import { computed, ref } from 'vue';

//引入项目商品管理下spu管理相关接口
import { reqALLSpuBrandData, reqSpuBrandImgData, reqSpuSalesListData, reqALLSpuSalesAttrListData, reqAddOrEditSpu } from '@/api/product/spu/index.ts';
//定义spu管理接口数据的类型
import type { spuBrandData, spuBrandImgData, spuSalesList, spuSalesListAttrList, spuData } from '@/api/product/spu/type.ts';
import { ElMessage } from 'element-plus';
import type { UploadFile, UploadRawFile } from 'element-plus';


import { Plus } from '@element-plus/icons-vue'

//定义请求服务域名
const serve = import.meta.env.VITE_SERVE;




const cancel = () => {
    // console.log(123);
    emit('administrativeNameChange', '', 'update');
};

//定义spu数据
const spu = ref<spuData>({
    spuName: '',
    description: '',
    classification3Id: '',
    brandId: '',
    salexInformationList: [],//spu品牌销售信息列表
    imageInformationList: []//spu品牌图片信息列表);
});

//定义所有的spu品牌
const allSpuBrand = ref<spuBrandData[]>([]);

//定义spu品牌图片
const spuBrandImgList = ref<spuBrandImgData[]>([]);

//定义spu销售列表
const spuSalesList = ref<spuSalesList[]>([]);

//定义所有的spu销售属性列表
const spuSalesAttrList = ref<spuSalesListAttrList[]>([]);




//初始化更新spu数据
const initUpdateSpuData = async (spuData: any) => {

    //初始化spu数据
    spu.value = spuData;

    //初始化spu品牌
    const reqALLSpuBrandDataResult = await reqALLSpuBrandData();
    allSpuBrand.value = reqALLSpuBrandDataResult.data;

    //初始化spu当前spu品牌下图片
    const reqSpuBrandImgDataResult = await reqSpuBrandImgData(spuData.id);
    console.log(reqSpuBrandImgDataResult);
    spuBrandImgList.value = reqSpuBrandImgDataResult.data.map(item => ({
        name: item.imgName,
        url: serve + '/' + item.imgUrl
        // url: serve + '/spu/file/upload' + '/4945aa3ad0c6eba7cf20c32639790225'
    }));

    // spuBrandImgList.value = [{ name: '123', url: serve + '/spu/file/upload' + '/4945aa3ad0c6eba7cf20c32639790225' }]

    //请求spu销售列表数据结果
    const reqSpuSalesListDataResult = await reqSpuSalesListData(spuData.id);
    spuSalesList.value = reqSpuSalesListDataResult.data;

    //请求所有的spu销售列表属性数据结果
    const reqALLSpuSalesAttrListDataResult = await reqALLSpuSalesAttrListData();
    spuSalesAttrList.value = reqALLSpuSalesAttrListDataResult.data;

};


//定义是否显示查看已上传图片
const dialogVisible = ref<boolean>(false);

//定义是否显示查看已上传图片
const dialogImageUrl = ref<string>('');


//element组件upload点击文件列表中已上传的文件时的钩子
const handlePictureCardPreview = (uploadFile: typeof UploadFile) => {
    dialogImageUrl.value = uploadFile.url as string;

    dialogVisible.value = true;

};



//element组件upload上传成功回调
const uploadSuccessfulCallback = (response: any) => {
    dialogImageUrl.value = response.data;
    // console.log(uploadFile);
    // console.log(spuBrandImgList.value);
    spuBrandImgList.value[spuBrandImgList.value.length - 1].Url = response.data;
    // console.log(uploadFile);


};




//element组件upload上传前回调
const callbackBeforeUpload = (rawFile: typeof UploadRawFile) => {
    if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif' || rawFile.type === 'image/jpg') {

        if (rawFile.size / 1024 / 1024 < 4) return true;
        else {
            ElMessage({
                type: 'error',
                message: '上传失败'
            });
            return false;
        };

    } else {
        ElMessage({
            type: 'error',
            message: '上传失败'
        });
        return false;
    };
};


//计算未有的销售属性用于展示
const unSpuSalesAttrList = computed(() =>
    spuSalesAttrList.value.filter(allAttributes =>
        spuSalesList.value.every(existingAttribute =>
            allAttributes.name !== existingAttribute.attrName))
);



//定义新增的销售属性
const spuSalesAttr = ref<string>('');
//添加spu销售列表
const addSpuSalesList = () => {
    /*
    attrId: number,
    attrName: string,
    spuSalesListAttrValueList: spuSalesListAttrValueList
    */
    // console.log(spuSalesAttr.value.split(':'));
    const [attrId, attrName] = spuSalesAttr.value.split(':');

    /*
    id?: number,
    createTime?: string,
    updateTime?: string,
    brandId?: number,
    attrId: number,
    attrName: string,
    spuSalesListAttrValueList: spuSalesListAttrValueList
    */

    spuSalesList.value.push({
        attrId: +attrId,
        attrName,
        spuSalesListAttrValueList: []
    });


    spuSalesAttr.value = '';
};



//添加属性值按钮点击事件回调
const showInput = (row: spuSalesList) => {
    row.flag = true;
    row.attrValue = '';
};

//添加属性值input框失去焦点事件回调
const handleInputConfirm = (row: spuSalesList) => {

    row.flag = false;

    /*
    id?: number,
    createTime?: string,
    updateTime?: string,
    brandId?: number,
    attrId: number,
    attrName: string,
    isChecked?: null,
    valueName: string
    */
    const { attrValue, attrId, attrName } = row;

    //非法情况1：输入内容不能为空
    if ((attrValue as string).trim() === '') {
        ElMessage({ type: 'warning', message: '输入内容不能为空！！！' });
        return;
    };

    if (!row.spuSalesListAttrValueList) row.spuSalesListAttrValueList = [];

    //非法情况2：输入内容不能为空
    if (row.spuSalesListAttrValueList.every(item => item.valueName !== row.attrValue) === false) {
        ElMessage({ type: 'warning', message: '输入内容重复！！！' });
        return;
    };

    // if ()
    console.log(row.spuSalesListAttrValueList);


    row.spuSalesListAttrValueList.push({
        /*
        attrId: number,
        attrName: string,
        valueName: string
        */

        attrName,
        attrId,
        valueName: attrValue as string
    });


};


//保存添加 or 修改spu点击事件回到
const addOrEditSpu = async () => {


    spu.value.imageInformationList = spuBrandImgList.value.map(item => ({ imgName: item.name, imgUrl: item.Url || item.url }));

    spu.value.salexInformationList = spuSalesList.value;

    const result = await reqAddOrEditSpu(spu.value);
    if (result.code === 200) {
        ElMessage({ type: 'success', message: spu.value.id ? '更新成功' : '添加成功' });
        emit('administrativeNameChange', '', spu.value.id ? 'update' : 'add');
    } else {
        ElMessage({ type: 'success', message: spu.value.id ? '更新失败' : '添加失败' });
    }

};



//初始化添加spu数据
const initAddSpuData = async (classification3Id: string) => {
    //清空数据
    Object.assign(spu.value, {
        spuName: '',
        description: '',
        classification3Id: '',
        brandId: '',
        salexInformationList: [],//spu品牌销售信息列表
        imageInformationList: []//spu品牌图片信息列表);
    });

    spuBrandImgList.value = [];
    spuSalesList.value = [];
    spuSalesAttr.value = '';


    spu.value.classification3Id = classification3Id;

    //初始化spu品牌
    const reqALLSpuBrandDataResult = await reqALLSpuBrandData();
    allSpuBrand.value = reqALLSpuBrandDataResult.data;


    //请求所有的spu销售列表属性数据结果
    const reqALLSpuSalesAttrListDataResult = await reqALLSpuSalesAttrListData();
    spuSalesAttrList.value = reqALLSpuSalesAttrListDataResult.data;
};


defineExpose({ initUpdateSpuData, initAddSpuData });
</script>

<style scoped lang="scss"></style>