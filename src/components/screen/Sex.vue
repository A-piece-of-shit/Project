<template>
    <div class="sex">
        <div class="title">
            <p>男女比例</p>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>

        </div>
        <div class="content">
            <div class="man">
                <Svg name="commoditymanagement-screen-man" width="115px" height="115px"></Svg>

            </div>
            <div class="woman">
                <Svg name="commoditymanagement-screen-woman" width="115px" height="115px"></Svg>

            </div>


        </div>

        <div class="scale">
            <p>男士58%</p>
            <p>男士42%</p>
        </div>

        <!-- 展示echart男女比例 容器 -->
        <div class="scale-chart" ref="scaleChartRef"></div>



    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

//引入echarts
import * as echarts from 'echarts';

const scaleChartRef = ref();

onMounted(() => {
    const myChart = echarts.init(scaleChartRef.value);
    myChart.setOption({
        title: {
            text: '男女比例',
            textStyle: { color: 'skyblue' },
            left: '40%'
        },
        xAxis: { show: false, min: 0, max: 100 },
        yAxis: { show: false, type: 'category' },
        series: [
            { type: 'bar', data: [58], barWidth: 20, z: 100, itemStyle: { color: 'blue', borderRadius: 20 } },
            { type: 'bar', data: [100], barWidth: 20, itemStyle: { color: 'pink', borderRadius: 20 }, barGap: '-100%' }
        ],
        grid: { left: 0, top: 0, right: 0, bottom: 0 }
    });
});
</script>





<style scoped lang="scss">
.sex {
    width: 100%;
    height: 100%;
    margin-top: 20px;

    .title {
        color: white;
        font-size: 20px;
    }

    .content {
        display: flex;
        justify-content: space-around;

        .man {
            margin-top: 20px;
        }

        .woman {
            margin-top: 20px;
        }
    }

    .scale {
        display: flex;
        justify-content: space-between;
        color: white;
    }

    .scale-chart {
        height: 100px;
    }
}
</style>