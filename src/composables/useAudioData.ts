import { onMounted, reactive, ref } from "vue"
import { onBeforeRouteLeave } from "vue-router"
import { songsCollection, auth, DocumentData } from "@/includes/firebase"

export interface ISong extends DocumentData {
  docId: string
}

export const useAudioData = (isInit = false) => {
  const songs = reactive<ISong[]>([])
  const unsavedFlag = ref(false)

  const fetchAudios = async () => {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser?.uid)
      .get()

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
    if (isInit) {
      fetchAudios()
    }
  })

  return {
    songs,
    fetchAudios,
    updateSong,
    removeSong,
    addSong,
    updateUnsavedFlag
  }
}
