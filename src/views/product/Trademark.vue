<template>
    <el-card class="box-card">

        <!-- 表格 -->
        <el-table style="width: 100%" stripe border size="large" :data="brandData">

            <el-table-column prop="date" label="序号" width="80" header-align="center" type="index" />
            <el-table-column prop="name" label="名称" width="180">
                <template #="{ row }">
                    <span>{{ row.brandName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="logo" width="500">
                <template #="{ row }">
                    <img :src="`${serve}/${row.brandLogoImg}`" alt="logo"
                        style="height: 300px; margin-left: 50%; transform: translateX(-50%);">
                </template>

            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template #="{ row }">
                    <div>
                        <Svg name="commoditymanagement-brand-editor" width="30px" height="30px" style="margin-right: 2vw;"
                            @click="editBrand(row)"></Svg>



                        <el-popconfirm width="300" confirm-button-text="确定" cancel-button-text="取消" title="确定删除该品牌吗?"
                            :icon="DeleteFilled" icon-color="#626AEF" @confirm="deleteBrand(row.id, row.brandLogoImg)">
                            <template #reference>
                                <Svg name="commoditymanagement-brand-delete" width="30px" height="30px"></Svg>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>




        </el-table>

        <!-- 分页 -->
        <el-pagination background v-model:page-size="pageSize" v-model:current-page="page" :page-sizes="[3, 4, 5]"
            @update:current-page="switchingPages" @update:page-size="switchingPageSize"
            layout="prev, pager, next, jumper, ->, sizes, total" :total="total" style="margin-top: 20px;" />

        <!-- 添加品牌图标 -->
        <div style="position: fixed; right: 4vw; bottom: 10vh; z-index: 2;">
            <Svg name="commoditymanagement-brand-append" width="30px" height="30px" @click="newBrands"></Svg>
        </div>

        <!-- 品牌操作 -->
        <el-drawer v-model="drawer" :title="drawerTitle" size="40%" :before-close="drawerOff">
            <!-- <el-dialog v-model="drawer" :title="drawerTitle" :before-close="demo"> -->
            <el-form :model="newBrandData" label-width="120px" ref="formRef" :rules="rules">
                <Svg name="commoditymanagement-brand-brand" width="30px" height="30px"
                    style="position: absolute; margin: 1px 0 0 10px;"></Svg>
                <el-form-item label="品牌名称" prop="brandName">
                    <el-input v-model="newBrandData.brandName"></el-input>
                </el-form-item>
                <Svg name="commoditymanagement-brand-addingimages" width="30px" height="30px"
                    style="position: absolute; margin: 1px 0 0 10px;"></Svg>
                <el-form-item label="品牌图片" prop="brandUrl">
                    <el-upload class="avatar-uploader" :action="serve + '/manage/brand/uploadingimages'"
                        :headers="{ enctype: 'multipart/form-data' }" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="newBrandData.brandLogoImg" :src="`${serve}/${newBrandData.brandLogoImg}`"
                            class="avatar" />
                        <!-- <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon> -->
                        <Svg v-else name="commoditymanagement-brand-add" width="3vw" height="8vh"
                            class="avatar-uploader-icon"></Svg>

                    </el-upload>
                </el-form-item>
            </el-form>

            <el-alert v-show="newBrandData.brandLogoImg" title="点击图片进行更换" type="success" center />

            <template #footer=" ">

                <!-- <el-button>
                    取消<Svg name="commoditymanagement-brand-cancel" width="30px" height="30px"></Svg>
                </el-button> -->
                <el-button @click="confirMation">
                    确认<Svg name="commoditymanagement-brand-confirmation" width="30px" height="30px"></Svg>
                </el-button>

            </template>
            <!-- </el-dialog> -->
        </el-drawer>

    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
//引入品牌管理相关接口
import { reqExistingBrand, reqAddOrUpdateBrand, reqCancelUploadBrandImg, reqDeleteBrand } from '@/api/product/trademark/index.ts';
//引入品牌管理类型相关接口
import type { brands, brandsResponesData, brand, responesData } from '@/api/product/trademark/type.ts';

//引入element的类型接口
// import type  { UploadProps } from 'element-plus'

import { ElMessage } from 'element-plus'

import { DeleteFilled } from '@element-plus/icons-vue'


import { getCompleteTime } from '@/utils/time'
import { UploadProps } from 'element-plus';

// import { UploadProps } from 'element-plus/es/components/upload/src/upload';

onMounted(() => {
    getBrandData();
});


//定义请求服务域名
const serve = import.meta.env.VITE_SERVE;





//抽提关闭前的回调
const drawerOff = async (done: any) => {

    if (drawerTitle.value === '新增品牌') {

        if (newBrandData.brandLogoImg) {

            try {
                //调用取消上传品牌图片接口
                const result = await reqCancelUploadBrandImg(newBrandData.brandLogoImg.slice(53));
                if (result.code === 200) {
                    done();
                }

            } catch (error) {

            }

        } else {
            //抽屉关闭
            done();
        }
    } else {
        if (newBrandData.brandLogoImg !== beforeEditingBrandLogoUrl) {
            try {
                //调用取消上传品牌图片接口
                await reqCancelUploadBrandImg(newBrandData.brandLogoImg.slice(53));
            } catch (error) {

            }
        }



        //清空品牌图片url
        beforeEditingBrandName = '';
        beforeEditingBrandLogoUrl = '';
        newBrandData.brandLogoImg = '';

        done();


    };

};


//当前页数
const page = ref(1);

//每页显示数量
const pageSize = ref(3);

//品牌数据总数
const total = ref(0);

//品牌数据
const brandData = ref<brands>([]);

//新增品牌数据
const newBrandData = reactive<brand>({
    //文件上传日期
    creationDate: '',
    //文件编辑日期：首次为文件上传日期
    editDate: '',
    //品牌名
    brandName: '',
    //品牌图片url
    brandLogoImg: '',
    //品牌图片名称
    brandLogoFilename: '',
    //品牌图片大小
    brandLogoSize: 0
});



//用户上传文件前的回调
const beforeAvatarUpload: typeof UploadProps['beforeUpload'] = (rawFile: any) => {
    // console.log(rawFile);

    if (rawFile.type === 'image/webp' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {

        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                showClose: true,
                message: '上传文件大小必须小于4M！！！',
                type: 'error',
            });
            return false;
        }

    } else {
        ElMessage({
            showClose: true,
            message: '上传文件格式错误！！！',
            type: 'error',
        });
        return false;
    }

};

