<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <Upload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="relative flex flex-col rounded border border-gray-200 bg-white"
        >
          <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-2xl text-green-400"
            ></i>
          </div>
          <div class="p-6">
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="index"
              :removeSong="removeSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Upload from "@/components/Upload.vue"
import CompositionItem from "@/components/CompositionItem.vue"
import { useAudioData } from "@/composables/useAudioData"

const { songs, updateSong, removeSong, addSong } = useAudioData(true)
</script>
