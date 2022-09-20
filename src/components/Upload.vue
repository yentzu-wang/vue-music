<template>
  <div class="relative flex flex-col rounded border border-gray-200 bg-white">
    <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-2xl text-green-400"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full cursor-pointer rounded border border-dashed border-gray-400 px-10 py-20 text-center text-gray-400 transition duration-500 hover:border-solid hover:border-green-400 hover:bg-green-400 hover:text-white"
        :class="{ 'border-solid border-green-400 bg-green-400': isDragOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragOver = false"
        @dragover.prevent.stop="isDragOver = true"
        @dragenter.prevent.stop="isDragOver = true"
        @dragleave.prevent.stop="isDragOver = false"
        @drop.prevent.stop="upload"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div
        v-for="{ name, progress, variant, icon, textClass } in uploads"
        :key="name"
        class="mb-4"
      >
        <!-- File Name -->
        <div class="text-sm font-bold" :class="textClass">
          <i :class="icon" />
          {{ name }}
        </div>
        <div class="flex h-4 overflow-hidden rounded bg-gray-200">
          <!-- Inner Progress Bar -->
          <div
            class="progress-bar bg-blue-400 transition-all"
            :class="variant"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { storage, UploadTask } from "@/includes/firebase"

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

const upload = (e: DragEvent) => {
  isDragOver.value = false
  const files = e.dataTransfer ? [...e.dataTransfer.files] : []

  files.forEach((file) => {
    if (file.type !== "audio/mpeg") {
      console.log("Only mp3 files are allowed")
      return
    }

    const storageRef = storage.ref()
    const songsRef = storageRef.child(`songs/${file.name}`)
    const task = songsRef.put(file)

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
      () => {
        uploads[uploadIndex].variant = "bg-green-400"
        uploads[uploadIndex].icon = "fas fa-check"
        uploads[uploadIndex].textClass = "text-green-400"
      }
    )
  })
}
</script>
