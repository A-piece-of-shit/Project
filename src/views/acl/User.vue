<template>
    <div>

        <el-card>
            <el-form inline style="display: flex; justify-content: space-between;">
                <el-form-item label="用户名">
                    <el-input placeholder="搜索用户名" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="keyword ? false : true"
                        @click="getAllUserInfo(); keyword = '';">搜索</el-button>
                    <el-button type="primary" @click="getAllUserInfo()">重置</el-button>

                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 5vh;">
            <el-button type="primary" @click="addUser">添加用户</el-button>
            <el-button type="primary" @click="batchDeletionUserInfo"
                :disabled="deleteUserInfoIdList.length > 0 ? false : true">批量删除</el-button>

            <el-table border :data="allUserInfoData" @selection-change="selectChange" style="margin-top: 2vh;">
                <el-table-column type="selection" align="center" width="50"></el-table-column>
                <el-table-column label="#" align="center" type="index" width="70"></el-table-column>
                <el-table-column label="ID" align="center" prop="id" width="70"></el-table-column>
                <el-table-column label="用户名称" prop="userName" width="100"></el-table-column>
                <el-table-column label="用户账号" prop="accountnumber"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime"></el-table-column>
                <el-table-column label="操作" width="220">
                    <template #="{ row }">
                        <el-button type="primary" size="small" @click="assignedPost(row)">分配职位</el-button>
                        <el-button type="primary" size="small" @click="updateUser(row)">编辑</el-button>


                        <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks"
                            icon-color="#626AEF" :title="`您确定要删除${row.userName}`" @confirm="deleteUserInfo(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination v-model:current-page="currentPage" @update:current-page="getAllUserInfo"
                v-model:page-size="pageSize" @update:page-size="pageSizeChange" :page-sizes="[5, 7, 9, 11]" background
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-card>

        <!-- 抽屉：用于添加 or 更新账户信息 -->
        <el-drawer v-model="addOrUpdateDrawer" :title="userInfoData.id ? '更新用户' : '添加用户'">
            <!-- 抽屉头部 -->
            <!-- <template #header>
                <h4>{{ userInfoData.id ? '更新用户' : '添加用户' }}</h4>
            </template> -->

            <!-- 抽屉主体 -->
            <template #default>
                <el-form v-model="userInfoData" :rules="rules" ref="formRef">
                    <el-form-item label="用户名称" prop="userName">
                        <el-input placeholder="请输入名称" v-model="userInfoData.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户账号" prop="accountnumber" style="margin:  7vh 0;">
                        <el-input placeholder="请输入账号" v-model="userInfoData.accountnumber"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password" v-if="!userInfoData.id">
                        <el-input placeholder="请输入密码" v-model="userInfoData.password"></el-input>
                    </el-form-item>
                </el-form>
            </template>

            <!-- 抽屉尾部 -->
            <template #footer>
                <el-button type="primary" @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-drawer>


        <!-- 抽屉：用于分配职位 -->
        <el-drawer v-model="assignedPostDrawer">
            <!-- 抽屉头部 -->
            <template #header>
                <h4>分配职位</h4>
            </template>

            <!-- 抽屉主体 -->
            <template #default>
                <el-form>

                    <el-form-item label="用户名称">
                        <el-input placeholder="请输入名称" v-model="userInfoData.userName" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="职位列表">

                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="userPositionInfo">
                            <el-checkbox v-for="position in allPositionInfo" :key="position.id" :label="position.id"
                                @change="handleCheckedCitiesChange" :checked="false">{{ position.jobTitle }}</el-checkbox>
                        </el-checkbox-group>


                    </el-form-item>

                </el-form>
            </template>

            <!-- 抽屉尾部s -->
            <template #footer>
                <el-button type="primary" @click="assignedPostDrawer = false">取消</el-button>
                <el-button type="primary" @click="definiteAssignment">确定</el-button>
            </template>
        </el-drawer>

    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';

//引入权限管理下的用户管理请求接口
import { reqAllUserInfo, reqAddOrUpdateUserInfo, reqPositionInfo, reqAssignedPostInfo, reqDeleteUserInfo, reqDeleteAllUserInfo } from '@/api/acl/user/index.ts'
//定义权限管理下的用户管理类型接口
import type { UserInfoList, UserInfo, PositionInfoList } from '@/api/acl/user/type.ts'
import { ElMessage } from 'element-plus';


onMounted(() => {
    getAllUserInfo();
});


//获取所有的用户信息
const getAllUserInfo = async (page = 1) => {
    currentPage.value = page;
    const userInfoResult = await reqAllUserInfo(currentPage.value, pageSize.value, keyword.value);



    if (userInfoResult.code === 200) {
        allUserInfoData.value = userInfoResult.data.records;
        total.value = userInfoResult.data.total;
    };
};




//当前页数
const currentPage = ref<number>(1);
//当前页数显示数量
const pageSize = ref<number>(5);
//数据总量
const total = ref<number>(100);
//展示用户信息
const allUserInfoData = ref<UserInfoList>([]);

//当前页数发生变化回调
const pageSizeChange = () => {
    getAllUserInfo();
};



//用于控制抽屉：用于添加 or 更新账户信息 显示与隐藏
const addOrUpdateDrawer = ref<boolean>(false);


//添加用户按钮点击事件回调
const addUser = () => {
    addOrUpdateDrawer.value = true;
    Object.assign(userInfoData, {
        id: '',
        userName: '',
        accountnumber: '',
        password: ''
    });

    nextTick(() => {
        formRef.value.clearValidate();
    });
};

