<template>
    <div>{{ props }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps(['scope'])


</script>