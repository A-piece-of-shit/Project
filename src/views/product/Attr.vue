<template>
    <div>
        <!-- 全局组件：管理 -->
        <Classification administrativeName="attr" />


        <!-- 展示属性管理数据表格 -->
        <el-card shadow="always" style="margin-top: 10vh;"
            v-show="ManagementStore.isAddOrEditClassificationData === '' ? true : false">
            <el-table stripe style="width: 100%" :data="classifiedData">
                <el-table-column label="序号" width="80" type="index" />
                <el-table-column prop="name" label="属性名称" width="180" />
                <el-table-column prop="address" label="属性值名称">
                    <template #="{ row }">

                        <el-tag v-for="item in row.attrValueList" :key="item.id" type="success"
                            style="margin-right: 1vw; margin-bottom: 1vh;">
                            {{ item.valueName }}
                        </el-tag>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #="{ row }">

                        <el-button :icon="EditPen" type="primary" plain @click="editClassificationData(row)"></el-button>

                        <el-popconfirm :title="`您确定要删除${row.name}属性吗？`" width="300"
                            @confirm="deleteClassificationData(row)">
                            <template #reference>
                                <el-button :icon="CloseBold" type="primary" plain></el-button>
                            </template>
                        </el-popconfirm>


                    </template>
                </el-table-column>

                <template #empty="">
                    <Svg name="commoditymanagement-attr-nodataavailable" width="100%" height="100%"></Svg>
                    暂无数据
                </template>
            </el-table>
        </el-card>

        <!-- 展示添加or编辑数据 -->
        <el-card shadow="always" style="margin-top: 10vh;"
            v-show="ManagementStore.isAddOrEditClassificationData === 'attr' ? true : false">
            <el-form inline>
                <el-form-item label="属性名称">
                    <el-input placeholder="请您输入属性名称" v-model="newEditClassifiedData.name"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" :icon="Plus" @click="addAttrValueList"
                :disabled="!newEditClassifiedData.name">添加属性值</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>

            <el-table border style="margin: 5vh 0 5vh 0;" :data="newEditClassifiedData.attrValueList">
                <el-table-column label="序号" width="80" align="center" type="index" />
                <el-table-column label="属性值名称">

                    <template #="{ row, $index }">
                        <el-input :ref="(el: any) => attributeNameInput[$index] = el" v-if="row.flag" placeholder="请输入属性名称"
                            v-model="row.valueName" @blur="attributeNameBlur(row, $index)" size="small" />
                        <div v-else @click="attributeNameClick(row, $index)">{{ row.valueName }}</div>
                    </template>

                </el-table-column>
                <el-table-column label="属性值操作">
                    <template #="{ $index }">
                        <el-button type="primary" :icon="Delete"
                            @click="newEditClassifiedData.attrValueList.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-button type="primary" :icon="Plus" @click="addNewEditClassifiedData"
                :disabled="!newEditClassifiedData.attrValueList.length">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>

        </el-card>


    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';

//引入管理相关的小仓库
import useManagementStore from '@/store/modules/management.ts'
//加载管理仓库
const ManagementStore = useManagementStore();

//引入请求属性管理接口
import { reqClassifiedData, reqAddOrEditClassifiedData, reqDeleteClassifiedData } from '@/api/product/attr/index.ts'

////引入属性管理数据类型接口
import type { ClassificationDataList, ClassificationData } from '@/api/product/attr/type.ts'


//引入elementui图标库
import { EditPen, CloseBold, Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';



onBeforeUnmount(() => {
    ManagementStore.$reset();
});


watch(() => ManagementStore.classification3Id, (newValue) => {
    // classifiedData.value = [];

    if (typeof newValue === 'number') {
        getClassifiedData();
    };
});

//定义分类数据
const classifiedData = ref<ClassificationDataList>([]);

//获取分类数据
const getClassifiedData = async () => {
    const { classification1Id, classification2Id, classification3Id } = ManagementStore
    const result = await reqClassifiedData(classification1Id as number, classification2Id as number, classification3Id as number);
    classifiedData.value = result.data;
};


//编辑属性管理数据点击事件回调
const editClassificationData = (row: any) => {
    ManagementStore.isAddOrEditClassificationData = 'attr';

    Object.assign(newEditClassifiedData, JSON.parse(JSON.stringify(row)));
};

//删除属性管理数据点击事件回调
const deleteClassificationData = async (row: any) => {
    // console.log(row.id);

    const result = await reqDeleteClassifiedData(row.id);

    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });

        getClassifiedData();
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    };
};


const cancel = () => {
    ManagementStore.isAddOrEditClassificationData = '';

    //清空新增管理分类属性数据
    Object.assign(newEditClassifiedData, {
        name: '',
        attrId: '',
        attrValueList: []
    });

};

//定义新增管理分类属性数据
const newEditClassifiedData = reactive<ClassificationData>({
    name: '',
    attrId: '',
    attrValueList: []
});


//添加管理分类属性数据属性值点击事件回调
const addAttrValueList = () => {

    newEditClassifiedData.attrValueList.push({ valueName: '', flag: true });

    nextTick(() => {
        attributeNameInput.value[attributeNameInput.value.length - 1].focus()
    });
};

//添加新增管理分类属性数据
const addNewEditClassifiedData = async () => {
    //清除id
    newEditClassifiedData.id = '';

    const { classification1Id, classification2Id, classification3Id } = ManagementStore;
    const result = await reqAddOrEditClassifiedData(newEditClassifiedData, classification1Id as number, classification2Id as number, classification3Id as number);

    if (result.code === 200) {
        ManagementStore.isAddOrEditClassificationData = '';

        ElMessage({
            type: 'success',
            message: newEditClassifiedData.id ? '修改成功' : '添加成功'
        });

        // 再次获取
        getClassifiedData();
    } else {
        ElMessage({
            type: 'error',
            message: newEditClassifiedData.id ? '修改失败' : '添加失败'
        });
    };

    //清空新增管理分类属性数据
    Object.assign(newEditClassifiedData, {
        name: '',
        attrId: '',
        attrValueList: []
    });
};


//属性名称文本框失去焦点回调事件
const attributeNameBlur = (row: any, $index: any) => {


    // 非法情况下处理
    //1.用户输入为空or输入内容为空格
    if (row.valueName.trim() === '') {
        // console.log(row.valueName.trim());
        //清除不合法情况的数据
        newEditClassifiedData.attrValueList.splice($index, 1);

        ElMessage({
            type: 'warning',
            message: '输入内容不能为空！！！'
        });

        return;
    }

    //2.用户输入内容存在
    const result = newEditClassifiedData.attrValueList.find((item) => {
        if (item !== row) {
            return item.valueName === row.valueName;
        }
    });

    if (result) {
        //清除不合法情况的数据
        newEditClassifiedData.attrValueList.splice($index, 1);

        ElMessage({
            type: 'warning',
            message: '输入内容不能重复！！！'
        });

        return;
    };


    row.flag = false;
};

//属性名称点击回调事件
const attributeNameClick = (row: any, $index: any) => {
    row.flag = true;

    nextTick(() => {
        attributeNameInput.value[$index].focus()
    });
};




//定义用于存储每一个属性名称输入框
const attributeNameInput = ref<any>([]);

</script>

<style scoped lang="scss"></style>