//用户上传文件成功后的回调
const handleAvatarSuccess: typeof UploadProps['onSuccess'] = (response: any, uploadFile: any) => {

    if (drawerTitle.value === '新增品牌') {
        newBrandData.brandLogoImg = response.data;
        newBrandData.brandLogoFilename = uploadFile.name;
        newBrandData.brandLogoSize = uploadFile.size as number;
        newBrandData.creationDate = getCompleteTime();
        newBrandData.editDate = newBrandData.creationDate;
    } else {
        newBrandData.brandLogoImg = response.data;
        newBrandData.brandLogoFilename = uploadFile.name;
        newBrandData.brandLogoSize = uploadFile.size as number;
    };

    //清除表单的校验信息
    formRef.value.clearValidate();

};

//用户确定新增or编辑品牌
const confirMation = async () => {

    try {
        //触发表单校验
        await formRef.value.validate();


        //存储编辑前的品牌url
        //beforeEditingBrandLogoUrl

        //存储编辑前的品牌名称
        //beforeEditingBrandName


        //针对编辑品牌进行处理
        if (newBrandData.brandName === beforeEditingBrandName && newBrandData.brandLogoImg === beforeEditingBrandLogoUrl) {
            //没有编辑品牌数据
            drawer.value = false;
            return;

        }

        const result = await reqAddOrUpdateBrand(newBrandData) as responesData;


        if (result.code === 200) {
            drawer.value = false;
            ElMessage({
                showClose: true,
                message: drawerTitle.value === '新增品牌' ? '添加成功' : '编辑成功',
                type: 'success',
            });

            if (drawerTitle.value === '新增品牌') {
                //再次获取品牌数据
                getBrandData();
            } else {
                //编辑后回到原先页数
                getBrandData(page.value);
            };

        } else {
            ElMessage({
                showClose: true,
                message: drawerTitle.value === '新增品牌' ? '添加成功' : '编辑成功',
                type: 'error',
            });
        };

        //针对编辑品牌进行处理
        if (drawerTitle.value === '编辑品牌' && beforeEditingBrandLogoUrl !== '') {
            //调用取消上传品牌图片接口（取消编辑前的）
            await reqCancelUploadBrandImg(beforeEditingBrandLogoUrl.slice(53));
            beforeEditingBrandLogoUrl = '';
        };
    } catch (error) {

    }


};



