<template>
  <div class="rank-box">
    <p v-on:click="show = !show">
      Toggle
    </p>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'rank-box',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.fade-enter-active, .fade-leave-active
  transition: all .3s
.fade-enter, .fade-leave-to
  transform: translate3d(100%, 0, 0)
</style>
