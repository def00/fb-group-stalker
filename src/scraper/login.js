import Nightmare from 'nightmare'
import {data} from '../main/settings'
import vo from 'vo'

function *loginVisible() {
  const n = Nightmare({
    show: true,
    electronPath: require(`${__dirname}/../../node_modules/nightmare/node_modules/electron`),
    waitTimeout: 3600000
  });

  yield n
    .goto('https://www.facebook.com/login')
    .wait('#toolbarContainer')
  yield n.end()

  const cookies = yield n.cookies.get()
  data.cookies = cookies
}

export function *run() {
  const n = Nightmare({
    show: false,
    electronPath: require(`${__dirname}/../../node_modules/nightmare/node_modules/electron`),
  });

  yield n.goto('https://www.facebook.com/')
    .cookies.set(data.cookies)
    .wait(1000)

  yield n
    .goto('https://www.facebook.com/')
    .wait(1000)
    .exists('#toolbarContainer')
    .then((exists) => {
      if (!exists) {
        vo(loginVisible())((err, titles) => { console.log(err, titles) })
      }
    })

  yield n.end();
}
