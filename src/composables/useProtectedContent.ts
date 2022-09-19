import { storeToRefs } from "pinia"
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router"
import { useUserStore } from "@/stores/user"

export const useProtectedContent = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { userLoggedIn } = storeToRefs(useUserStore())

  if (!userLoggedIn.value && to.meta?.requiresAuth) {
    next({ name: "home" })

    return
  }

  next()
}
