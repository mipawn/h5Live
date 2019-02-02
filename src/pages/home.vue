<template>
  <div class="home">
    <div class="ad">
      广告
    </div>
    <header id="live" >
      <!-- <div id="player">
        <iframe src="https://s.wcd.im/v/32ghjZ3a/?qr=" frameborder="0"></iframe>
      </div> -->
      <player></player>
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
    <footerbar></footerbar>
  </div>
</template>

<script>
import player from './components/player'
import footerbar from './components/footerbar'
export default {
  name: 'home',
  components: {
    player,
    footerbar
  },
  data () {
    return {
      idx: 0,
      list: [
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
      ]
    }
  },
  methods: {
    goto (path, i) {
      this.idx = i
      this.$router.push({
        path
      })
    }
  },
  mounted () {
    this.$router.push({
      path: 'live'
    })
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
</style>
