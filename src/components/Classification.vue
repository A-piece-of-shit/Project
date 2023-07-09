<template>
    <el-card shadow="always">
        <el-form inline>
            <el-form-item label="一级分类" style="margin-bottom: 0px;">
                <el-select placeholder="请选择" v-model="managementStore.classification1Id" @change="select1ChangeHandler"
                    :disabled="managementStore.isAddOrEditClassificationData === '' ? false : true">
                    <el-option v-for="item in managementStore.classification1Data" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="二级分类" style="margin-bottom: 0px;">
                <el-select placeholder="请选择" v-model="managementStore.classification2Id" @change="select2ChangeHandler"
                    :disabled="managementStore.isAddOrEditClassificationData === '' ? false : true">
                    <el-option v-for="item in managementStore.classification2Data" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="三级分类" style="margin-bottom: 0px;">
                <el-select placeholder="请选择" v-model="managementStore.classification3Id"
                    :disabled="managementStore.isAddOrEditClassificationData === '' ? false : true">
                    <el-option v-for="item in managementStore.classification3Data" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>

            <el-button type="primary" :icon="CirclePlusFilled"
                :disabled="!managementStore.classification3Id || managementStore.isAddOrEditClassificationData !== '' ? true : false"
                @click="addManagementData">添加</el-button>

        </el-form>
    </el-card>
</template>

<script setup lang="ts">
const emit = defineEmits(['addSpu']);

//引入vue
import { onMounted } from 'vue';

//引入elementui图标库
import { CirclePlusFilled } from '@element-plus/icons-vue'

//引入管理相关的小仓库
import useManagementStore from '@/store/modules/management.ts'
//加载管理仓库
const managementStore = useManagementStore();

//接受其他组件传递的prop
const props = defineProps(['administrativeName'])




onMounted(() => {
    getPrimaryClassification();
});





//获取一级分类数据
const getPrimaryClassification = () => {

    //获取管理仓库中的一级分类数据
    managementStore.getPrimaryClassification();
};

//选择框1值变化回调事件
const select1ChangeHandler = () => {
    //清空后续选择框2值
    managementStore.classification2Id = '';
    managementStore.classification3Id = '';
    managementStore.classification3Data = [];


    //获取管理仓库中的二级分类数据
    managementStore.getSecondaryClassification();
};

//选择框2值变化回调事件
const select2ChangeHandler = () => {
    managementStore.classification3Id = '';


    managementStore.getThreelevelClassification();
};

//选择框3值变化回调事件
// const select3ChangeHandler = async () => {
//     // managementStore.getThreelevelClassification();

//     getClassifiedData();

// };

//添加属性管理数据点击事件回调
// const addClassificationData = () => {
//     managementStore.isAddOrEditClassificationData = props.administrativeName;
// };

const addManagementData = () => {
    managementStore.isAddOrEditClassificationData = props.administrativeName;

    if (props.administrativeName !== 'attr') {
        emit('addSpu');
    };



};

</script>

<style scoped lang="scss"></style>