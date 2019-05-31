<template>
  <div id="app">
     <my-header></my-header>
     <tab></tab>
     <keep-alive>
      <!-- 切换页面不重新获取ajax -->
       <router-view/>
     </keep-alive>
     <player></player>
  </div>
</template>

<script>
import MyHeader from 'components/my-header/Header'
import Tab from 'components/tab/Tab'
import Player from 'components/player/Player'

export default {
  name: 'App',
  components: {
    MyHeader,
    Tab,
    Player
  }
}
</script>

<style>

</style>