//编辑按钮点击事件回调
const updateUser = (row: UserInfo) => {
    addOrUpdateDrawer.value = true;
    Object.assign(userInfoData, row);

    nextTick(() => {
        formRef.value.clearValidate();
    });
};

//批量删除按钮点击事件回调
const batchDeletionUserInfo = async () => {
    const { code } = await reqDeleteAllUserInfo(deleteUserInfoIdList.value);

    if (code === 200) {
        ElMessage({ type: 'success', message: '批量删除成功' });
        getAllUserInfo(allUserInfoData.value.length > 1 ? currentPage.value : currentPage.value - 1);
    };
};


//定义添加 or 更新用户信息数据
const userInfoData = reactive<UserInfo>({
    userName: '',
    accountnumber: '',
    password: ''
});


//抽屉确定按钮点击事件回调
const save = async () => {
    //校验表单
    await formRef.value.validate();

    const { code } = await reqAddOrUpdateUserInfo(userInfoData);
    if (code === 200) {
        addOrUpdateDrawer.value = false;
        ElMessage({ type: 'success', message: userInfoData.id ? '更新成功' : '添加成功' });
        // getAllUserInfo(userInfoData.id ? currentPage.value : 1);

        window.location.reload();
    } else {
        ElMessage({ type: 'success', message: userInfoData.id ? '更新失败' : '添加失败' });

    };
};


//抽屉取消按钮点击事件回调
const cancel = async () => {
    addOrUpdateDrawer.value = false;
};


//userName校验函数
const validatorUserName = (_rule: any, _value: any, callback: any) => {
    if (userInfoData.userName.trim().length >= 2) { callback(); } else { callback(new Error('名称至少2位！！！')); };
};

//accountnumber校验函数
const validatorAccountnumber = (_rule: any, _value: any, callback: any) => {
    if (userInfoData.accountnumber.trim().length >= 5) { callback(); } else { callback(new Error('账号长度至少5位！！！')); };
};

//password校验函数
const validatorPassword = (_rule: any, _value: any, callback: any) => {
    if ((userInfoData.password as string).trim().length >= 5) { callback(); } else { callback(new Error('密码长度至少5位！！！')); };
};


const formRef = ref();

//表单校验规则
const rules = {
    userName: [{ required: true, trigger: 'blur', validator: validatorUserName }],
    accountnumber: [{ required: true, trigger: 'blur', validator: validatorAccountnumber }],
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
};


//用于控制抽屉：用于分配职位 显示与隐藏
const assignedPostDrawer = ref<boolean>(false);


//分配职位按钮点击事件回调
const assignedPost = async (row: UserInfo) => {
    assignedPostDrawer.value = true;
    Object.assign(userInfoData, row);

    const result = await reqPositionInfo(userInfoData.id as number);

    if (result.code === 200) {
        userPositionInfo.value = result.data.userPosition.map(item => (item.id as number));
        allPositionInfo.value = result.data.allPosition;
    };
};

//定义控制职位是否全选
const checkAll = ref<boolean>(false);
//定义控制全选复选框是否处于不确定样式
const isIndeterminate = ref<boolean>(true);

//收集分配用户·职业信息
const userPositionInfo = ref<number[]>([]);
//定义所有·职业信息
const allPositionInfo = ref<PositionInfoList>([]);

//全选复选框改变事件回调
const handleCheckAllChange = (val: boolean) => {
    // console.log(val);
    userPositionInfo.value = val ? allPositionInfo.value.map(item => (item.id as number)) : [];
    isIndeterminate.value = false;
    // userPositionInfo.value = val ? allPositionInfo : []
    // isIndeterminate.value = false
};

//复选框改变事件回调
const handleCheckedCitiesChange = (value: boolean) => {
    // console.log(value);
    checkAll.value = value && allPositionInfo.value.length === userPositionInfo.value.length;
    isIndeterminate.value = userPositionInfo.value.length > 0 && userPositionInfo.value.length < allPositionInfo.value.length;
    // const checkedCount = value.length
    // checkAll.value = checkedCount === allPositionInfo.length
    // isIndeterminate.value = checkedCount > 0 && checkedCount < allPositionInfo.length
};

//确定分配职位按钮点击事件回调
const definiteAssignment = async () => {
    const { code } = await reqAssignedPostInfo({ userId: userInfoData.id as number, positionIdList: userPositionInfo.value });
    if (code === 200) {
        assignedPostDrawer.value = false
        ElMessage({ type: 'success', message: '分配职位成功' });
        getAllUserInfo(currentPage.value);
    };
};


//删除用户信息按钮点击事件回调
const deleteUserInfo = async (userId: number) => {
    const { code } = await reqDeleteUserInfo(userId);
    if (code === 200) {
        ElMessage({ type: 'success', message: '删除成功' });
        getAllUserInfo(allUserInfoData.value.length > 1 ? currentPage.value : currentPage.value - 1);
    };

};

//定义收集批量删除用户信息的数组
const deleteUserInfoIdList = ref<number[]>([]);

//表格数据行的checkbox发生变化事件回调
const selectChange = (value: UserInfoList) => {
    deleteUserInfoIdList.value = value.map(item => item.id as number);
};

//定义搜索关键字
const keyword = ref<string>('');

</script>

<style scoped lang="scss">
.el-form-item {
    margin-bottom: 0;
}
</style>