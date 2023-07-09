<template>
    <div class="container">
        <div class="top">

            <p class="title">实时游客统计</p>
            <div class="tourist-icon"></div>


            <p class="make-an-appointment">可预约总量<span>99999</span>人</p>
        </div>
        <div class="number-of-people">
            <span v-for="(item, index) in numberOfPeople" :key="index">{{ item }}</span>
        </div>

        <!-- 展示echarts水晶图 容器 -->
        <div class="crystal-chart" ref="crystalChartRef"></div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

//引入echarts
import * as echarts from 'echarts';
//引入echarts水晶图插件
import 'echarts-liquidfill'

//定义展示人数
const numberOfPeople = '215908人';

//定义水晶图组件实例
const crystalChartRef = ref();


// 基于准备好的dom，初始化echarts实例


onMounted(() => {
    const myChart = echarts.init(crystalChartRef.value);
    myChart.setOption({
        title: {
            text: '水晶图'
        },
        series: {
            type: 'liquidFill',
            data: [0.6],
            name: 'Liquid Fill',
            // radius: '100%',
            // waveAnimation: true,
            // animationDurationUpdate: 0,
            // outline: {
            //     // show: true,
            //     // borderDistance: 8,
            //     // itemStyle: {

            //     // }
            // }
        },
        tooltip: {
            show: true
        }
    });
});

</script>





<style scoped lang="scss">
.container {
    margin-top: 20px;
    width: 100%;

    .top {
        display: flex;
        // width: 100%;

        .title {
            color: white;
            font-size: 20px;
        }

        .tourist-icon {
            width: 68px;

            height: 7px;
        }



        .make-an-appointment {
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number-of-people {
        display: flex;
        margin-top: 30px;
        padding: 10;

        span {
            flex: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;

        }
    }

    .crystal-chart {
        width: 100%;
        height: 250px;
    }
}
</style>