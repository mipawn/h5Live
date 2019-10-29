<template>
  <div class="home">
    <!-- <img v-if="details.window_status == 1 && downCount > 0" :src="details.window_src" alt="" class="hello"> -->
    <header id="live" v-if="downCount == 0" style="position:relative;">
      <player></player>
      <div class="playCountDown" v-if="playCountDown && type == 1">{{playCountDown}}</div>
    </header>
    <section v-if="downCount == 0">
      <div class="nav">
        <ul>
          <li :class="{active:idx===index}" v-for="(item, index) of list" :key="index">
            {{item.name}}
          </li>
        </ul>
        <div class="introduce">
          <div class="paragraph" v-html="details.introduce"></div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import player from '../components/player'
// import footerbar from './components/footerbar'
export default {
  name: 'home',
  components: {
    player,
    // footerbar
  },
  data () {
    return {
      idx: 0,
      list: [ // 选项卡
        {
          name: '活动介绍',
          path: 'intro'
        }
      ],
      id: '',
      type: '',
      details: {
        title: ''
      },
      userInfo: '', // 用户信息
      downCount: 2, // 开机动画时间 s
      playCountDown : '' // 倒计时
    }
  },
  methods: {
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
          document.title = res.data.title
          if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            const hack = document.createElement('iframe')
            hack.style.display = 'none'
            hack.src = 'index.html'
            document.body.appendChild(hack)
            setTimeout(() => {
              document.body.removeChild(hack)
            },300)
          }
          if(res.data.window_status == 1) {
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

  },
  mounted () {
    let {id} = this.$route.query
    this.id = id
    this.getDetails()
    let timer = setInterval(() => {
      if (sessionStorage.playCountDown !== 0) {
        this.playCountDown = sessionStorage.playCountDown
      } else {
        clearInterval(timer)
        this.playCountDown = 0
      }
      },1000)
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
    // background url(../assets/imgs/ad-bg.png) no-repeat
    background-size cover
    display flex
    justify-content space-between
    padding 0 0.6rem
    box-sizing border-box
    align-items center
    position relative
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
          // color red
          // border-bottom-color red
    .bg
      flex 1
      overflow auto
      paddint-bottom 1.7rem
.hello 
  position fixed
  z-index 1000
  width 100%
  height 100%
  object-fit cover
.playCountDown
  position absolute
  z-index 999999
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
.onlineNum 
  display flex
  flex-direction column
  box-sizing border-box
  justify-content  flex-end
  height 1rem
  font-size 0.3rem
  z-index 999
  color #fff
  div 
    margin-top 0.14rem
</style>
<style scoped>
  .introduce {
    padding: 0.4rem;
    line-height: 1.5;
  }
  .paragraph{
    margin-top: 0.3rem;
    word-wrap: break-word;
  }
  .paragraph:nth-of-type(1) {
    margin: 0;
  }
</style>

<style>
  .prism-player .prism-info-display {
    padding-left: 0;
    padding-right: 0;
  }
</style>
