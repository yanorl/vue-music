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
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=7480609908&vkey=`
  })
}
// http://isure.stream.qqmusic.qq.com/C400003xl9d83fVzUJ.m4a?guid=7480609908&vkey=5EF732BBD7972CADD698C52318F031A58FF368E28D1BF13219850FA69C3CAEDEC8A65BAD0A5B2A89EA3725D541816E2714C554809147F657&uin=0&fromtag=66
// http://isure.stream.qqmusic.qq.com/C400003xl9d83fVzUJ.m4a?guid=7480609908&vkey=C70051193C39618CEA899911712EFD7ADAE07B9D01B82FFB9B54994021B5858ADDF5ED1B79B1401D717FA283B8B20B28CFECBD4A7302B39D&uin=0&fromtag=66
// http://dl.stream.qqmusic.qq.com/C4000010ZFzB469WVa.m4a?guid=7480609908&vkey=98A0A62CCAF40EC45EAF38688787E97619BD5FB2E6A5738D46573C920118B6D9291497A098330F539F35089C11CB6441DC6549E8927313D2&uin=0&fromtag=66
// http://dl.stream.qqmusic.qq.com/C400001Dursw2Euf2f.m4a?guid=7480609908&vkey=6F0536ECE6586385DD4C291707769D8EEA6C8BE499F3D2038EF942070291CDE7A70A118F23F95F0D086AFE83C51AD234954ADDFE033B2CFA&uin=0&fromtag=6
// http://dl.stream.qqmusic.qq.com/C4000027hh153DJIcq.m4a?guid=7480609908&vkey=4E3F05DA9EB084857D7D53C18BB9EA899D0FD3A16C2A7F5D09367FFD3D9D5B7D13A1D725643FE23B9632016816CCAC732929B887156BBCF9&uin=0&fromtag=66

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
