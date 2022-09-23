import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { songsCollection, DocumentData } from "@/includes/firebase"

export interface ISong extends DocumentData {
  docId?: string
  modifiedName?: string
  displayName?: string
  originalName?: string
  url?: string
  genre?: string
  commentCount?: number
}

export const useMusicDetail = () => {
  const song = ref<ISong>()
  const router = useRouter()
  const {
    params: { id }
  } = useRoute()

  onMounted(async () => {
    const docSnapshot = await songsCollection.doc(id as string).get()

    if (!docSnapshot.exists) {
      router.push({ name: "home" })

      return
    }

    song.value = docSnapshot.data()
  })

  return { song }
}
