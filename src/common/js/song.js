import { getLyric } from 'api/songlyric'
import { getPlayUrl } from 'api/playUrl'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
  constructor ({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          // console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

  getPlayUrl () {
    if (this.playUrl) {
      return Promise.resolve(this.playUrl)
    }
    return new Promise((resolve, reject) => {
      getPlayUrl(this.mid).then((res) => {
        if (res.code === ERR_OK) {
          this.playUrl = `http://dl.stream.qqmusic.qq.com/${res.req_0.data.midurlinfo[0].purl}`
          resolve(this.playUrl)
        } else {
          reject(new Error('no playing url'))
        }
      })
    })
  }
}

export function createSong (musicData /* , songLink */) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // url: songLink
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
