import { ref } from "vue"
import { useUserStore } from "@/stores/user"

export const useLogin = () => {
  const loginInSubmission = ref(false)
  const loginShowAlert = ref(false)
  const loginAlertVariant = ref("bg-blue-500")
  const loginAlertMsg = ref("Please wait! Your account is being created.")
  const store = useUserStore()

  const login = async (values: { email: string; password: string }) => {
    loginShowAlert.value = true
    loginInSubmission.value = true
    loginAlertVariant.value = "bg-blue-500"
    loginAlertMsg.value = "Please wait! We are logging you in."

    try {
      await store.authenticate(values)

      loginAlertVariant.value = "bg-green-500"
      loginAlertMsg.value = "Succcess! You are now logged in."
      window.location.reload()
    } catch (error) {
      loginInSubmission.value = false
      loginAlertVariant.value = "bg-red-500"
      loginAlertMsg.value =
        "An unexpected error occured. Please try again later."
    }
  }

  return {
    loginInSubmission,
    loginShowAlert,
    loginAlertVariant,
    loginAlertMsg,
    login
  }
}
