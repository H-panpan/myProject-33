
import axios from 'axios'
let MyPlugs = {}
MyPlugs.install = function (Vue) {
  Vue.prototype.$http = axios

  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login') {
      config.headers.Authorization = window.localStorage.getItem('token')
    }
    return config
  })
}

export default MyPlugs