//获取品牌数据方法
const getBrandData = async (defaultPage = 1) => {
    page.value = defaultPage;
    const result: brandsResponesData = await reqExistingBrand(page.value, pageSize.value);
    if (result.code === 200) {
        total.value = result.total;
        brandData.value = result.data;
    } else {

    }
};


//切换页码事件
const switchingPages = (newPage: any) => {
    getBrandData(newPage);
};


//切换页码显示的数据数量事件
const switchingPageSize = () => {
    getBrandData();
};

//是否显示抽屉
const drawer = ref<boolean>(false);


//抽屉标题
const drawerTitle = ref<string>('新增品牌');

//新增品牌事件
const newBrands = () => {
    drawer.value = true;
    drawerTitle.value = '新增品牌';

    //清空上一次的数据
    newBrandData.brandName = '';
    newBrandData.brandLogoImg = '';
    newBrandData.id = 0;

    //清除表单校验信息
    formRef.value?.clearValidate('brandName');
    formRef.value?.clearValidate('brandUrl');

};

//编辑品牌事件
const editBrand = (brandData: any) => {
    //清除表单校验信息
    formRef.value?.clearValidate('brandName');
    formRef.value?.clearValidate('brandUrl');


    drawerTitle.value = '编辑品牌';
    drawer.value = true;

    newBrandData.brandName = brandData.brandName;
    newBrandData.brandLogoImg = brandData.brandLogoImg;


    //存储编辑前的品牌url
    beforeEditingBrandLogoUrl = brandData.brandLogoImg;

    //存储编辑前的品牌名称
    beforeEditingBrandName = brandData.brandName;

    Object.assign(newBrandData, brandData);




    /*
        id?: number,
        //品牌logo添加时间
        creationDate: string,
        //品牌logo编辑时间：第一次为品牌logo添加时间
        editDate: string,
        //品牌名称
        brandName: string,
        //品牌url
        brandLogoImg: string,
        //品牌logo图片名称
        brandLogoFilename: string,
        brandLogoSize: number
    */

};


//编辑前的品牌url
let beforeEditingBrandLogoUrl = '';

//编辑前的品牌名称
let beforeEditingBrandName = '';


//删除品牌事件
const deleteBrand = async (id: any, logoUrl: any) => {
    console.log(id);

    await reqDeleteBrand(id);

    getBrandData(brandData.value.length > 1 ? page.value : page.value - 1);


    await reqCancelUploadBrandImg(logoUrl.slice(53));
};


//表单实例
const formRef = ref();


//品牌名称验证函数
const validatorBrandName = (_rule: any, value: any, callback: any) => {
    // console.log(rule);
    // console.log(value);
    // console.log(a);

    if (value === '') {
        callback(new Error('品牌名称不能为空！！！'));
    } else {
        callback();
    };

};

//品牌名称验证函数
const validatorBrandUrl = (_rule: any, _value: any, callback: any) => {


    if (newBrandData.brandLogoImg) {
        callback();

    } else {
        callback(new Error('请选择一张图片'));
    };
};


//表单验证规则
const rules = {
    brandName: [{ required: true, trigger: 'blur', validator: validatorBrandName }],
    brandUrl: [{ required: true, trigger: 'change', validator: validatorBrandUrl }]
};

</script>

<style scoped lang="scss">
.box-card {
    width: 100%;
}


.avatar-uploader {
    width: 20vw;
    height: 35vh;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload {
    width: 100%;
    height: 100%;
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar-uploader .avatar {
    width: 100%;
    // width: 178px;
    // height: 178px;
    display: block;
}
</style>