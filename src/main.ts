import { createApp, App } from "vue"
import { createPinia } from "pinia"

import VueAppInstance from "./App.vue"
import router from "./router"
import VeeValidatePlugin from "./includes/validation"
import { auth } from "./includes/firebase"
import Icon from "./directives/icon"
import IconSecondary from "./directives/icon-secondary"

import "@/assets/tailwind.css"
import "@/assets/main.css"

let app: App<Element>

auth.onAuthStateChanged(() => {
  if (app) {
    return
  }

  app = createApp(VueAppInstance)

  app.use(createPinia())
  app.use(router)
  app.use(VeeValidatePlugin)
  app.directive("icon", Icon)
  app.directive("icon-secondary", IconSecondary)

  app.mount("#app")
})
