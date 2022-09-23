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
  const playerProgress = ref("0%")

  const playing = computed(() => sound.value?.playing && sound.value?.playing())

  async function newSong(song: ISong | undefined) {
    if (!song) {
      return
    }

    if (sound.value?.playing() && song.url === currentSong.value?.url) {
      sound.value?.pause()

      return
    }

    if (sound.value instanceof Howl) {
      sound.value.unload()
    }

    currentSong.value = song
    sound.value = new Howl({
      src: [song.url as string],
      html5: true
    })

    sound.value.play()
    sound.value.on("play", () => requestAnimationFrame(progress))
  }

  function toggleAudio() {
    if (!sound.value?.playing) {
      return
    }

    sound.value?.playing() ? sound.value?.pause() : sound.value?.play()
  }

  function updateSeek(e: MouseEvent) {
    if (!sound.value?.playing) {
      return
    }

    const { x, width } = (
      e.currentTarget as HTMLElement
    ).getBoundingClientRect()
    const clickX = e.clientX - x
    const percentage = clickX / width
    const seconds = sound.value.duration() * percentage

    sound.value.seek(seconds)
    sound.value.once("seek", progress)
  }

  function progress() {
    seek.value = formatTime(sound.value?.seek())
    duration.value = formatTime(sound.value?.duration())

    playerProgress.value = `${
      ((sound.value?.seek() as number) / (sound.value?.duration() as number)) *
      100
    }%`

    if (sound.value?.playing()) {
      requestAnimationFrame(progress)
    }
  }

  return {
    currentSong,
    playing,
    seek,
    duration,
    playerProgress,
    newSong,
    toggleAudio,
    updateSeek
  }
})
