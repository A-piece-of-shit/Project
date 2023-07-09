<template>
    <Svg name="commoditymanagement-404-404" width="100vw" height="90vh"></Svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();

import { ElMessage, ElMessageBox } from 'element-plus'
// import type { Action } from 'element-plus'


onMounted(() => {
    ElMessageBox.confirm('该页面您无权访问', '无权访问！！！', { confirmButtonText: '返回首页' })
        .then(() => {
            // ElMessage({
            //     type: 'success',
            //     message: '立即返回',
            // })
            router.replace({ path: '/home' });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '5s后返回首页',
            });

            setTimeout(() => {
                router.replace({ path: '/home' });
            }, 5000);
        })
});

</script>