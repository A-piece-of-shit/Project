<template>
    <div class="box" :style="`background-image: url(${imgStatic}/bg-16c5dcec.png);`">
        <!-- 数据大屏展示区域 -->
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="bottom">

                <div class="left">

                    <Tourist class="tourits"></Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>

                </div>

                <div class="center">

                    <Map class="map"></Map>
                    <Statistics class="statistics"></Statistics>

                </div>

                <div class="right">

                    <Ranking class="ranking"></Ranking>
                    <Quantity class="quantity"></Quantity>
                    <Channel class="channel"></Channel>

                </div>

            </div>

        </div>

    </div>
</template>

<script  setup lang="ts">
import { ref, onMounted } from 'vue';

//引入数据大屏顶部组件
import Top from '@/components/screen/Top.vue'
//引入数据大屏左侧 游客比例、性别比例、年龄比例 组件
import Tourist from '@/components/screen/Tourist.vue'
import Sex from '@/components/screen/Sex.vue'
import Age from '@/components/screen/Age.vue'

//引入数据大屏中间 地图、游客统计 组件
import Map from '@/components/screen/Map.vue'
import Statistics from '@/components/screen/Statistics.vue'

//引入数据大屏右侧 排行、数量、渠道 组件
import Ranking from '@/components/screen/Ranking.vue'
import Quantity from '@/components/screen/Quantity.vue'
import Channel from '@/components/screen/Channel.vue'


//引入图片静态资源路径
const imgStatic = import.meta.env.VITE_STATIC;

//定义数据大屏实例
const screen = ref();

onMounted(() => {
    screen.value.style.transform = `scale(${getZoomRatio()}) translate(-50%,-50%)`;
});

//获取缩放比例
const getZoomRatio = (width = 1920, height = 1080) => {
    const widthScale = window.innerWidth / width;
    const heightScale = window.innerHeight / height;

    return widthScale < heightScale ? widthScale : heightScale;
};

window.onresize = () => {
    screen.value.style.transform = `scale(${getZoomRatio()}) translate(-50%,-50%)`;
};

</script>


<style scoped lang="scss">
.box {
    width: 100vw;
    height: 100vh;
    // background-image: url(bg-16c5dcec.png);
    background-size: 100%, 100%;

    .screen {
        position: fixed;
        top: 50%;
        left: 50%;

        width: 1920px;
        height: 1080px;

        transform-origin: top left;
        // background-color: red;

        .top {
            width: 100%;
            height: 60px;
            // background-color: aqua;
        }

        .bottom {
            width: 100%;
            display: flex;

            .left {
                display: flex;
                flex: 1;

                height: 1020px;

                flex-direction: column;

                .tourits {
                    flex: 1;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    flex: 1;
                }

            }

            .center {
                // width: 50%;
                flex: 2;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 3;
                }

                .statistics {
                    flex: 1;
                }
            }

            .right {
                // width: 25%;
                flex: 1;
                display: flex;
                flex-direction: column;

                .ranking {
                    flex: 1.5;
                }

                .quantity {
                    flex: 1;
                }

                .channel {
                    flex: 1;
                }
            }

        }
    }
}
</style>