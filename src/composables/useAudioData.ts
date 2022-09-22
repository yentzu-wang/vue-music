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

    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docId: document.id
      }

      songs.push(song)
    })
  }

  const updateSong = async (
    i: number,
    values: { modifiedName: string; genre: string }
  ) => {
    songs[i].modifiedName = values.modifiedName
    songs[i].genre = values.genre
  }

  const removeSong = async (i: number) => {
    songs.splice(i, 1)
  }

  onMounted(() => {
    if (isInit) {
      fetchAudios()
    }
  })

  return { songs, fetchAudios, updateSong, removeSong }
}
