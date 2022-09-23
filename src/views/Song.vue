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
        <VeeForm :validationSchema="schema">
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
          >
            Submit
          </button>
        </VeeForm>
        <!-- Sort Comments -->
        <select
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
    <li class="border border-gray-200 bg-gray-50 p-6">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="border border-gray-200 bg-gray-50 p-6">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="border border-gray-200 bg-gray-50 p-6">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="border border-gray-200 bg-gray-50 p-6">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="border border-gray-200 bg-gray-50 p-6">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
    <li class="border border-gray-200 bg-gray-50 p-6">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium der doloremque laudantium.
      </p>
    </li>
  </ul>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 w-full bg-white px-4 py-2">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap items-center gap-4">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="fa fa-play text-xl text-gray-500"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="relative h-2 w-full cursor-pointer rounded bg-gray-200">
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-lg text-gray-800"
          style="left: 50%"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicDetail } from "@/composables/useMusicDetail"

const schema = {
  comment: "required|min:3"
}

const { song } = useMusicDetail()
</script>
