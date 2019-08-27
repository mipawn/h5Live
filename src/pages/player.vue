<template>
  <div class="player">
    <video controls>
      <source :src="high">
      <source :src="standard">
    </video>
  </div>
</template>

<script>
export default {
  name: 'player',
  props: {
    high: String
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.player
  video
    width 100%
</style>
