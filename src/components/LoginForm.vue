<template>
  <div
    v-if="loginShowAlert"
    class="mb-4 rounded p-4 text-center font-bold text-white"
    :class="loginAlertVariant"
  >
    {{ loginAlertMsg }}
  </div>
  <VeeForm :validationSchema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="mb-2 inline-block">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="mb-2 inline-block">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full rounded bg-purple-600 py-1.5 px-3 text-white transition hover:bg-purple-700"
      :disabled="loginInSubmission"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script setup lang="ts">
import { useLogin } from "@/composables/useLogin"

const loginSchema = {
  email: "required|email",
  password: "required|min:9|max:100"
}

const {
  login,
  loginInSubmission,
  loginShowAlert,
  loginAlertMsg,
  loginAlertVariant
} = useLogin()
</script>
