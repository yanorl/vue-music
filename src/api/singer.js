// import OriginAxios from 'common/js/axios'
// import { commonParams } from './config'
// export function getSingerList () {
//   const url = '/cgi-bin/musicu.fcg'
//   const datas = Object.assign({}, commonParams, {
//     platform: 'yqq.json',
//     hostUin: 0,
//     needNewCode: 0,
//     data: JSON.stringify({ 'comm': { 'ct': 24, 'cv': 0 }, 'singerList': { 'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': { 'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1 } } })})
//   const api = '/apis'
//   return OriginAxios(api, url, datas)
// }
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}
