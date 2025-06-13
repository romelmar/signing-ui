// src/index.js

import * as components from './components'

export default {
  install(app) {
    for (const componentKey in components) {
      app.component(componentKey, components[componentKey])
    }
  }
}
