<template>
  <main>
    <!-- Introduction -->
    <section class="relative mb-8 py-20 text-center text-white">
      <div
        class="introduction-bg absolute inset-0 h-full w-full bg-contain"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="main-header-content text-white">
          <h1 class="mb-5 text-5xl font-bold">{{ t("home.listen") }}</h1>
          <p class="mx-auto w-full md:w-8/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative mx-auto mt-5 -mb-20 block w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="relative flex flex-col rounded border border-gray-200 bg-white"
      >
        <div
          class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.docId" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import SongItem from "@/components/SongItem.vue"
import { useAudioData } from "@/composables/useAudioData"

const { songs } = useAudioData(true)
const { t } = useI18n()
</script>
