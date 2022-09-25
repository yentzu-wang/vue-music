import { createI18n } from "vue-i18n"
import en from "@/locales/en.json"
import zhTw from "@/locales/zh-tw.json"
import zhCn from "@/locales/zh-cn.json"

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    "zh-tw": zhTw,
    "zh-cn": zhCn
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD"
      }
    },
    ja: {
      currency: {
        style: "currency",
        currency: "JPY"
      }
    },
    "zh-tw": {
      currency: {
        style: "currency",
        currency: "TWD"
      }
    }
  }
})
