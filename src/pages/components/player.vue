<template>
  <!-- <video src="https://xsgbdst.oss-cn-shanghai.aliyuncs.com/zhxs/20170512mqjjfjx.mp4" id="player" autoplay controls 
  preload="auto" 
  webkit-playsinline="true" 
  playsinline="true"
  x5-video-player-type="h5" 
  x5-video-player-fullscreen="portraint" onerror="window.VIDEO_FAILED=1"
  :poster="details.live_src"></video> -->
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
        skinLayout:[ //按钮UI
                {"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"progress","align":"blabs","x":0,"y":44},
                        {"name":"playButton","align":"tl","x":15,"y":12},//播放
                        {"name":"volume","align":"tr","x":10,"y":10},//声音
                        {"name":"fullScreenButton","align":"tr","x":10,"y":10},
                        ]}
        ],
        components: [
        {
          name: 'PauseADComponent',
          type: AliPlayerComponent.PauseADComponent,
          args: ['http://h5.xianghunet.com/live/static/img/ad-video.jpg', 'https://a.app.qq.com/o/simple.jsp?pkgname=com.wisexs.xstv']
        }
        ]
      })
      // player.on('cancelFullScreen', ()=> {
        
      // })
    },
    getDetails () { // 获取详情
      this.$axios({
        url: this.baseUrl+'v1/live/details',
        params: {
          id: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.details = res.data.data
          if (res.data.data.vod_url === '') {
            this.type = 1
            this.details.img_src = 'http://h5.xianghunet.com/live/static/img/wait.jpg'
            return
          }
          this.type = res.data.data.type
          if (this.type == 1) { // 图文直播判断倒计时
            this.isLive = true
            let timeNow = new Date().getTime() // 当前时间戳
            let startTime = new Date(res.data.data.start_time.replace(/-/g, "/")).getTime() // 直播开始时间戳
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
                  this.source = res.data.data.live_src
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
              this.source = res.data.data.live_src
              this.$nextTick(() => {
                this.init() // 加载播放器
              })
            } else {
               sessionStorage.playCountDown = ''
                this.playTime = false
            }
          } else if(this.type == 3) { // 重播
            this.isLive = false
            this.source = res.data.data.vod_url
            this.playTime = true
            this.$nextTick(() => {
              this.init() // 加载播放器
            })
          } else if (this.type == 2) { // 直播开启
            this.source = res.data.data.live_src
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
  beforeRouteLeave (to, from, next) {
    sessionStorage.playTime = ''
    next()
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
</style>
