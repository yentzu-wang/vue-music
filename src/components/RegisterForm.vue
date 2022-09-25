<template>
  <VeeForm
    :validationSchema="schema"
    @submit="register"
    :initialValues="userData"
  >
    <div
      v-if="regShowAlert"
      class="mb-4 rounded p-4 text-center font-bold text-white"
      :class="regAlertVariant"
    >
      {{ regAlertMsg }}
    </div>
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
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
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
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ t("register.tos") }}</a>
      </i18n-t>
      <ErrorMessage class="block text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full rounded bg-purple-600 py-1.5 px-3 text-white transition hover:bg-purple-700"
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import useRegister from "@/composables/useRegister"

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
const {
  register,
  regShowAlert,
  regAlertVariant,
  regAlertMsg,
  regInSubmission
} = useRegister()
const { t } = useI18n()
</script>
