import { describe, test, expect } from "vitest"
import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import SongItem from "@/components/SongItem.vue"

describe("SongItem.vue", () => {
  const song = {
    docId: "docId",
    modifiedName: "modifiedName",
    displayName: "test",
    commentCount: 0
  }

  test("render song.displayName", () => {
    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          "router-link": RouterLinkStub
        }
      }
    })

    const compositionAuthor = wrapper.find(".text-gray-500")
    expect(compositionAuthor.text()).toBe(`Upload by ${song.displayName}`)
  })
})
