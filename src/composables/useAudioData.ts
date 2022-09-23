import { onMounted, reactive, ref, onBeforeUnmount } from "vue"
import { onBeforeRouteLeave } from "vue-router"
import { songsCollection, auth, DocumentData } from "@/includes/firebase"

export interface ISong extends DocumentData {
  docId: string
  modifiedName: string
  displayName: string
  originalName: string
  url: string
  genre: string
  commentCount: number
}

export const useAudioData = (isLandingPage = false) => {
  const songs = reactive<ISong[]>([])
  const unsavedFlag = ref(false)

  const getSongs = async (isLandingPage = false) => {
    const snapshot = isLandingPage
      ? await songsCollection.get()
      : await songsCollection.where("uid", "==", auth.currentUser?.uid).get()

    snapshot.forEach(addSong)
  }

  const updateSong = (
    i: number,
    values: { modifiedName: string; genre: string }
  ) => {
    songs[i].modifiedName = values.modifiedName
    songs[i].genre = values.genre
  }

  const removeSong = (i: number) => {
    songs.splice(i, 1)
  }

  const addSong = (document: DocumentData) => {
    const song = {
      ...document.data(),
      docId: document.id
    }

    songs.push(song)
  }

  const updateUnsavedFlag = (value: boolean) => {
    unsavedFlag.value = value
  }

  function handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (bottomOfWindow) {
      console.log("Bottom of window")
    }
  }

  onBeforeRouteLeave((to, from, next) => {
    if (!unsavedFlag.value) {
      next()
    } else {
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      )
      next(leave)
    }
  })

  onMounted(() => {
    getSongs(isLandingPage)

    window.addEventListener("scroll", handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return {
    songs,
    getSongs,
    updateSong,
    removeSong,
    addSong,
    updateUnsavedFlag
  }
}
