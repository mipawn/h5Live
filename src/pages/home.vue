<template>
  <div class="home">
    <img v-if="details.window_status == 1 && downCount > 0" :src="details.window_src" alt="" class="hello" @click="closePackage">
    <div class="ad" v-if="downCount == 0" @click="download">
      <img src="../assets/imgs/ad-text.png" alt="">
    </div>
    <header id="live" v-if="downCount == 0 || details.type == 2" @click="closePackage" style="position:relative;">
      <player></player>
      <div class="playCountDown" v-if="playCountDown && playId == id && type == 1" @click="closePackage">{{playCountDown}}</div>
    </header>
    <section v-if="downCount == 0" @click="closePackage">
      <div class="nav">
        <ul>
          <li :class="{active:idx===index}" v-for="(item, index) of list" :key="index" @click="goto(item.path, index)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <router-view class="bg" @goLive="goLive" ref="tab"></router-view>
    </section>
    <footerbar :details="details" v-if="downCount == 0" ref="footerbar" @changeCommentList="changeCommentList"></footerbar>
  </div>
</template>

<script>
import player from './components/player'
import footerbar from './components/footerbar'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    player,
    footerbar
  },
  data () {
    return {
      idx: 0,
      list: [ // 选项卡
        {
          name: '图文直播',
          path: 'live'
        },
        {
          name: '互动聊天',
          path: 'chat'
        },
        {
          name: '活动介绍',
          path: 'intro'
        },
        {
          name: '往期活动',
          path: 'ago'
        }
      ],
      id: '',
      type: '',
      details: {
        title: ''
      },
      userInfo: '', // 用户信息
      downCount: 2, // 开机动画时间 s
      playCountDown : '', // 倒计时
      playId: sessionStorage.playId // 播放视频id
    }
  },
  methods: {
    closePackage () { // 控制表情开关
      this.$refs.footerbar.closePackage()
    },
    goto (path, i) { // 选项卡的跳转
      this.idx = i
      this.$router.replace({
        path,
        query: this.$route.query
      })
    },
    goLive (query) {
      this.idx = 0
      this.$router.push({path:'live', query: query})
    },
    getUserInfo() { // 获取用户信息
      if (window.SZJSBridge) {
        this.userInfo = window.PalauAPI.user.userInfo()
      }
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
          this.type = res.data.data.type
          document.title = res.data.data.title
          if(res.data.data.window_status == 1) {
            this.downCount = 3
            this.countDown() // 开启倒计时
          } else {
            this.downCount = 0
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    countDown () { // 开机动画倒计时
      let timer = setInterval(() => {
        if(this.downCount > 0) {
          this.downCount  = this.downCount - 1
        } else {
          clearInterval(timer)
        }
      },1000)
    },
    changeCommentList () { // 重新读取评论列表
      this.$refs.tab.getComment()
    },
    download () {
      window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.wisexs.xstv'
    }
  },
  mounted () {
    let {id} = this.$route.query
    this.id = id
    this.getUserInfo()
    this.getDetails()
    let timer = setInterval(() => {
      if (sessionStorage.playCountDown !== 0) {
        this.playCountDown = sessionStorage.playCountDown
      } else {
        clearInterval(timer)
        this.playCountDown = false
      }
      },1000)
  },
  updated () {
    this.playId = sessionStorage.playId
    if(this.$route.name === 'live') {
      this.idx = 0
    } else if (this.$route.name === 'chat') {
      this.idx = 1
    } else if (this.$route.name === 'intro') {
      this.idx = 2
    } else if (this.$route.name === 'ago') {
      this.idx = 3
    }
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
    background url(../assets/imgs/ad-bg.png) no-repeat
    background-size cover
    display flex
    justify-content center
    align-items center
    img 
      height 1rem
      max
  header
    padding-top 56%
    height 0 !important
    border-bottom 1px solid #dddddd
    position relative
    background #000
  section
    flex 1
    overflow hidden
    display flex
    flex-direction column
    padding-bottom .8rem
    .nav
      ul
        display flex
        box-shadow 0 0 20px #ddd
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
    .bg
      flex 1
      overflow auto
.hello 
  position fixed
  z-index 1000
  width 100%
  height 100%
  object-fit cover
.playCountDown
  position absolute
  z-index 200
  background rgba(0, 0, 0, 0.6)
  bottom 0.3rem
  left 50%
  transform translateX(-50%)
  color #fff
  display flex
  padding 0.14rem
  border-radius 0.1rem
  font-size 0.4rem
  white-space nowrap
</style>
