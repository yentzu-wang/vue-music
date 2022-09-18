import { ref } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  const userLoggedIn = ref(false)

  return { userLoggedIn }
})
