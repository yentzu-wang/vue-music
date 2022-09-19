<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center justify-start py-5 px-4">
      <!-- App Name -->
      <router-link
        class="mr-4 text-2xl font-bold uppercase text-white"
        to="/"
        exact-active-class="no-active"
      >
        Music
      </router-link>
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="mt-1 flex flex-row">
          <li>
            <router-link class="px-2 text-white" to="/about">About</router-link>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
            >
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage">
                Manage
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthModal } from "@/composables/useAuthModal"
import { useAuth } from "@/composables/useAuth"

const { toggleAuthModal } = useAuthModal()
const { userLoggedIn, signOut } = useAuth()
</script>
