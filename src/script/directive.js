import Vue from 'vue'
import './../styles/loading.scss'

let directives = {
  hasPermission: {
    bind(el, binding, vnode) {
      let permissions = vnode.context.$store.state.user.permissions
      let value = binding.value
      let flag = true
      for (let v of value) {
        if (!permissions.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        if (!el.parentNode) {
          el.style.display = 'none'
        } else {
          el.parentNode.removeChild(el)
        }
      }
    }
  },
  cusBack: {
    bind: (el, binding) => {
      el.style.backgroundColor = binding.backgroundColor
    }
  },
  cLoading: {
    bind: (el, binding) => {
      const tempDiv = document.createElement('div')
      tempDiv.className = 'custom-loading'
      const round = document.createElement('div')
      let cusClassName
      ;['large', 'mini', 'small'].forEach((item) => {
        if (binding.modifiers[item]) {
          cusClassName = item
        }
      })
      round.className = 'custom-loading-round ' + (cusClassName || '')
      tempDiv.appendChild(round)
      el.loadingElement = tempDiv
      const curStyle = window.getComputedStyle(el)
      const position = curStyle.position
      console.log(333333, position)
      if (!position) {
        el.style.position = 'relative'
      }
      if (binding.value) {
        el.appendChild(tempDiv)
      }
    },
    update: (el, binding) => {
      if (binding.value) {
        if (el.loadingElement.parentNode === null) {
          el.appendChild(el.loadingElement)
        }
      } else {
        if (el === el.loadingElement.parentNode) {
          el.removeChild(el.loadingElement)
        }
      }
    },
    unbind: (el) => {
      if (el.loadingElement.parentNode === el) {
        el.removeChild(el.loadingElement)
      }
      el.loadingElement = null
    }
  }
}

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
