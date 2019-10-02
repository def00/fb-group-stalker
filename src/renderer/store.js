import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from 'electron'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      startup: false,
      startOnStartup: false
    },
    keywords: []
  },
  mutations: {
    setSettings(state, settings) {
      state.settings.startOnStartup = settings.startOnStartup
      state.settings.startup = settings.startup
    },
    setSetting(state, data) {
      state.settings[data.name] = data.value
    },
    addKeyword(state, data) {
      state.keywords.push(data)
      ipcRenderer.send('keywords', state.keywords)
    },
    deleteKeyword(state, index) {
      state.keywords.splice(index, 1)
      ipcRenderer.send('keywords', state.keywords)
    },
    setKeywords(state, data) {
      state.keywords = data
    }
  },
  actions: {
    setSettings(context, payload) {
      context.commit('setSettings', payload)
    },
    setSetting(context, payload) {
      context.commit('setSetting', payload)
      ipcRenderer.send('settings', payload)
    },
    setKeywords(context, payload) {
      context.commit('setKeywords', payload)
    },
    addKeyword(context, payload) {
      context.commit('addKeyword', payload)
    },
    deleteKeyword(context, index) {
      context.commit('deleteKeyword', index)
    }
  }
})