import { createRouter, createWebHistory } from "vue-router"
import { useProtectedContent } from "@/composables/useProtectedContent"

const Home = () => import("@/views/Home.vue")
const About = () => import("@/views/About.vue")
const Manage = () => import("@/views/Manage.vue")
const Song = () => import("@/views/Song.vue")

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
      component: About
    },
    {
      path: "/manage-music",
      // alias: "/manage",
      name: "manage",
      component: Manage,
      meta: {
        requiresAuth: true
      }
    },
    { path: "/manage", redirect: { name: "manage" } },
    {
      name: "song",
      path: "/song/:id",
      component: Song
    },
    { path: "/:catchAll(.*)*", redirect: { name: "home" } }
  ]
})

router.beforeEach(useProtectedContent)

export default router
