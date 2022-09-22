import { ref, reactive, onBeforeUnmount } from "vue"
import { storage, UploadTask, auth, songsCollection } from "@/includes/firebase"
import type { DocumentData } from "@/includes/firebase"

export const useAudioUpload = (addSong: (song: DocumentData) => void) => {
  type Upload = {
    task: UploadTask
    name: string
    progress: number
    variant: string
    icon: string
    textClass: string
  }

  const isDragOver = ref(false)
  const uploads = reactive<Upload[]>([])

  const upload = (e: Event) => {
    const files = (e.target as HTMLInputElement).files || []

    processUpload([...files])
  }

  const dragUpload = (e: DragEvent) => {
    isDragOver.value = false

    const files = e.dataTransfer ? [...e.dataTransfer.files] : []

    processUpload(files)
  }

  function processUpload(files: File[]) {
    files.forEach((file) => {
      if (file.type !== "audio/mpeg") {
        console.log("Only mp3 files are allowed")
        return
      }

      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${file.name}`)
      const task = songRef.put(file)
      const uploadIndex =
        uploads.push({
          task,
          name: file.name,
          progress: 0,
          variant: "bg-blue-400",
          icon: "fas fa-spinner fa-spin",
          textClass: ""
        }) - 1

      task.on(
        "state_changed",
        (snapshot) => {
          uploads[uploadIndex].progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          uploads[uploadIndex].variant = "bg-red-400"
          uploads[uploadIndex].icon = "fas fa-times"
          uploads[uploadIndex].textClass = "text-red-400"
          console.log(error)
        },
        async () => {
          const song = {
            uid: auth.currentUser?.uid,
            displayName: auth.currentUser?.displayName,
            originalName: task.snapshot.ref.name,
            modifiedName: task.snapshot.ref.name,
            genre: "",
            commentCount: 0,
            url: ""
          }

          song.url = await task.snapshot.ref.getDownloadURL()
          const songRef = await songsCollection.add(song)
          const songSnapshot = await songRef.get()

          addSong(songSnapshot)

          uploads[uploadIndex].variant = "bg-green-400"
          uploads[uploadIndex].icon = "fas fa-check"
          uploads[uploadIndex].textClass = "text-green-400"
        }
      )
    })
  }

  onBeforeUnmount(() => {
    uploads.forEach((upload) => {
      upload.task.cancel()
    })
  })

  return { isDragOver, uploads, upload, dragUpload }
}
