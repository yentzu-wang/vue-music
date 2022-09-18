import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/user"
import { auth } from "@/includes/firebase"

export const useAuth = () => {
  const { userLoggedIn } = storeToRefs(useUserStore())

  onMounted(() => {
    if (auth.currentUser) {
      userLoggedIn.value = true
    }
  })
}
