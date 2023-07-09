<template>
    <svg :style="{ width, height }">
        <use :xlink:href="prefix + name"></use>
    </svg>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue';

defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: String,
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
});
</script>