import { computed, onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
  songsCollection,
  DocumentData,
  auth,
  commentsCollection
} from "@/includes/firebase"

export interface ISong extends DocumentData {
  docId?: string
  modifiedName?: string
  displayName?: string
  originalName?: string
  url?: string
  genre?: string
  commentCount?: number
}

export interface IComment extends DocumentData {
  docId: string
  content: string
  datePosted: string
  name: string
  sid: string
  uid: string
}

export const useMusicDetail = () => {
  const song = ref<ISong>()
  const comments = ref<IComment[]>([])
  const commentInSubmittion = ref(false)
  const commentShowAlert = ref(false)
  const commentAlertVariant = ref("bg-blue-500")
  const commentAlertMessage = ref(
    "Please wait! Your comment is being submitted."
  )
  const sort = ref("1")
  const router = useRouter()
  const {
    params: { id }
  } = useRoute()

  const sortedComments = computed(() =>
    [...comments.value].sort((a, b) => {
      if (sort.value === "1") {
        return +new Date(b.datePosted) - +new Date(a.datePosted)
      }

      return +new Date(a.datePosted) - +new Date(b.datePosted)
    })
  )

  const addComment = async (
    values: { comment: string },
    context: { resetForm: () => void }
  ) => {
    commentInSubmittion.value = true
    commentShowAlert.value = true
    commentAlertVariant.value = "bg-blue-500"
    commentAlertMessage.value = "Please wait! Your comment is being submitted."

    const comment = {
      content: values.comment,
      datePosted: new Date().toString(),
      sid: id,
      name: auth.currentUser?.displayName || "",
      uid: auth.currentUser?.uid
    }

    await commentsCollection.add(comment)

    commentInSubmittion.value = false
    commentAlertVariant.value = "bg-green-500"
    commentAlertMessage.value = "Comment added!"

    context.resetForm()
    getComments()
  }

  const getDetails = async () => {
    const docSnapshot = await songsCollection.doc(id as string).get()

    if (!docSnapshot.exists) {
      router.push({ name: "home" })

      return
    }

    song.value = docSnapshot.data()
  }

  const getComments = async () => {
    const snapshot = await commentsCollection.where("sid", "==", id).get()

    comments.value = []

    snapshot.forEach((doc) => {
      const { content, datePosted, name, sid, uid } = doc.data()

      return comments.value.push({
        docId: doc.id,
        content,
        datePosted,
        name,
        sid,
        uid
      })
    })
  }

  onMounted(() => {
    getDetails()
    getComments()
  })

  watch(sort, () => {
    router.push({ query: { sort: sort.value } })
  })

  return {
    song,
    sort,
    comments,
    sortedComments,
    commentInSubmittion,
    commentShowAlert,
    commentAlertVariant,
    commentAlertMessage,
    addComment,
    getComments
  }
}
