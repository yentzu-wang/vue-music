import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "text-yellow-500",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/About.vue")
    },
    {
      path: "/manage-music",
      name: "manage",
      component: () => import("@/views/Manage.vue")
    },
    { path: "/manage", redirect: { name: "manage" } },
    { path: "/:catchAll(.*)*", redirect: { name: "home" } }
  ]
})

export default router
