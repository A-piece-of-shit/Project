<template>
    <div>

        <el-card>
            <el-form inline style="display: flex; justify-content: space-between;">
                <el-form-item>
                    <el-input placeholder="搜索职位" v-model="keyword"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchJobInformation"
                        :disabled="keyword ? false : true">搜索</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>

                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 3vh;">
            <el-button type="primary" @click="addPosition">添加职位</el-button>
            <el-table border style="margin-top: 2vh;" :data="allJobInformationData">
                <el-table-column type="index" align="center" label="#" width="50"></el-table-column>
                <el-table-column align="center" label="ID" prop="id" width="70"></el-table-column>
                <el-table-column align="center" label="职位名称" prop="name" width="200"></el-table-column>
                <el-table-column align="center" label="创建时间" prop="creatTime"></el-table-column>
                <el-table-column align="center" label="更新时间" prop="updateTime"></el-table-column>
                <el-table-column align="center" label="操作" width="230">
                    <template #="{ row }">
                        <el-button type="primary" size="small" @click="assignAuthority(row)">设置权限</el-button>
                        <el-button type="primary" size="small" @click="updatePosition(row)">编辑</el-button>
                        <el-popconfirm :title="`您确定删除${row.name}吗？`" width="150" @confirm="deletePosition(row)">
                            <template #reference>
                                <el-button type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination v-model:current-page="currentPage" @update:current-page="getAllJobInformationData"
                v-model:page-size="pageSize" @update:page-size="pageSizeChange" :page-sizes="[5, 7, 9, 11]" background
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-card>


        <!-- 添加 or 更新 职位 -->
        <el-dialog v-model="addOrUpdatePositionDialog" :title="addOrUpdatePositionData.id ? '更新职位' : '添加职位'" width="30%">

            <template #="{}">
                <el-form :model="addOrUpdatePositionData" :rules="rules" ref="addOrUpdatePositionFormRef">
                    <el-form-item label="职位" prop="jobTitle">
                        <el-input placeholder="职位名称" v-model="addOrUpdatePositionData.name"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addOrUpdatePositionDialog = false">取消</el-button>
                    <el-button type="primary" @click="confirmToAddOrUpdatePositions">确认</el-button>
                </span>
            </template>
        </el-dialog>


        <!-- 分配权限 -->
        <el-drawer v-model="assignAuthorityDialog" title="分配权限" direction="ltr">

            <template #="{}">
                <el-tree ref="positionTreeRef" :data="positionAuthority" show-checkbox node-key="id" default-expand-all
                    :default-checked-keys="existingPositionAuthority" :props="defaultProps" />
            </template>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="assignAuthorityDialog = false">取消</el-button>
                    <el-button type="primary" @click="confirmAssignmentPermission">确认</el-button>
                </span>
            </template>

        </el-drawer>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';

import { reqAllJobInformation, reqAddJobInformation, reqPositionAuthority, reqAssignAuthority, reqDeletePosition } from '@/api/acl/role/index.ts';
import type { JobInformationDataList, JobInformationData, ChildPermission } from '@/api/acl/role/type.ts'
import { ElMessage } from 'element-plus';

onMounted(() => {
    getAllJobInformationData();
});

//定义当前页数
const currentPage = ref<number>(0);
//定义当前页数显示数量
const pageSize = ref<number>(5);
//定义数据总量
const total = ref<number>(0);
//定义搜索职位关键字
const keyword = ref<string>('');
//定义展示职位信息数据
const allJobInformationData = ref<JobInformationDataList>([]);
//定义新增职位 or 更新职位数据
const addOrUpdatePositionData = reactive<JobInformationData>({ name: '' });



//获取所有职位信息数据
const getAllJobInformationData = async (page = 1) => {
    currentPage.value = page;
    const { code, data } = await reqAllJobInformation(currentPage.value, pageSize.value, keyword.value);
    if (code === 200) {
        allJobInformationData.value = data.records;
        total.value = data.total;
    };

};

//当前页数显示数量变化回调
const pageSizeChange = () => { getAllJobInformationData() };

//搜索职业信息按钮点击回调
const searchJobInformation = () => { getAllJobInformationData(); keyword.value = ''; };

//重置按钮点击回调
const reset = () => { getAllJobInformationData(); };

//定义控制添加 or 更新职位dialog显示与隐藏
const addOrUpdatePositionDialog = ref<boolean>(false);

//添加职位按钮点击事件回调
const addPosition = () => {
    addOrUpdatePositionDialog.value = true;
    Object.assign(addOrUpdatePositionData, { id: 0, name: '' });
    nextTick(() => {
        addOrUpdatePositionFormRef.value.clearValidate();
    });
};

