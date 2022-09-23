import { ref } from "vue"
import { defineStore } from "pinia"
import { Howl } from "howler"
import { ISong } from "@/composables/useMusicDetail"

export const usePlayerStore = defineStore("player", () => {
  const currentSong = ref<ISong>()
  const sound = ref<Howl>()

  async function newSong(song: ISong | undefined) {
    if (!song) {
      return
    }

    currentSong.value = song

    sound.value = new Howl({
      src: [song?.url || ""],
      html5: true
    })

    sound.value.play()
  }

  return { currentSong, newSong }
})
