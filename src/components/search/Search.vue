<template>
  <div class="search-box">
    <div class="search-box-wrapper">
      <search-wrap ref="searchWrap" @query="onQueryChange"></search-wrap>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotkey" :key="item.n" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @listScroll="blurInput"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchWrap from 'base/search-wrap/SearchWrap'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/Suggest'

export default {
  name: 'search-box',
  data () {
    return {
      hotkey: [],
      query: ''
    }
  },
  components: {
    SearchWrap,
    Suggest
  },
  created () {
    this._getHotKey()
  },
  methods: {
    blurInput () {
      this.$refs.searchWrap.blur()
    },
    addQuery (query) {
      this.$refs.searchWrap.setQuery(query)
    },
    onQueryChange (query) {
      this.query = query
    },
    _getHotKey () {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search-box
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
