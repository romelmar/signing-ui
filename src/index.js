// src/index.js
import SigningPad from './components/SigningPad.vue';

export default {
  install(app) {
    app.component('SigningPad', SigningPad);
  }
};

export { SigningPad };
