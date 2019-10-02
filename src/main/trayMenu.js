import path from 'path'
import vo from 'vo'
import {app, Menu, Tray} from 'electron'
import {run, setScenation} from '../scraper/scenario'

const sc = [
  {type: 'checkCookies', value: {
      address: 'https://www.facebook.com/'
    }
  },
  {type: 'open', value: 'https://www.facebook.com/groups/startupy/members/'},
  {type: 'wait', value: '#siteNavigation'},
  {type: 'click', value: '#siteNavigation .firstLevel ul li a:first-child'},
  {
    type: 'collect', value: {
      name: {selector: 'fbProfileBrowserList .uiList a', type: 'array'}
    }
  }
]

setScenation(sc)

export default function(window) {
  let appIcon = null

  appIcon = new Tray(path.join(__static, 'icons', '16x16.png'))
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Start', type: 'normal', click() { vo(run)((err, titles) => { console.log(err, titles) }) }},
    {label: 'Settings', type: 'normal', click() { window.webContents.send('open', 'settings') }},
    {label: 'Quit', type: 'normal', click() { app.quit() }}
  ])

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
}
