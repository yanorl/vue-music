import {commonParams} from './config'
import axios from 'axios'
import OriginAxios from 'common/js/axios'

export function getHotKey () {
  const url = '/splcloud/fcgi-bin/gethotkey.fcg'
  const datas = Object.assign({}, commonParams, {
    g_tk: 966081920,
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })
  const api = '/apis'
  return OriginAxios(api, url, datas)
}

export function search (query, page, zhida, perpage) {
  const url = '/api/search'
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage: perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    g_tk: 966081920,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
