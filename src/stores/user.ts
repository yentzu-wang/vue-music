import { ref } from "vue"
import { defineStore } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { auth, usersCollection } from "@/includes/firebase"

export const useUserStore = defineStore("user", () => {
  const router = useRouter()
  const route = useRoute()
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
    const userCred = await auth.createUserWithEmailAndPassword(email, password)
    await usersCollection
      .doc(userCred.user?.uid)
      .set({ name, email, age, country })
    await userCred.user?.updateProfile({ displayName: name })

    userLoggedIn.value = true
  }

  async function authenticate({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    await auth.signInWithEmailAndPassword(email, password)
    userLoggedIn.value = true
  }

  async function signOut() {
    await auth.signOut()
    userLoggedIn.value = false

    if (route.meta?.requiresAuth) {
      router.push({ name: "home" })
    }
  }

  return { userLoggedIn, register, authenticate, signOut }
})
