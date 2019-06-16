import Axios from 'axios'
export default function OriginAxios (api, url, params) {
  url = api + url
  return new Promise((resolve, reject) => {
    Axios(url, params)
      .then(function (response) {
        var ret = response.data
        if (typeof ret === 'string') {
          var reg = /^\w+\(({[^]+})\)$/
          var mathes = ret.match(reg)
          if (mathes) {
            ret = JSON.parse(mathes[1])
          }
        }
        resolve(ret)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
