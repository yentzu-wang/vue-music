import { ref } from "vue"
import { defineStore } from "pinia"
import { auth, usersCollection } from "@/includes/firebase"

export const useUserStore = defineStore("user", () => {
  const userLoggedIn = ref(false)

  async function register({
    name,
    email,
    password,
    age,
    country
  }: {
    name: string
    email: string
    password: string
    age: number
    country: string
  }) {
    await auth.createUserWithEmailAndPassword(email, password)
    await usersCollection.add({ name, email, age, country })

    userLoggedIn.value = true
  }

  return { userLoggedIn, register }
})
