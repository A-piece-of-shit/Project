<template>
    <template v-for="item in menuList " :key="item.path">
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
            <el-icon> <Svg :name="item.meta.icon"></Svg> </el-icon>
            <template #title>
                {{ item.meta.title }}

            </template>
        </el-menu-item>
        <el-menu-item v-if="item.children && item.children.length === 1" :index="item.children[0].path">
            <el-icon> <Svg :name="item.children[0].meta.icon"></Svg> </el-icon>
            <template #title>
                {{ item.children[0].meta.title }}
            </template>
        </el-menu-item>
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon> <Svg :name="item.meta.icon"></Svg> </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">

defineProps(['menuList']);
</script>

<style scoped lang="scss"></style>
