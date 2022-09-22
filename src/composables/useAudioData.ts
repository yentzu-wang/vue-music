import { onMounted, reactive } from "vue"
import { songsCollection, auth, DocumentData } from "@/includes/firebase"

export interface ISong extends DocumentData {
  docId: string
}

export const useAudioData = (isInit = false) => {
  const songs = reactive<ISong[]>([])

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

  onMounted(() => {
    if (isInit) {
      fetchAudios()
    }
  })

  return { songs, fetchAudios, updateSong, removeSong, addSong }
}
