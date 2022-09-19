import { storeToRefs } from "pinia"
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router"
import { useUserStore } from "@/stores/user"

export const useProtectedContent = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { userLoggedIn } = storeToRefs(useUserStore())

  if (!userLoggedIn.value) {
    next({ name: "home" })

    return
  }

  next()
}
