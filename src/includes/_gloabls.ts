import { App } from "vue"
import _ from "lodash"

export default {
  install(app: App<Element>) {
    const baseComponents = import.meta.glob("../components/base/*.vue", {
      eager: true
    })

    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = _.upperFirst(
        _.camelCase(
          path
            .split("/")
            .pop()
            ?.replace(/\.\w+$/, "")
        )
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      app.component(`Base${componentName}`, (module as any).default)
    })
  }
}
