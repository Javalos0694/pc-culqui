import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'card',
        component: () => import("@/components/createCard.vue")
    },
    {
        path: '/card',
        name: 'cardDetail',
        component: () => import("@/components/getCard.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;