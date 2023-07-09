<template>
    <!-- 展示echart年龄比例 容器 -->
    <div class="map-chart" ref="mapChartRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

//引入echarts
import * as echarts from 'echarts';
//引入地图经纬度数据
import * as  mapData from '@/jsonData/china.json';



const mapChartRef = ref();

echarts.registerMap('china', mapData as any);


onMounted(() => {
    const myChart = echarts.init(mapChartRef.value);
    myChart.setOption({
        geo: {
            map: 'china',
            roam: true,
            label: { show: true, color: 'white', fontSize: 14 },
            itemStyle: {

                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#91EAE4' // 0% 处的颜色
                    }, {
                        offset: 0.5, color: '#86A8E7' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#7F7FD5' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },

                // background: #7F7FD5;  /* fallback for old browsers */
                // background: -webkit - linear - gradient(to right, #91EAE4, #86A8E7, #7F7FD5);  /* Chrome 10-25, Safari 5.1-6 */
                // background: linear - gradient(to right, #91EAE4, #86A8E7, #7F7FD5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                opacity: .8
            },
            //高亮展示设置
            emphasis: {
                itemStyle: {
                    color: 'red'
                },
                label: { fontSize: 40 }
            }
        },
        grid: { top: 0, left: 0, right: 0, bottom: 0 },
        series: [{
            type: 'lines',
            data: [
                { coords: [[116.405285, 39.904989], [108.948024, 34.263161]], lineStyle: { width: 5 } },
                { coords: [[116.405285, 39.904989], [119.306239, 26.075302]], lineStyle: { width: 5 } },
                { coords: [[116.405285, 39.904989], [117.000923, 36.675807]], lineStyle: { width: 5 } },
                { coords: [[116.405285, 39.904989], [114.298572, 30.584355]], lineStyle: { width: 5 } },



            ],
            effect: { show: true, symbol: 'arrow', symbolSize: 10, }
        }]
    });
});
</script>





<style scoped lang="scss">
.map-chart {
    width: 100%;
    height: 100%;
}
</style>