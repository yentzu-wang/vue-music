import { onMounted, reactive } from "vue"
import { songsCollection, auth, DocumentData } from "@/includes/firebase"

export const useAudioData = () => {
  interface ISong extends DocumentData {
    docId: string
  }

  const songs = reactive<ISong[]>([])

  onMounted(async () => {
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
  })

  return { songs }
}
