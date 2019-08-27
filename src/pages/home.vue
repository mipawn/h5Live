<template>
  <div class="home">
    <header class="logo">
      <img src="../assets/imgs/logo.jpg" alt="">
    </header>
    <section>
      <div class="tabs">
        <dl v-for="(item, index) of tabList" :key="index" :class="{active:item.path === activePath}"
          @click="tabChange(item)">
          <dd :class="'iconfont icon-' + item.icon"></dd>
          <dt>{{item.name}}</dt>
        </dl>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      tabList: [
        {
          name: '最热',
          icon: 'cc-heart',
          path: 'hot'
        },
        {
          name: '最新',
          icon: 'star',
          path: 'last'
        },
        {
          name: '更多',
          icon: 'more',
          path: 'more'
        }
      ],
      activePath: 'hot'
    }
  },
  methods: {
    tabChange (item) {
      this.activePath = item.path
      this.$router.push({
        path: item.path
      })
    }
  },
  mounted () {
    this.activePath = location.hash.split('/')[2]
  }
}
</script>

<style lang="stylus" scoped>
.home
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  overflow auto
  background #eee
  .logo
    position relative
    z-index 1
    img
      width 100%
  section
    display flex
    flex-direction column
    .tabs
      display flex
      position sticky
      top -1px
      left 0
      z-index 1
      background #ffffff
      box-shadow 0 0 20px 1px rgba(0, 0, 0, .2)
      dl
        flex 1
        height 1.2rem
        display flex
        flex-direction column
        justify-content center
        align-items center
        dd
          font-size .4rem
          margin-bottom .1rem
        .icon-cc-heart
          color #f60
        .icon-star
          color #4bb9f6
          font-size .5rem
        .icon-more
          color #cb2de0
      .active
        position relative
        color #f00
        &:before
          content ''
          position absolute
          width 50%
          left 25%
          height 2px
          background #f00
          bottom -1px
</style>
