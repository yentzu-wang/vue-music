export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} float-right text-xl text-green-400`

    if (binding.arg === "full") {
      iconClass = binding.value
    }

    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
