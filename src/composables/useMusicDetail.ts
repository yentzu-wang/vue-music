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
  const commentInSubmittion = ref(false)
  const commentShowAlert = ref(false)
  const commentAlertVariant = ref("bg-blue-500")
  const commentAlertMessage = ref(
    "Please wait! Your comment is being submitted."
  )
  const router = useRouter()
  const {
    params: { id }
  } = useRoute()

  const addComment = async (values) => {
    commentInSubmittion.value = true
    commentShowAlert.value = true
    commentAlertVariant.value = "bg-blue-500"
    commentAlertMessage.value = "Please wait! Your comment is being submitted."
  }

  onMounted(async () => {
    const docSnapshot = await songsCollection.doc(id as string).get()

    if (!docSnapshot.exists) {
      router.push({ name: "home" })

      return
    }

    song.value = docSnapshot.data()
  })

  return {
    song,
    addComment,
    commentInSubmittion,
    commentShowAlert,
    commentAlertVariant,
    commentAlertMessage
  }
}
