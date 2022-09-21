import { ref } from "vue"
import type { ISong } from "@/composables/useAudioData"
import { songsCollection } from "@/includes/firebase"

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

  return {
    showForm,
    inSubmittion,
    showAlert,
    alertVariant,
    alertMessage,
    edit
  }
}
