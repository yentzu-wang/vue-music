import { onMounted, reactive } from "vue"
import { songsCollection, auth, DocumentData } from "@/includes/firebase"

export interface ISong extends DocumentData {
  docId: string
}

export const useAudioData = () => {
  const songs = reactive<ISong[]>([])

  async function fetchAudios() {
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

  async function test() {
    songs[0].modifiedName = "test"
  }

  onMounted(fetchAudios)

  return { songs, fetchAudios, test }
}
