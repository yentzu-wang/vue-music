import { createApp, App } from "vue"
import { createPinia } from "pinia"

import VueAppInstance from "./App.vue"
import router from "./router"
import VeeValidatePlugin from "./includes/validation"
import { auth } from "./includes/firebase"
import GlobalComponents from "./includes/_gloabls"
import progressBar from "./includes/progress-bar"
import Icon from "./directives/icon"
import IconSecondary from "./directives/icon-secondary"
import i18n from "./includes/i18n"
import { registerSW } from "virtual:pwa-register"

import "nprogress/nprogress.css"
import "@/assets/tailwind.css"
import "@/assets/main.css"

registerSW({ immediate: true })

progressBar(router)

let app: App<Element>

auth.onAuthStateChanged(() => {
  if (app) {
    return
  }

  app = createApp(VueAppInstance)

  app.use(createPinia())
  app.use(router)
  app.use(VeeValidatePlugin)
  app.use(i18n)
  app.use(GlobalComponents)
  app.directive("icon", Icon)
  app.directive("icon-secondary", IconSecondary)

  app.mount("#app")
})
