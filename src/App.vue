<template>
  <AppHeader />
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
