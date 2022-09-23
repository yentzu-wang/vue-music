import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { Howl } from "howler"
import { ISong } from "@/composables/useMusicDetail"

export const usePlayerStore = defineStore("player", () => {
  const currentSong = ref<ISong>()
  const sound = ref<Howl>()

  const playing = computed(() => sound.value?.playing && sound.value?.playing())

  async function newSong(song: ISong | undefined) {
    if (!song) {
      return
    }

    currentSong.value = song
    sound.value = new Howl({
      src: [song.url as string],
      html5: true
    })

    sound.value.play()
  }

  async function toggleAudio() {
    if (!sound.value?.playing) {
      return
    }

    console.log(sound.value?.playing())

    sound.value?.playing() ? sound.value?.pause() : sound.value?.play()
  }

  return { currentSong, playing, newSong, toggleAudio }
})
