<template>
  <div
    v-if="currentSong?.modifiedName"
    class="fixed bottom-0 left-0 w-full bg-white px-4 pt-2 pb-6 shadow-lg-reverse"
  >
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">{{ currentSong.modifiedName }}</span>
      uploaded by
      <span class="song-artist">{{ currentSong.displayName }}</span>
    </div>
    <div class="flex flex-nowrap items-center gap-4">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          class="fa text-xl text-gray-500"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        />
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="relative h-2 w-full cursor-pointer rounded bg-gray-200"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-lg text-gray-800"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { usePlayerStore } from "@/stores/player"

const store = usePlayerStore()
const { toggleAudio, updateSeek } = store
const { playing, seek, duration, playerProgress, currentSong } =
  storeToRefs(store)
</script>
