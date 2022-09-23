<template>
  <div class="fixed bottom-0 left-0 w-full bg-white px-4 py-2">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap items-center gap-4">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          class="fa text-xl text-gray-500"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="relative h-2 w-full cursor-pointer rounded bg-gray-200">
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-lg text-gray-800"
          style="left: 50%"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { usePlayerStore } from "@/stores/player"

const store = usePlayerStore()
const { toggleAudio } = store
const { playing } = storeToRefs(store)
</script>
