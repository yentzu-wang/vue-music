<template>
  <div class="mb-4 rounded border border-gray-200 p-3">
    <div>
      <h4 class="inline-block text-2xl font-bold">Song Name</h4>
      <button
        class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
      >
        <i class="fa fa-times"></i></button
      ><button
        class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div>
      <form>
        <div class="mb-3">
          <label class="mb-2 inline-block">Song Title</label
          ><input
            class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
            type="text"
            placeholder="Enter Song Title"
          />
        </div>
        <div class="mb-3">
          <label class="mb-2 inline-block">Genre</label
          ><input
            class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
            type="text"
            placeholder="Enter Genre"
          />
        </div>
        <div class="space-x-2">
          <button
            class="rounded bg-green-600 py-1.5 px-3 text-white"
            type="submit"
          >
            Submit</button
          ><button
            class="rounded bg-gray-600 py-1.5 px-3 text-white"
            type="button"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue"
import type { ISong } from "@/composables/useAudioData"

const props = defineProps({
  song: {
    type: Object as PropType<ISong>,
    required: true
  }
})
</script>
