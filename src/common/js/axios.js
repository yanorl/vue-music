import Axios from 'axios'
export default function OriginAxios (api, url, params) {
  url = api + url
  return new Promise((resolve, reject) => {
    Axios(url, params)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
