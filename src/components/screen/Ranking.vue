<template>
    <div class="rank">
        <div class="title">
            <p>热门景区排行</p>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>

        </div>

        <!-- 展示echart排行 容器 -->
        <div class="rank-chart" ref="rankeChartRef"></div>



    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

//引入echarts
import * as echarts from 'echarts';

const rankeChartRef = ref();

onMounted(() => {
    const myChart = echarts.init(rankeChartRef.value);
    myChart.setOption({
        title: { text: '景区排行', left: '50%', textStyle: { fontSize: 20, color: 'yellowgreen' }, subtext: '各大景区排行' },
        xAxis: { type: 'category' },
        yAxis: {},
        grid: { top: 50, left: 0, right: 0, bottom: 0 },
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50],
                label: {
                    show: true,
                    position: 'insideTop', color: 'yellowgreen'
                },
                showBackground: true,
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#f0acf7' // 0% 处的颜色
                        }, {
                            offset: 0.5, color: '#acf7f0' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#f7f0ac' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false







                    },
                },
                itemStyle: {
                    borderRadius: [5, 5, 0, 0],
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#fffcdc' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#d9a7c7' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false



                    },
                },

            },
        ],
        tooltip: { backgroundColor: '#d9a7c7' }

    });
});
</script>





<style scoped lang="scss">
.rank {
    width: 100%;
    height: 100%;
    margin-top: 20px;

    .title {
        color: white;
        font-size: 20px;
    }

    .rank-chart {
        width: 100%;
        height: calc(100% - 40px);
        // background-color: red;
    }

}
</style>