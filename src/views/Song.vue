<template>
  <!-- Music Header -->
  <section class="relative mb-8 w-full py-14 text-center text-white">
    <div
      class="music-bg absolute inset-0 box-border h-full w-full bg-contain"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-50 h-24 w-24 rounded-full bg-white text-3xl text-black focus:outline-none"
        @click.prevent="newSong(song)"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 ml-8 text-left">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song?.modifiedName }}</div>
        <div>{{ song?.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="relative flex flex-col rounded border border-gray-200 bg-white">
      <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ song?.commentCount || 0 }})</span>
        <i class="fa fa-comments float-right text-2xl text-green-400"></i>
      </div>
      <div class="p-6">
        <div
          v-if="commentShowAlert"
          class="mb-4 p-4 text-center font-bold text-white"
          :class="commentAlertVariant"
        >
          {{ commentAlertMessage }}
        </div>
        <VeeForm
          v-if="userLoggedIn"
          :validationSchema="schema"
          @submit="addComment"
        >
          <VeeField
            as="textarea"
            name="comment"
            class="mb-4 block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
            placeholder="Your comment here..."
          />
          <ErrorMessage name="comment" class="text-red-600" />
          <button
            type="submit"
            class="block rounded bg-green-600 py-1.5 px-3 text-white"
            :disabled="commentInSubmittion"
          >
            Submit
          </button>
        </VeeForm>
        <!-- Sort Comments -->
        <select
          v-model="sort"
          class="mt-4 block rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li
      v-for="comment in sortedComments"
      :key="comment.docId"
      class="border border-gray-200 bg-gray-50 p-6"
    >
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </li>
  </ul>
  <Player />
</template>

<script setup lang="ts">
import Player from "@/components/Player.vue"
import { usePlayerStore } from "@/stores/player"
import { useMusicDetail } from "@/composables/useMusicDetail"
import { useAuth } from "@/composables/useAuth"

const schema = {
  comment: "required|min:3"
}

const { userLoggedIn } = useAuth()
const {
  song,
  sort,
  sortedComments,
  addComment,
  commentInSubmittion,
  commentShowAlert,
  commentAlertVariant,
  commentAlertMessage
} = useMusicDetail()
const { newSong } = usePlayerStore()
</script>
