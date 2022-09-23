export default {
  beforeMount(
    el: HTMLElement,
    binding: {
      arg?: string
      value?: string
      modifiers: {
        right?: string
        yellow?: string
      }
    }
  ) {
    let iconClass = `fa fa-${binding.value} text-2xl`

    if (binding.arg === "full") {
      iconClass = binding.value || ""
    }

    if (binding.modifiers?.right) {
      iconClass += " float-right"
    }

    if (binding.modifiers?.yellow) {
      iconClass += " text-yellow-400"
    } else {
      iconClass += " text-green-400"
    }

    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
