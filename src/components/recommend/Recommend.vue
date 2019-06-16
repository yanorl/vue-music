<template>
  <div class="recommend-box" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="songList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in songList" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.cover_url_medium">
                <span class="count"><i class="fa fa-headphones" aria-hidden="true"></i>{{item.access_num}}</span>
                <span class="play"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span>
              </div>
              <div class="text">
                <p class="desc" v-html="item.title"></p>
                <h2 class="name" v-html="item.creator_info.nick"></h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!songList.length">
        <loading></loading>
      </div>
      <router-view></router-view>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/Loading'
import Scroll from 'base/scroll/Scroll'
import Slider from 'base/slider/Slider'
import { getRecommend, getDiscList, getPcRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'
export default {
  name: 'recommend-box',
  mixins: [playlistMixin],
  data () {
    return {
      recommends: [],
      songList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this._getRecommend()
    this._getDiscList()
    this._getPcRecommend()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.tid}`
      })
      this.setDisc(item)
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.data.code === ERR_OK) {
          this.recommends = res.data.data.slider
          // this.songList = res.data.data.songList
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        // console.log(res)
      })
    },
    _getPcRecommend () {
      getPcRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res)
          this.songList = res.playlist.data.v_playlist
          // console.log(this.songList)
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .ellipsis
    font-size: 14px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    font-weight: 400
  .recommend-box
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        ul
          overflow: hidden
        .item
          float: left
          width: 50%
          -webkit-box-sizing: border-box
          padding-right: 8px
          margin-bottom: 10px
          overflow: hidden
          .icon
            position: relative
            margin-bottom: 5px
            font-size: 12
            &:before
              content: ""
              display: block
              padding-top: 100%
            img
              position: absolute
              top: 0
              left: 0
              display: block
              width: 100%
              z-index: 1
            .count
              left: 5px
              bottom: 7px
              display: block
              line-height: 12px
              color: #fff
              position: absolute
              z-index: 10
              font-size: 12px
              .fa-headphones
                display: block
                float: left
                margin-right: 5px
            .play
              position: absolute
              right: 5px
              bottom: 7px
              z-index: 10
              .fa-play-circle-o
                font-size: 24px
        .text
          padding: 0 7px 5px
          line-height: 1.5
          .name
            font-size: 12px
            @extends .ellipsis
          .desc
             @extends .ellipsis
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
