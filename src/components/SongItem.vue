<template>
  <li
    class="flex cursor-pointer items-center justify-between p-3 pl-6 transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docId } }"
        class="block font-bold text-gray-600"
      >
        {{ song.modifiedName }}
      </router-link>
      <span class="text-sm text-gray-500">
        Upload by {{ song.displayName }}
      </span>
    </div>

    <div class="text-lg text-gray-600">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
        {{ song.commentCount }}
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  song: {
    docId: string
    modifiedName: string
    displayName: string
    commentCount: number
  }
}>()
</script>
