<template>
  <!-- Auth Modal -->
  <div
    class="fixed inset-0 z-10 overflow-y-auto"
    id="modal"
    :class="hiddenClass"
  >
    <div
      class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:h-screen sm:align-middle">
        &#8203;
      </span>

      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 px-6 text-left">
          <!--Title-->
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div
              class="modal-close z-50 cursor-pointer"
              @click="isOpen = false"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="mb-4 flex flex-wrap">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'login'"
                :class="{
                  'bg-blue-600 text-white hover:text-white': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                }"
              >
                Login
              </a>
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'register'"
                :class="{
                  'bg-blue-600 text-white hover:text-white': tab === 'register',
                  'hover:text-blue-600': tab === 'login'
                }"
              >
                Register
              </a>
            </li>
          </ul>

          <!-- Login Form -->
          <!-- <keep-alive> -->
          <form v-if="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Email</label>
              <input
                type="email"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Enter Email"
                v-model="email"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Password</label>
              <input
                type="password"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full rounded bg-purple-600 py-1.5 px-3 text-white transition hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <VeeForm
            v-else
            :validationSchema="schema"
            @submit="register"
            :initialValues="userData"
          >
            <!-- Name -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Name</label>
              <VeeField
                name="name"
                type="text"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Enter Name"
              />
              <ErrorMessage class="text-red-600" name="name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Email</label>
              <VeeField
                name="email"
                type="email"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Enter Email"
              />
              <ErrorMessage class="block text-red-600" name="email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Age</label>
              <VeeField
                name="age"
                type="number"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
              />
              <ErrorMessage class="block text-red-600" name="age" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Password</label>
              <VeeField
                name="password"
                :bails="false"
                v-slot="{ field, errors }"
              >
                <input
                  class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                  type="password"
                  placeholder="Password"
                  v-bind="field"
                />
                <div v-for="error in errors" :key="error" class="text-red-600">
                  {{ error }}
                </div>
              </VeeField>
              <ErrorMessage class="block text-red-600" name="password" />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Confirm Password</label>
              <VeeField
                name="confirmPassword"
                type="password"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Confirm Password"
              />
              <ErrorMessage class="block text-red-600" name="confirmPassword" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="mb-2 inline-block">Country</label>
              <VeeField
                name="country"
                as="select"
                class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
              >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>
              </VeeField>
              <ErrorMessage class="block text-red-600" name="country" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <VeeField
                name="tos"
                value="1"
                type="checkbox"
                class="float-left -ml-6 mt-1 h-4 w-4 rounded"
              />
              <label class="inline-block">Accept terms of service</label>
              <ErrorMessage class="block text-red-600" name="tos" />
            </div>
            <button
              type="submit"
              class="block w-full rounded bg-purple-600 py-1.5 px-3 text-white transition hover:bg-purple-700"
            >
              Submit
            </button>
          </VeeForm>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useModalStore } from "@/stores/modal"

const { hiddenClass, isOpen } = storeToRefs(useModalStore())
const tab = ref("login")

const schema = {
  name: "required|min:3|max:100|alpha_spaces",
  email: "required|min:3|max:100|email",
  age: "required|min_value:18|max_value:100",
  password: "required|min:9|max:100|excluded:password",
  confirmPassword: "passwords_mismatch:@password",
  country: "required|country_excluded:Antarctica",
  tos: "tos"
}

const userData = {
  country: "USA"
}

const register = (values) => {
  console.log(values)
}
</script>
