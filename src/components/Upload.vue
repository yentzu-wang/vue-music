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
        @drop.prevent.stop="dragUpload"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload" />
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
<script setup>
import { useAudioUpload } from "@/composables/useAudioUpload"

const { isDragOver, uploads, upload, dragUpload } = useAudioUpload()
</script>
