import vo from 'vo'
import {run as login} from './login'

export default {
  login () {
    vo(login())((err, titles) => { console.log(err, titles) })
  }
}