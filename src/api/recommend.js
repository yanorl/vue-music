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

// export function getDiscList() {
//   const url = '/cgi-bin/musicu.fcg'
//   const datas = Object.assign({}, commonParams, {
//     platform: 'yqq.json',
//     hostUin: 0,
//     needNewCode: 0,
//     data: {
//       "comm": {
//         "ct": 24
//       },
//       "category": {
//         "method": "get_hot_category",
//         "param": {
//           "qq": ""
//         },
//         "module": "music.web_category_svr"
//       },
//       "recomPlaylist": {
//         "method": "get_hot_recommend",
//         "param": {
//           "async": 1,
//           "cmd": 2
//         },
//         "module": "playlist.HotRecommendServer"
//       },
//       "playlist": {
//         "method": "get_playlist_by_category",
//         "param": {
//           "id": 8,
//           "curPage": 1,
//           "size": 40,
//           "order": 5,
//           "titleid": 8
//         },
//         "module": "playlist.PlayListPlazaServer"
//       },
//       "new_song": {
//         "module": "newsong.NewSongServer",
//         "method": "get_new_song_info",
//         "param": {
//           "type": 5
//         }
//       },
//       "new_album": {
//         "module": "newalbum.NewAlbumServer",
//         "method": "get_new_album_info",
//         "param": {
//           "area": 1,
//           "sin": 0,
//           "num": 10
//         }
//       },
//       "new_album_tag": {
//         "module": "newalbum.NewAlbumServer",
//         "method": "get_new_album_area",
//         "param": {}
//       },
//       "toplist": {
//         "module": "musicToplist.ToplistInfoServer",
//         "method": "GetAll",
//         "param": {}
//       },
//       "focus": {
//         "module": "QQMusic.MusichallServer",
//         "method": "GetFocus",
//         "param": {}
//       }
//     }
//   })
//   const api = '/apispc'
//   return OriginAxios(api, url, datas)
// }