// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
// export function getRecommend () {
//   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   const data = Object.assign({}, commonParams, {
//     platform: 'h5',
//     uin: 0,
//     needNewCode: 1
//   })
//   return jsonp(url, data, options)
// }
import axios from 'axios'
import OriginAxios from 'common/js/axios'
import { commonParams } from './config'
export function getRecommend () {
  const url = '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const datas = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  const api = '/apis'
  return OriginAxios(api, url, datas)
}

export function getPcRecommend () {
  const url = '/api/getPcRecommend'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    data: {
      'comm': {
        'ct': 24
      },
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': {
          'id': 3317,
          'curPage': 1,
          'size': 40,
          'order': 5,
          'titleid': 3317
        },
        'module': 'playlist.PlayListPlazaServer'
      }
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList () {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    data: { 'comm': { 'ct': 24, 'cv': 0 }, 'singerList': { 'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': { 'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1 } } }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