//编辑职位按钮点击事件回调
const updatePosition = (row: JobInformationData) => {
    addOrUpdatePositionDialog.value = true;
    Object.assign(addOrUpdatePositionData, row);
    nextTick(() => {
        addOrUpdatePositionFormRef.value.clearValidate();
    });

};

//删除职位按钮点击事件回调
const deletePosition = async (row: JobInformationData) => {
    const { code } = await reqDeletePosition(row.id as number);
    if (code === 200) {
        ElMessage({ type: 'success', message: '成功' });
        getAllJobInformationData(allJobInformationData.value.length > 1 ? currentPage.value : currentPage.value - 1);
    };
};


//确认添加 or 更新职位按钮点击事件回调
const confirmToAddOrUpdatePositions = async () => {
    await addOrUpdatePositionFormRef.value.validate();

    const { code } = await reqAddJobInformation(addOrUpdatePositionData);
    if (code === 200) {
        ElMessage({ type: 'success', message: addOrUpdatePositionData.id ? '更新成功' : '添加成功' });
        addOrUpdatePositionDialog.value = false;
        getAllJobInformationData(addOrUpdatePositionData.id ? currentPage.value : 1);
    };

};



//新增 or 更新职位表单实例
const addOrUpdatePositionFormRef = ref();



//jobTitle表单项校验函数
const validatorJobTitle = (_rule: any, _value: any, callback: any) => {
    if (addOrUpdatePositionData.name.length >= 2) callback();
    else callback(new Error('职位名称至少两位'));
};

//新增 or 更新职位表单校验规则
const rules = {
    jobTitle: [{ required: true, trigger: 'blur', validator: validatorJobTitle }]
};



//定义控制分配权限dialog显示与隐藏
const assignAuthorityDialog = ref<boolean>(false);

//定义当前职位id
let positionId = 0;

//分配权限按钮点击事件回调
const assignAuthority = async (row: JobInformationData) => {
    assignAuthorityDialog.value = true;
    positionId = row.id as number;

    const { code, data } = await reqPositionAuthority(row.id as number);
    if (code === 200) {
        positionAuthority.value = data;

        //筛选当前职位已有权限
        filterExistingJobPermissions(data, existingPositionAuthority.value);

    };
};



const defaultProps = {
    children: 'children',
    label: 'name',
}
// const data = [
//     {
//         id: 1,
//         label: 'Level one 1',
//         children: [
//             {
//                 id: 4,
//                 label: 'Level two 1-1',
//                 children: [
//                     {
//                         id: 9,
//                         label: 'Level three 1-1-1',
//                     },
//                     {
//                         id: 10,
//                         label: 'Level three 1-1-2',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 2,
//         label: 'Level one 2',
//         children: [
//             {
//                 id: 5,
//                 label: 'Level two 2-1',
//             },
//             {
//                 id: 6,
//                 label: 'Level two 2-2',
//             },
//         ],
//     },
//     {
//         id: 3,
//         label: 'Level one 3',
//         children: [
//             {
//                 id: 7,
//                 label: 'Level two 3-1',
//             },
//             {
//                 id: 8,
//                 label: 'Level two 3-2',
//             },
//         ],
//     },
// ]

//定义职位权限数据
const positionAuthority = ref<ChildPermission>([]);
//定义职位已有权限数据
const existingPositionAuthority = ref<number[]>([]);
//定义筛选当前职位已有权限方法
const filterExistingJobPermissions = (filterArr: ChildPermission, result: number[]) => {
    filterArr.forEach(item => {
        if (item.authorityLevel === 3 && item.select) {
            result.push(item.id);
        }
        if (item.children && item.children.length > 0) {
            filterExistingJobPermissions(item.children, result);
        };

    });
};


//定义职位树形控件实例
const positionTreeRef = ref();


//确认分配按钮点击事件回调
const confirmAssignmentPermission = async () => {

    const { code } = await reqAssignAuthority(positionId, [...positionTreeRef.value.getCheckedKeys(), ...positionTreeRef.value.getHalfCheckedKeys()]);
    if (code === 200) {
        ElMessage({ type: 'success', message: '权限分配成功' });
        assignAuthorityDialog.value = false;
        window.location.reload();
    };



    // console.log([...positionTreeRef.value.getCheckedKeys(), ...positionTreeRef.value.getHalfCheckedKeys()]);








};

</script>

<style scoped lang="scss">
.el-form-item {
    margin-bottom: 0;
}
</style>
