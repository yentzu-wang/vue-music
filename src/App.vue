<template>
  <AppHeader />
  <router-view />
  <Player />
  <Auth />
</template>

<script setup>
import AppHeader from "@/components/Header.vue"
import Player from "@/components/Player.vue"
import Auth from "@/components/Auth.vue"
import { useAuth } from "@/composables/useAuth"

useAuth()
</script>
