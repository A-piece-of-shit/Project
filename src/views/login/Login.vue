<template>
    <div class="login_container" v-loading="loading" element-loading-background="rgba(122, 122, 122, 0.8)"
        element-loading-text="登陆中..." :style="`background-image: url(${serve}/reg_bg_min.jpg);`">
        <el-row>
            <el-col :span="12" :xs="0">
                你好
            </el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="user" :rules="rules" ref="loginForm">
                    <h1>Hello</h1>
                    <el-form-item prop="accountNumber">
                        <el-input v-model="user.accountNumber" placeholder="请输入账号" clearable :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="user.password" type="password" placeholder="请输入密码" show-password
                            :prefix-icon="Lock" />
                    </el-form-item>

                    <el-form-item>
                        <el-button class="login_btn" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
//引入路由
import { useRouter, useRoute } from 'vue-router'
const Router = useRouter();
const Route = useRoute();

//引入element图标
import { User, Lock } from '@element-plus/icons-vue'


import { ElMessage, ElNotification } from 'element-plus'

//引入用户仓库
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore();

//引入时间工具
import { getHours } from '@/utils/time.ts';

const serve = import.meta.env.VITE_STATIC;

//表单实例
const loginForm = ref();

//表单数据
const user = reactive({ accountNumber: 'admin', password: '111111' });

//自定义表单校验函数
const validateUserName = (_rules: any, value: any, callback: any) => {
    if (value.length >= 5) { callback(); } else { callback(new Error('账号长度至少5位！！！')); };
};

const validatePassword = (_rules: any, value: any, callback: any) => {
    if (value.length >= 5) { callback(); } else { callback(new Error('密码长度至少5位！！！')); };
};

//表单数据校验
const rules = {
    // userName: [{ required: true, min: 5, max: 10, message: '用户名不正确', trigger: 'blur' }],
    // password: [{ required: true, min: 6, max: 10, message: '密码不不正确', trigger: 'blur' }]
    accountNumber: [{ validator: validateUserName, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
};

//是否显示加载
const loading = ref(false);

//登录按钮事件回调
const login = async () => {

    await loginForm.value.validate();
    loading.value = true;


    try {

        await userStore.userLogin(user);
        Router.push({ path: Route.query.redirect as string || '/' });

        ElNotification({
            title: `${getHours()}`,
            message: '欢迎回来',
            type: 'success',
        });
    }
    catch (error) {
        ElMessage({
            showClose: true,
            message: (error as Error).message,
            type: 'error',
            center: true
        });
    }
    finally {
        loading.value = false;
    }

};


</script>

<style scoped lang="scss">
.login_container {
    height: 100vh;
    // background-image: url('@/../public/reg_bg_min.jpg');
    background-size: cover;


    .login_form {
        position: relative;
        width: 80%;
        top: 40vh;
        left: 40px;

        h1 {
            font-size: 50px;
            color: aqua;
            margin-bottom: 20px;
        }

        .login_btn {
            width: 100%;
        }
    }

}



.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-radio-group {
    margin-right: 12px;
}
</style>