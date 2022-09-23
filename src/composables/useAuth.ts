import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/user"
import { auth } from "@/includes/firebase"

export const useAuth = () => {
  const store = useUserStore()
  const { userLoggedIn } = storeToRefs(useUserStore())

  const signOut = store.signOut

  onMounted(() => {
    if (auth.currentUser && userLoggedIn.value !== true) {
      userLoggedIn.value = true
    }
  })

  return { userLoggedIn, signOut }
}
