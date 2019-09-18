<template>
  <div class="container" id="video">
    <div class="video">
      <img :src="poster" alt="" v-if="type == 1">
      <div id="player" class="" v-else></div>
    </div>
    <img :src="img" alt="" v-if="img" class="bg">
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: 0,
      img: '',
      src: '',
      type: 1,
      isLive: false,
      poster: ''
    }
  },
  methods: {
    init () {
      let player = new Aliplayer({ //eslint-disable-line
        id: 'player',
        source: this.src,
        width: '100%',
        height: '100%',
        autoplay: false,
        isLive: this.isLive,
        rePlay: false,
        playsinline: true,
        preload: true,
        poster: this.poster,
        controlBarVisibility: 'click',
      })
    },
    getDetails () { // 获取详情
      this.$axios({
        url: this.baseUrl+'v1/live/details',
        params: {
          id: this.id,
        },
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.img = res.data.data.pc_img
          this.poster = res.data.data.img_src
          this.type = res.data.data.type
          if (this.type === 2) {
            this.isLive = true
            this.src = res.data.data.live_src
            this.$nextTick(() => {
              this.init()
            })
          } else if(this.type == 3){
            this.isLive = false
            this.src = res.data.data.vod_url
            if (this.src !== '') {
              this.$nextTick(() => {
                this.src = res.data.data.vod_url
                this.init()
              })
            }
            
          }
          document.title = res.data.data.title
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goPAGE() {
     var browser = {  
            versions: function() {  
                var u = navigator.userAgent, app = navigator.appVersion;  
                return {     //移动终端浏览器版本信息  
                    trident: u.indexOf('Trident') > -1, //IE内核  
                    presto: u.indexOf('Presto') > -1, //opera内核  
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器  
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
                    iPad: u.indexOf('iPad') > -1, //是否iPad  
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
                };  
            } (),  
            language: (navigator.browserLanguage || navigator.language).toLowerCase()  
        }  
        if (browser.versions.mobile) {
          this.$router.push({path: 'home/intro', query: {id: this.id}}) 
        }  
        // else { 
        //   this.$router.push({name: 'video'})
        // }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetails()
    this.goPAGE()
  }
}
</script>

<style scoped>

.container {
  /* min-height: 900px; */
  position: relative;
}
.video {
  width: 40vw;
  height: 35vh;
  min-width: 640px;
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  min-height:360px;
  margin: 0 auto;
  /* object-fit: contain; */

}
.video img {
  width: 100%;
}
.bg {
  width: 100%;
  height: 100vh;
}
</style>

