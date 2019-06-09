<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { getPlayUrl } from 'api/playUrl'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/MusicList'
export default {
  name: 'singerDetail-box',
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          let _songmid = musicData.songmid
          getPlayUrl(_songmid).then((res) => {
            if (res.code === ERR_OK) {
              // console.log(res.req_0.data.midurlinfo[0])
              let songLink = `http://dl.stream.qqmusic.qq.com/${res.req_0.data.midurlinfo[0].purl}`
              ret.push(createSong(musicData, songLink))
            }
          })
          // ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
