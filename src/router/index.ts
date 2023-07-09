import { createRouter, createWebHashHistory } from 'vue-router';

import { constantRoute } from '@/router/routes.ts'
import type { RouteRecordRaw } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: constantRoute as RouteRecordRaw[]
});