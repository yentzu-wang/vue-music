<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <Upload />
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
            <!-- Composition Items -->
            <div class="mb-4 rounded border border-gray-200 p-3">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
              <div>
                <form>
                  <div class="mb-3">
                    <label class="mb-2 inline-block">Song Title</label>
                    <input
                      type="text"
                      class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                      placeholder="Enter Song Title"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="mb-2 inline-block">Genre</label>
                    <input
                      type="text"
                      class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                      placeholder="Enter Genre"
                    />
                  </div>
                  <div class="space-x-2">
                    <button
                      type="submit"
                      class="rounded bg-green-600 py-1.5 px-3 text-white"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      class="rounded bg-gray-600 py-1.5 px-3 text-white"
                    >
                      Go Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="mb-4 rounded border border-gray-200 p-3">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div class="mb-4 rounded border border-gray-200 p-3">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div class="mb-4 rounded border border-gray-200 p-3">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div class="mb-4 rounded border border-gray-200 p-3">
              <div>
                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                <button
                  class="float-right ml-1 rounded bg-red-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button
                  class="float-right ml-1 rounded bg-blue-600 py-1 px-2 text-sm text-white"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Upload from "@/components/Upload.vue"
</script>
