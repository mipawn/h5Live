<template>
  <div class="home">
    <div class="ad">
      广告
    </div>
    <header id="live" >
    </header>
    <section>
      <div class="nav">
        <ul>
          <li :class="{active:idx===index}" v-for="(item, index) of list" :key="index" @click="goto(item.path, index)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <router-view class="bg"></router-view>
    </section>
    <footer>
      <div class="emoji" ref="emoji" v-html="html">
      </div>
      <div @click="handle">
        对对对<br>
        八方
      </div>
    </footer>
    <!-- <remote :type="'js'" :url="remotejs" :js-load-call-back="loadRemoteJs"></remote> -->
    <remote :type="'css'" :url="remotecss"></remote>
  </div>
</template>

<script>
import remote from './components/remote'
export default {
  name: 'home',
  components: {
    remote
  },
  data () {
    return {
      idx: 0,
      list: [
        {
          name: '图文直播',
          path: ''
        },
        {
          name: '互动聊天',
          path: ''
        },
        {
          name: '活动介绍',
          path: ''
        },
        {
          name: '往期活动',
          path: ''
        }
      ],
      html: 'default',
      remotejs: 'https://g.alicdn.com/de/prismplayer/2.7.2/aliplayer-h5-min.js',
      remotecss: 'https://g.alicdn.com/de/prismplayer/2.7.2/skins/default/aliplayer-min.css'
    }
  },
  methods: {
    goto (path, i) {
      this.idx = i
      this.$router.push({
        path
      })
    },
    loadRemoteJs () {
      var player = new Aliplayer({ //eslint-disable-line
        id: 'live',
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
      },
      function (player) {
      })
    },
    handle () {
      this.html += '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif"/>'
    }
  },
  mounted () {
    this.$refs.emoji.contentEditable = true
    this.handle()
  }
}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-direction column
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  overflow-y auto
  .ad
    height 1.6rem
    background #dddddd
  header
    padding-top 56%
    height 0 !important
    border-bottom 1px solid #dddddd
  section
    flex 1
    .nav
      ul
        display flex
        li
          flex 1
          height 1rem
          line-height 1rem
          font-size .32rem
          text-align center
          color #444
          border-bottom 2px solid transparent
          box-sizing border-box
        .active
          color red
          border-bottom-color red
  footer
    background #cccccc
    .emoji
      width 3rem
      min-height 1rem
      background #fff
</style>
