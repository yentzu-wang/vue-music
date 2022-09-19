import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import { useProtectedContent } from "@/composables/useProtectedContent"

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
      // alias: "/manage",
      name: "manage",
      component: () => import("@/views/Manage.vue"),
      meta: {
        requiresAuth: true
      }
    },
    { path: "/manage", redirect: { name: "manage" } },
    { path: "/:catchAll(.*)*", redirect: { name: "home" } }
  ]
})

router.beforeEach(useProtectedContent)

export default router
