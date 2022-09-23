import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { Howl } from "howler"
import { ISong } from "@/composables/useMusicDetail"
import { formatTime } from "@/includes/helper"

export const usePlayerStore = defineStore("player", () => {
  const currentSong = ref<ISong>()
  const sound = ref<Howl>()
  const seek = ref<string | number>("00:00")
  const duration = ref<string | number>("00:00")

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

    sound.value.on("play", () => {
      requestAnimationFrame(progress)
    })
  }

  async function toggleAudio() {
    if (!sound.value?.playing) {
      return
    }

    sound.value?.playing() ? sound.value?.pause() : sound.value?.play()
  }

  function progress() {
    seek.value = formatTime(sound.value?.seek())
    duration.value = formatTime(sound.value?.duration())

    if (sound.value?.playing()) {
      requestAnimationFrame(progress)
    }
  }

  return { currentSong, playing, seek, duration, newSong, toggleAudio }
})
