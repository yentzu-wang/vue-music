<template>
  <AppHeader />
  <router-view />
  <Auth />
</template>

<script setup>
import AppHeader from "@/components/Header.vue"
import Auth from "@/components/Auth.vue"
import { useAuth } from "@/composables/useAuth"

useAuth()
</script>
