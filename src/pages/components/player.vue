<template>
  <div id="player"></div>
</template>

<script>
export default {
  name: 'player',
  methods: {
    init () {
      let player = new Aliplayer({ //eslint-disable-line
        id: 'player',
        source: 'https://xsgbdst.oss-cn-shanghai.aliyuncs.com/zhxs/20170512mqjjfjx.mp4',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      })
    }
  },
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

</style>
