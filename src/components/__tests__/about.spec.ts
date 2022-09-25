import { test, describe, expect } from "vitest"
import { shallowMount } from "@vue/test-utils"
import About from "@/views/About.vue"

describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = shallowMount(About)

    expect(wrapper.text()).toContain("About")
  })
})
