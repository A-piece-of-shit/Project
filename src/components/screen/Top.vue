<template>
    <div class="top">

        <div class="left" :style="`background-image: url(${imgStatic}/dataScreen-header-left-bg-4759411b.png);`">
            <button class="home-button" @click="backToHomePage">首页</button>
        </div>

        <div class="center" :style="`background-image: url(${imgStatic}/dataScreen-header-center-bg-a9ce4b03.png);`">
            <p class="title">智慧旅游可视化大数据平台</p>
        </div>

        <div class="right" :style="`background-image: url(${imgStatic}/dataScreen-header-left-bg-4759411b.png);`">
            <button class="statistical-report">统计报告</button>
            <p class="current-event">当前时间：{{ currentTime }}</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

import { getScreenTime } from '@/utils/time.ts'

const router = useRouter();


//引入图片静态资源路径
const imgStatic = import.meta.env.VITE_STATIC;

//首页按钮点击事件回调
const backToHomePage = () => {
    router.push('/home');
};

//定义当前时间定时器
let currentTimer: string | number | NodeJS.Timer | undefined = 0;

const currentTime = ref<string>('');


onMounted(() => {
    currentTimer = setInterval(() => {
        currentTime.value = getScreenTime();
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(currentTimer);

});

</script>





<style scoped lang="scss">
.top {
    display: flex;
    width: 100%;
    height: 60px;


    .left {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        // background-image: url(@/assets/dataScreen-header-left-bg-4759411b.png);
        background-repeat: no-repeat;
        background-size: 100%, 100%;




        .home-button {
            width: 100px;
            line-height: 60px;

            color: #29fcff;
            font-size: 20px;
            transform: translateX(100px);
            border: 0;
            background-color: transparent;
            margin-top: -5px;
            cursor: pointer;

        }
    }

    .center {
        flex: 2;

        .title {
            height: 74px;
            line-height: 74px;

            text-align: center;
            color: #29fcff;
            font-size: 30px;

            // background-image: url(@/assets/dataScreen-header-center-bg-a9ce4b03.png);
            background-size: 100%, 100%;

        }
    }

    .right {
        flex: 1;
        display: flex;
        // background-image: url(@/assets/dataScreen-header-left-bg-4759411b.png);

        background-repeat: no-repeat;
        background-size: 100%, 100%;

        .statistical-report {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            transform: translateX(-130px);
            border: 0;
            background-color: transparent;
            margin-top: 7px;
            font-size: 20px;

        }

        .current-event {
            color: #29fcff;



        }

    }
}
</style>