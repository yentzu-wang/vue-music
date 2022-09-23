import { ref } from "vue"
import { defineStore } from "pinia"
import { ISong } from "@/composables/useMusicDetail"

export const usePlayerStore = defineStore("player", () => {
  const currentSong = ref<ISong>()

  async function newSong(song: ISong | undefined) {
    currentSong.value = song
  }

  return { currentSong, newSong }
})
