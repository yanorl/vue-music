<template>
  <div id="app">
     <my-header></my-header>
     <tab></tab>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from 'components/my-header/Header'
import Tab from 'components/tab/Tab'

export default {
  name: 'App',
  components: {
    MyHeader,
    Tab
  }
}
</script>

<style>

</style>
