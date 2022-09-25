import { test, describe, expect, vi } from "vitest"
import { shallowMount } from "@vue/test-utils"
import { createI18n } from "vue-i18n"

import Home from "@/views/Home.vue"
import SongItem from "@/components/SongItem.vue"

const songs = [{}]

vi.mock("@/composables/useAudioData", () => ({
  useAudioData: () => ({
    songs
  })
}))

describe("Home.vue", () => {
  test("renders list of songs", () => {
    const i18n = createI18n({
      legacy: false
    })

    const component = shallowMount(Home, {
      global: {
        plugins: [i18n],
        directives: {
          "icon-secondary": () => ({})
        }
      }
    })

    const items = component.findAllComponents(SongItem)

    expect(items).toHaveLength(songs.length)

    items.forEach((wrapper, i) => {
      expect(wrapper.props("song")).toBe(songs[i])
    })
  })
})
