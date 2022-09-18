import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/user"

const useRegister = () => {
  const regInSubmission = ref(false)
  const regShowAlert = ref(false)
  const regAlertVariant = ref("bg-blue-500")
  const regAlertMsg = ref("Please wait! Your account is being created.")
  const store = useUserStore()

  const { userLoggedIn } = storeToRefs(store)

  const register = async (values: {
    name: string
    email: string
    password: string
    age: number
    country: string
  }) => {
    regShowAlert.value = true
    regInSubmission.value = true
    regAlertVariant.value = "bg-blue-500"
    regAlertMsg.value = "Please wait! Your account is being created."

    try {
      await store.register(values)

      regAlertVariant.value = "bg-green-500"
      regAlertMsg.value = "Succcess! Your account has been created."
    } catch (error) {
      regInSubmission.value = false
      regAlertVariant.value = "bg-red-500"
      regAlertMsg.value = "An unexpected error occured. Please try again later."
    }
  }

  return {
    regInSubmission,
    regShowAlert,
    regAlertVariant,
    regAlertMsg,
    register
  }
}

export default useRegister
