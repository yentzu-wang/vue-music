import { ref } from "vue"
import type { ISong } from "@/composables/useAudioData"
import { songsCollection, storage } from "@/includes/firebase"

export const useAudioEdit = (props: {
  index: number
  song: ISong
  updateSong: (
    i: number,
    values: {
      modifiedName: string
      genre: string
    }
  ) => void
  removeSong: (i: number) => void
}) => {
  const showForm = ref(false)
  const inSubmittion = ref(false)
  const showAlert = ref(false)
  const alertVariant = ref("bg-blue-500")
  const alertMessage = ref("Please wait! Updating song info.")

  const edit = async (values: { modifiedName: string; genre: string }) => {
    inSubmittion.value = true
    showAlert.value = true
    alertVariant.value = "bg-blue-500"
    alertMessage.value = "Please wait! Updating song info."

    try {
      await songsCollection.doc(props.song.docId).update(values)

      inSubmittion.value = false
      alertVariant.value = "bg-green-500"
      alertMessage.value = "Song info updated successfully."

      props.updateSong(props.index, values)
    } catch (error) {
      inSubmittion.value = false
      alertVariant.value = "bg-red-500"
      alertMessage.value = "Something went wrong! Please try again later."
    }
  }

  const deleteSong = async () => {
    const storageRef = storage.ref()
    const songRef = storageRef.child(`songs/${props.song.originalName}`)

    await songRef.delete()
    await songsCollection.doc(props.song.docId).delete()
    props.removeSong(props.index)
  }

  return {
    showForm,
    inSubmittion,
    showAlert,
    alertVariant,
    alertMessage,
    edit,
    deleteSong
  }
}
