import AutoLaunch from 'auto-launch'
import settings from 'electron-settings'
import {ipcMain} from 'electron'

let autoLaunch = new AutoLaunch({
  name: 'FB Harvester'
})

let data = {}

Object.defineProperties(data, {
  startup: {
    get() {
      try {
        return autoLaunch.isEnabled()
      } catch (error) {
        return false
      }
    },
    set(val) {
      if (val) {
        return autoLaunch.enable()
      }
      autoLaunch.disable()
    }
  },
  login: {
    get() {
      return settings.get('facebook-login')
    },
    set(login) {
      settings.set('facebook-login', login)
    }
  },
  password: {
    get() {
      return settings.get('facebook-password')
    },
    set(password) {
      settings.set('facebook-password', password)
    }
  },

  startOnStartup: {
    get() {
      return settings.get('start-on-startup')
    },
    set(val) {
      settings.set('start-on-startup', val)
    }
  },

  cookies: {
    get() {
      return settings.get('cookies')
    },
    set(val) {
      settings.set('cookies', val)
    }
  },

  keywords: {
    get() {
      return settings.get('keywords')
    },
    set(val) {
      settings.set('keywords', val)
    }
  },
})

function onReady(window) {
  let keywords = data.keywords
  console.log(keywords)
  window.webContents.send('settings', {
    startup: data.startup,
    login: data.login,
    password: data.password,
    startOnStartup: data.startOnStartup
  })
  window.webContents.send('keywords', keywords)
  ipcMain.on('settings', (ev, msg) => {
    data[msg.name] = msg.value
  })
  ipcMain.on('keywords', (ev, msg) => {
    data.keywords = msg
  })
}

export {data, onReady}