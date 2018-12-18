<template>
  <div id="player"></div>
</template>

<script>
// import '@/assets/css/aliplayer.css'
// import Aliplayer from '@/assets/js/aliplayer.js'
export default {
  name: 'player',
  methods: {
    init () {
      let player = new Aliplayer({ //eslint-disable-line
        id: 'player',
        source: 'https://xsgbdst.oss-cn-shanghai.aliyuncs.com/zhxs/20170512mqjjfjx.mp4',
        width: '100%',
        height: '500px',
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
  beforeCreate () {
    let script = document.createElement('script')
    script.src = 'https://g.alicdn.com/de/prismplayer/2.7.2/aliplayer-h5-min.js'
    script.onload = () => {
      console.log('js')
    }
    
  }
}
</script>

<style>

</style>
