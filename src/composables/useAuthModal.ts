import { storeToRefs } from "pinia"
import { useModalStore } from "@/stores/modal"

export const useAuthModal = () => {
  const { isOpen } = storeToRefs(useModalStore())

  const toggleAuthModal = () => {
    isOpen.value = !isOpen.value
  }

  return { toggleAuthModal }
}
