<template>
  <div class="home">
    <img v-if="details.window_status == 1 && downCount > 0" :src="details.window_src" alt="" class="hello" @click="closePackage">
    <div class="ad" v-if="downCount == 0">
      广告
    </div>
    <header id="live" v-if="downCount == 0" @click="closePackage">
      <player></player>
    </header>
    <section v-if="downCount == 0" @click="closePackage">
      <div class="nav">
        <ul>
          <li :class="{active:idx===index}" v-for="(item, index) of list" :key="index" @click="goto(item.path, index)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <router-view class="bg" @goLive="goLive" ></router-view>
    </section>
    <footerbar :details="details" v-if="downCount == 0" ref="footerbar"></footerbar>
    <div class="playCountDown" v-if="playCountDown && playId == id && type == 2" @click="closePackage">{{playCountDown}}</div>
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
    }
  },
  mounted () {
    let {id, type} = this.$route.query
    this.id = id
    this.type = type
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
    position relative
    background #000
    >div
      position absolute
      top 0
      height 100%
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
  position fixed
  z-index 200
  background red
  top 0.2rem
  right 0.4rem
  color #fff
  display flex
  padding 0.1rem
  border-radius 0.1rem
</style>
