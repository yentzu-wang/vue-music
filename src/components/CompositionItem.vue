<template>
  <div class="mb-4 rounded border border-gray-200 p-3">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="mb-4 p-4 text-center font-bold text-white"
        v-if="showAlert"
        :class="alertVariant"
      >
        {{ alertMessage }}
      </div>
      <VeeForm :validationSchema="schema" :initialValues="song" @submit="edit">
        <div class="mb-3">
          <label class="mb-2 inline-block">Song Title</label>
          <VeeField
            class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
            type="text"
            placeholder="Enter Song Title"
            name="modifiedName"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="mb-2 inline-block">Genre</label>
          <VeeField
            class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
            type="text"
            placeholder="Enter Genre"
            name="genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <div class="space-x-2">
          <button
            class="rounded bg-green-600 py-1.5 px-3 text-white"
            type="submit"
            :disabled="inSubmittion"
          >
            Submit
          </button>
          <button
            class="rounded bg-gray-600 py-1.5 px-3 text-white"
            type="button"
            :disabled="inSubmittion"
            @click.prevent="showForm = false"
          >
            Go Back
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue"
import { useAudioEdit } from "@/composables/useAudioEdit"
import type { ISong } from "@/composables/useAudioData"

const props = defineProps({
  song: {
    type: Object as PropType<ISong>,
    required: true
  },
  updateSong: {
    type: Function as PropType<
      (
        i: number,
        values: {
          modifiedName: string
          genre: string
        }
      ) => void
    >,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  removeSong: {
    type: Function as PropType<(i: number) => void>,
    required: true
  }
})

const schema = {
  modifiedName: "required",
  genre: "alpha_spaces"
}

const {
  showForm,
  inSubmittion,
  showAlert,
  alertVariant,
  alertMessage,
  edit,
  deleteSong
} = useAudioEdit(props)
</script>
