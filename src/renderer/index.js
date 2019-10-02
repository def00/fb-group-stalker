import Vue from 'vue'
import App from './App.vue'
import {ipcRenderer} from 'electron'
import store from './store'
import Element from 'element-ui'
import 'element-theme-dark/lib/index.css'

Vue.use(Element, {size: 'small', zIndex: 2000})

const v = new Vue({
  store,
  render(h) {
    return h(App)
  }
}).$mount('#app')

ipcRenderer.on('open', (ev, msg) => {
  v.$children[0].open(msg)
})

ipcRenderer.on('settings', (ev, msg) => {
  store.dispatch('setSettings', msg)
})

ipcRenderer.on('keywords', (ev, msg) => {
  store.dispatch('setKeywords', msg)
})