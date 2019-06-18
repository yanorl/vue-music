<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/MusicList'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  name: 'disc-box',
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.disc.title
    },
    bgImage () {
      return this.disc.cover_url_medium
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.tid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.tid).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.cdlist[0])
          this.songs = this._normalizeSongs(res.cdlist[0])
          // console.log(this.songs)
        }
      })
    },
    noPay (list) {
      return list.filter((item) => {
        return item.pay.pay_play !== 1
      })
    },
    _normalizeSongs (musicData) {
      let list = this.noPay(musicData.songlist)
      let songid = musicData.songids
      let ret = []
      let arrSongid = []
      arrSongid.push(songid.split(','))
      list = list.map((item, index) => (item.songid ? item : Object.assign(item, {songid: arrSongid[0][index]})))
      list.forEach((item) => {
        // ret.push(createRecommendSong(item))
        item = Object.assign(item, {
          songmid: item.mid,
          songname: item.name,
          albumname: item.album.name,
          interval: item.interval,
          albummid: item.album.mid
        })
        ret.push(createSong(item))
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
  transition: all .3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
