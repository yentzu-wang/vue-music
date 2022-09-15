<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center justify-start py-5 px-4">
      <!-- App Name -->
      <a class="mr-4 text-2xl font-bold uppercase text-white" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="mt-1 flex flex-row">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
// import { storeToRefs } from "pinia"
import { useModalStore } from "@/stores/modal"

const store = useModalStore()

// const { isOpen } = storeToRefs(store)

const toggleAuthModal = () => {
  store.isOpen = !store.isOpen
  // store.$patch((state) => {
  //   state.isOpen = !state.isOpen
  // })

  // isOpen.value = !isOpen.value

  // console.log(store.isOpen)
}
</script>
