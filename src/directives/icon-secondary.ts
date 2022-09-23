export default {
  beforeMount(
    el: HTMLElement,
    binding: {
      arg?: string
      value: {
        icon?: string
        right?: string
      }
    }
  ) {
    let iconClass = `fa fa-${binding.value.icon} text-green-400 text-2xl`

    if (binding.value.right) {
      iconClass += " float-right"
    }

    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
