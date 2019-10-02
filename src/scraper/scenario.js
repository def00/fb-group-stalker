import Nightmare from 'nightmare'
import path from 'path'
import vo from 'vo'
import {run as login} from './login'

let scenario = null

export function setScenation(s) {
  scenario = s
}

function createEvaluate(variables) {
  for (const variable in variables) {

  }
}

export function* run() {
  const electron = path.join('..', '..', 'node_modules', 'nightmare', 'node_modules', 'electron')
  const n = Nightmare({
    show: true,
    electronPath: require(`${__dirname}/../../node_modules/nightmare/node_modules/electron`)
  })

  for (const step of scenario) {
    switch (step.type) {
      case 'checkCookies':
        vo(login())((err, titles) => { console.log(err, titles) })
        break
      case 'open':
        yield n.goto(step.value)
        break
      case 'click':
        yield n.click(step.value)
        break
      case 'wait':
        yield n.wait(step.value)
        break
      case 'collect':
        yield n.evaluate(createEvaluate(step.value))
        break
    }
  }

  yield n.end()
}