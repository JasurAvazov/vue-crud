import { createRouter, createWebHistory } from 'vue-router'
import TheMainPage from '../views/MainPage.vue'
import CreatePage from '../views/CreatePage.vue'
import UpdatePage from '../views/UpdatePage.vue'
import UpdateLookPage from '../views/UpdateLookPage.vue'
import ReadAllPage from '../views/ReadAllPage.vue'
import ReadPage from "../views/ReadPage.vue";
import ReadRandomPage from "../views/ReadRandomPage.vue";
import DeletePage from "../views/DeletePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: TheMainPage
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePage
        },
        {
            path: "/update/:id",
            name: "update",
            component: UpdatePage,
        },
        {
            path: "/update",
            name: "updatelook",
            component: UpdateLookPage,
        },
        {
            path: "/readall",
            name: "readall",
            component: ReadAllPage,
        },
        {
            path: "/quotes/:id",
            name: "quotes",
            component: ReadPage,
        },
        {
            path: "/read/random",
            name: "readrandom",
            component: ReadRandomPage,
        },
        {
            path: "/delete",
            name: "DeletePage",
            component: DeletePage,
        },
    ]
})


export default router