import axios from 'axios'
import OriginAxios from 'common/js/axios'
import { commonParams } from './config'

export function getTopList () {
  const url = '/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  const api = '/apis'
  return OriginAxios(api, url, data)
}

export function getMusicList (topid) {
  const url = '/api/getMusicList'
  const data = Object.assign({}, commonParams, {
    g_tk: 1703603265,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'detail': { 'module': 'musicToplist.ToplistInfoServer', 'method': 'GetDetail', 'param': { 'topId': topid, 'offset': 0, 'num': 20, 'period': '2019-06-16' } }, 'comm': { 'ct': 24, 'cv': 0 } }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
