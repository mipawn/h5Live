<template>
  <img :src="details.img_src" alt="" v-if="type == 1" id="poster">
  <img :src="details.video_img_src" alt="" v-else-if="playTime == false" id="poster">
  <div id="player" v-else-if="playTime"></div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      type: 1,
      details: '',
      id: '',
      source: '', // 直播资源
      playTime: false, // 是否到播放时间
      isLive: true, // 是否为直播
      playCountDown: '', // 播放倒计时
    }
  },
  methods: {
    init () {
      let player = new Aliplayer({ //eslint-disable-line
        id: 'player',
        source: this.source,
        width: '100%',
        height: '100%',
        autoplay: false,
        isLive: this.isLive, 
        rePlay: false,
        playsinline: true,
        preload: true,
        cover: this.details.img_src,
        controlBarVisibility: 'click',
        useH5Prism: true,

      })
    },
    getDetails () { // 获取详情
      this.$http({
        url: 'http://admin.wisexs.com/v1/live/details',
        params: {
          id: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.code === 200) {
          this.details = res.data
          this.type = res.data.type
          if (this.type == 1) { // 图文直播判断倒计时
            this.isLive = true
            let timeNow = new Date().getTime() // 当前时间戳
            let startTime = new Date(res.data.start_time.replace(/-/g, "/")).getTime() // 直播开始时间戳
            let playTime = startTime - timeNow // 距离直播的时间
            if (playTime > 0) {
              this.playTime = false
              let timer = setInterval(() => { // 计算倒计时
                if (playTime > 1000) {
                  playTime = playTime - 1000
                  let day = parseInt(playTime/1000/3600/24)
                  let hour = parseInt(playTime/1000/3600%24)
                  let minute = parseInt(playTime/1000/60%60)
                  let second = parseInt(playTime/1000%60)
                  this.playCountDown = '距开播还剩' + day + '天' + hour + '时' + minute + '分' + second + '秒'
                  sessionStorage.playCountDown = this.playCountDown
                } else {
                  clearInterval(timer)
                  this.source = res.data.live_src
                  this.playCountDown = 0
                  this.playTime = true
                  this.type = 2
                  sessionStorage.playCountDown = 0
                  this.$nextTick(() => {
                    this.init() // 加载播放器
                  })
                }
              },1000)
            } else if(playTime > 1000) {
              sessionStorage.playCountDown = ''
              this.playTime = true
              this.source = res.data.live_src
              this.$nextTick(() => {
                this.init() // 加载播放器
              })
            } else {
               sessionStorage.playCountDown = ''
                this.playTime = false
            }
          } else if(this.type == 3) { // 重播
            this.isLive = false
            this.source = res.data.vod_url
            this.playTime = true
            this.$nextTick(() => {
              this.init() // 加载播放器
            })
          } else if (this.type == 2) { // 直播开启
            this.source = res.data.live_src
            this.playCountDown = 0
            this.playTime = true
            sessionStorage.playCountDown = 0
            this.$nextTick(() => {
              this.init() // 加载播放器
            })
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetails()
    this.isLive = this.type == 2 ? true : false
  },
}
</script>

<style scoped>
    #player {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: contain;
      width: 100%;
    }
    #poster {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    #player >>> .prism-big-play-btn {
      width: 0.8rem;
      height: 0.8rem;
    }
    #player >>> .outter {
      border: none;
    }
    #player >>> .prism-big-play-btn {
      left: 0.3rem!important;
      bottom: 0.3rem!important;
    }
</style>
