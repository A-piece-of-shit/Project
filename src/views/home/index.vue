<template>
    <div>

        <el-card>
            <div style="display: flex;">
                <!-- <img :src="`data:image/webp;base64,${userStore.useravatar}`" alt="个人头像" ref="useravatar" class="avatar"> -->

                <el-avatar :src="`data:image/webp;base64,${userStore.useravatar}`" :icon="UserFilled" alt="个人头像"
                    ref="useravatar" class="avatar" :size="110" />


                <!-- <el-avatar shape="circle" :size="180" fit="contain" :src="`data:image/webp;base64,${userStore.useravatar}`" -->
                <!-- alt="用户头像" /> -->
                <div style="margin-left:3vw">
                    <p style="font-size: 30px; font-weight: 900; margin-bottom: 10vh;">欢迎访问xx后台管理系统</p>
                    <h4 class="username">{{ userStore.userName }}</h4>
                </div>
            </div>

            <!-- <Svg name="commoditymanagement-spu-add"></Svg> -->

        </el-card>
        <Svg name="commoditymanagement-index-OnlineLearning" width="100%" height="50vh"></Svg>

    </div>
</template>

<script setup lang="ts">

//引入用户仓库，并使用
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore();

import { UserFilled } from '@element-plus/icons-vue'







</script>


<style scoped lang="scss">
// .avatar {
//     width: 12vw;
//     border-radius: 50%;
// }

:deep(.el-icon) {
    width: 100%;
    height: 100%;

    svg {
        width: 50px;
        height: 50px;
    }
}

.username {
    font-size: 20px;

    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;

    /* fallback for old browsers */
    background-image: -webkit-linear-gradient(to right, #f0acf7, #acf7f0, #f7f0ac);
    /* Chrome 10-25, Safari 5.1-6 */
    background-image: linear-gradient(to right, #f0acf7, #acf7f0, #f7f0ac);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>