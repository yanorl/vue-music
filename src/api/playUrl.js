import axios from 'axios'
import { commonParams } from './config'

export function getPlayUrl (id) {
  const url = '/api/getUrl'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    data: {
      'req': {
        'module': 'CDN.SrfCdnDispatchServer',
        'method': 'GetCdnDispatch',
        'param': {
          'guid': '7480609908',
          'calltype': 0,
          'userip': ''
        }
      },
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '7480609908',
          'songmid': [id],
          'songtype': [0],
          'uin': '625620461',
          'loginflag': 1,
          'platform': '20'
        }
      },
      'comm': {
        'uin': 625620461,
        'format': 'json',
        'ct': 24,
        'cv': 0
      }
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
