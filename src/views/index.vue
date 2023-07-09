<template>
    <el-container class="layout-container-demo" style="height: 100vh">

        <!-- 左侧菜单 -->
        <el-aside class="left-menu" :class="{ fold: isfold }">

            <!-- 左侧菜单logo与标题 -->
            <div class="left-menu-logo">
                <div>
                    <Svg class="logo" name="logo" width="30px" height="30px"></Svg>
                </div>
                <p v-show="!isfold" style="transition: all 0.3s;" class="animate__animated animate__slideInRight">{{
                    setting.title
                }}</p>
            </div>

            <!-- 菜单选项 -->
            <el-scrollbar>
                <el-menu :default-active="Route.path" unique-opened router :collapse="isfold">
                    <Menu :menuList="userStore.menuRouters"></Menu>
                </el-menu>
            </el-scrollbar>

        </el-aside>

        <!-- 右侧导航与内容 -->
        <el-container class="right-body" :class="{ fold: isfold }">

            <!-- 导航栏 -->
            <el-header class="right-header" style="text-align: right; font-size: 12px">

                <!-- 左侧管理 -->
                <div class="management">



                    <Svg name="fold" width="20" height="20" style="cursor: pointer; transition: all 0.3s;"
                        :class="[isfold ? 'left-hand-rotation' : '', isfold ? '' : 'right-hand-rotation']"
                        @click="isfold = !isfold">
                    </Svg>


                    <el-breadcrumb :separator-icon="ArrowRight" class="bread-crumbs">

                        <template v-for="item in Route.matched" :key="item.path">
                            <el-breadcrumb-item v-if="item.meta.title">{{ item.meta.title }}</el-breadcrumb-item>
                        </template>

                    </el-breadcrumb>
                </div>

                <!-- 右侧工具  -->
                <div class="toolbar">



                    <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
                        <Svg width="20" height="20" name="refresh" style="cursor: pointer; margin-right: 3vw;"
                            @click="refresh" class="shadow"></Svg>
                    </el-tooltip>


                    <el-tooltip class="box-item" effect="dark" content="全屏模式" placement="bottom">
                        <Svg width="20" height="20" name="fullscreen" style="cursor: pointer; margin-right: 3vw;"
                            @click="fullScreen" class="shadow"></Svg>
                    </el-tooltip>

                    <!-- <el-switch v-model="darkTheme" class="mb-2" active-text="暗黑主题" inactive-text="默认主题" /> -->
                    <el-tooltip class="box-item" effect="dark" content="主题切换" placement="bottom">
                        <el-switch v-model="darkTheme" class="mt-2" style="margin-right: 3vw;" inline-prompt
                            :active-icon="Moon" :inactive-icon="Sunny" @change="switchTopic" />
                    </el-tooltip>





                    <!-- <Svg width="20" height="20" name="topic" style="cursor: pointer; margin-right: 3vw;"></Svg> -->
















                    <!-- 头像 -->
                    <el-dropdown>
                        <!-- <img :src="`data:image/webp;base64,${userStore.useravatar}`" alt="个人头像" ref="useravatar"> -->
                        <el-avatar :src="`data:image/webp;base64,${userStore.useravatar}`" :icon="UserFilled" alt="个人头像"
                            ref="useravatar" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="comeIntoMy">我的</el-dropdown-item>
                                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

            </el-header>


            <!-- 内容 -->
            <el-main class="right-main">
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <component :is="Component" v-if="isRanderMain" />
                    </transition>

                </router-view>
            </el-main>

        </el-container>

    </el-container>
</template>
  
<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'

import { useRoute, useRouter } from 'vue-router'
const Route = useRoute();
const Router = useRouter();



//引入项目的页面配置文件
import setting from '@/setting.ts';

//引入用户数据仓库
import useUserStore from '@/store/modules/user.ts';
const userStore = useUserStore();


//引入组件
import Menu from '@/views/Menu.vue'


//引入面包屑的图标
import { ArrowRight, Sunny, Moon, UserFilled } from '@element-plus/icons-vue'
import router from '@/router';

import { SET_THEME, REMOVE_THEME } from '@/utils/token.ts'



onMounted(async () => {
    //获取用户仓库数据
    try {
        await userStore.userInfo();

        const html = document.documentElement;
        darkTheme.value ? html.className = 'dark' : html.className = ''



    } catch (error) {

        logout();
    }
});



const useravatar = ref();

//是否折叠左侧菜单栏标志
const isfold = ref(false);

//是否渲染页面内容标志
const isRanderMain = ref(true);

//点击刷新图标事件
const refresh = () => {
    isRanderMain.value = false;
    nextTick(() => { isRanderMain.value = true; });
};

//点击全屏图标事件
const fullScreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
};

//点击头像退出登录事件
const logout = async () => {
    await userStore.userLogout();
    Router.push({ name: 'Login', query: { redirect: Route.path } });
};


//点击我的回调事件
const comeIntoMy = () => {
    router.push({ path: '/mine' });
};

//控制当前主题是否为暗黑模式
const darkTheme = ref<boolean>(userStore.isDarkMode ? true : false);

//切换主体按钮改变事件回调
const switchTopic = () => {
    // console.log(darkTheme.value);
    const html = document.documentElement;
    if (darkTheme.value) {
        html.className = 'dark';
        SET_THEME();
    } else {
        html.className = '';
        REMOVE_THEME();
    };
    // darkTheme.value ? html.className = 'dark' : html.className = '';
};

</script>
  
<style scoped lang="scss">
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.left-menu {
    overflow: hidden;

    width: $base-left-menu-width;

    transition: all 0.3s;

    &.fold {
        width: $base-left-menu-fold-width;
    }

    .left-menu-logo {
        display: flex;
        align-items: center;
        width: 100%;
        // 高度与右侧导航一致
        height: $base-right-header-height ;

        .logo {
            margin: 0 20px 0 15px;
        }

    }
}


.right-body {
    transition: all 0.3s;
    width: calc(100vw - $base-left-menu-width);

    &.fold {
        width: calc(100vw - $base-left-menu-fold-width);
    }

    .right-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: $base-right-header-height;


        .management {
            display: flex;


            .left-hand-rotation {
                transform: rotate(0deg);
            }


            .right-hand-rotation {
                transform: rotate(180deg);
            }


            .bread-crumbs {
                // width: 50%;
                margin-left: 10px;
                line-height: 20px;
            }
        }

        .toolbar {
            img {
                width: 50px;
                border-radius: 4px;
                cursor: pointer;
            }



            .shadow {
                box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
            }
        }

    }

    .right-main {
        padding: 10px;
    }
}





.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all, 1s;
}

.fade-enter-to {
    opacity: 1;
}
</style>