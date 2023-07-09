<template>
    <div class="quantity">
        <div class="title">
            <p>年度游客量对比</p>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>

        </div>

        <!-- 展示echart数量比例 容器 -->
        <div class="quantity-chart" ref="quantityChartRef"></div>



    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

//引入echarts
import * as echarts from 'echarts';

const quantityChartRef = ref();

onMounted(() => {
    const myChart = echarts.init(quantityChartRef.value);
    myChart.setOption({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }
        ],
        grid: { top: 0, left: 0, right: 0, bottom: 0 }
    });
});
</script>





<style scoped lang="scss">
.quantity {
    width: 100%;
    height: 100%;
    margin-top: 20px;

    .title {
        color: white;
        font-size: 20px;
    }

    .quantity-chart {
        width: 100%;
        height: calc(100% - 40px);
    }

}
</style>