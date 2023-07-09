<template>
    <div class="age">
        <div class="title">
            <p>年龄比例</p>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>
            <Svg name="commoditymanagement-screen-fire"></Svg>

        </div>
        <!-- <div class="content">
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
        </div> -->

        <!-- 展示echart年龄比例 容器 -->
        <div class="age-chart" ref="ageChartRef"></div>



    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

//引入echarts
import * as echarts from 'echarts';

const ageChartRef = ref();

onMounted(() => {
    const myChart = echarts.init(ageChartRef.value);
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 20,
            // left: 'center',
            right: 20,
            orient: 'vertical',
            textStyle: { color: 'white', fontSize: 14 }
        },
        series: [
            {
                left: -200,
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ]
            }
        ],
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };

    option && myChart.setOption(option);
});
</script>





<style scoped lang="scss">
.age {
    width: 100%;
    height: 100%;

    .title {
        color: white;
        font-size: 20px;
    }


    .age-chart {
        width: 100%;
        height: 260px;
    }

}
</style>