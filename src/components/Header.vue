<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center justify-start py-5 px-4">
      <!-- App Name -->
      <router-link
        class="mr-4 text-2xl font-bold uppercase text-white"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </router-link>
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="mt-1 flex flex-row">
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">
              About
            </router-link>
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
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">
                Manage
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click="signOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useAuthModal } from "@/composables/useAuthModal"
import { useAuth } from "@/composables/useAuth"

const { toggleAuthModal } = useAuthModal()
const { userLoggedIn, signOut } = useAuth()
const { locale } = useI18n()
const currentLocale = computed(() =>
  locale.value === "en" ? "English" : "中文"
)

const changeLocale = () => {
  locale.value = locale.value === "en" ? "zh-tw" : "en"
}
</script>
