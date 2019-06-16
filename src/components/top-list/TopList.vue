<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/MusicList'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  name: 'topList-box',
  data () {
    return {
      songs: [],
      canPlaying: []
    }
  },
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'topList'
    ])
  },
  created () {
    this._getMusicList()
  },
  components: {
    MusicList
  },
  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.detail.data.songInfoList)
          this.songs = this._normalizeSongs(res.detail.data.songInfoList)
        }
      })
    },
    noPay (list) {
      this.canPlaying = list.filter((item) => {
        return item.pay.pay_play !== 1
      })
      // console.log(_list)
    },
    _normalizeSongs (list) {
      this.noPay(list)
      let ret = []
      this.canPlaying.forEach((item) => {
        if (item.id && item.album.mid) {
          item = Object.assign(item, {
            songid: item.id,
            songmid: item.mid,
            songname: item.name,
            albumname: item.album.name,
            interval: item.interval,
            albummid: item.album.mid
          })
          ret.push(createSong(item))
        }
      })
      return ret
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s ease
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
