<template>
  <div class="stage">
    <header>
      <h1>爱心驿家服务点</h1>
      <p>“爱心驿家”是由工会创建，常年免费开放，为环卫工人、交通协辅警、城管协管员、快递员、外卖小哥、
        道路停车收费员等各类户外劳动者提供免费服务，解决户外劳动者在纳凉、热饭、饮水、休息、
        如厕等面临的实际困难的服务平台。</p>
      <br><h2>● 江东一路与东三路交叉口（前进成校内）——妈咪小屋</h2>
      <br><h2>● 永丰路与河庄路交叉口（河庄街道办事处广场）</h2>
      <br><h2>● 义蓬街道义和社区2楼</h2>
    </header>
  </div>
</template>

<script>
export default {
  name: 'stage',
  data () {
    return {
      idx: 1
    }
  },
  methods: {
    tabChange (i) {
      this.idx = i
    }
  }
}
</script>

<style lang="stylus" scoped>
.stage
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background mainbg
  display flex
  flex-direction column
  overflow-y auto
  header
    margin 0.4rem
    color #ffffff
    h1
      font-size .44rem
      text-align center
      padding .4rem 0
    p
      font-size .32rem
      text-indent .64rem
      line-height 1.5
    h2
      font-size .32rem
      line-height 1.5
  .hidden
    overflow-y hidden
  section
    margin 0 .4rem .4rem
    background #ffffff
    flex 1
    .container
      .nav
        display flex
        background navbg
        li
          flex 1
          padding .3rem 0
          text-align center
          color navColor
          font-size .32rem
        .active
          color #ffffff
          background activebg
      .content
        padding .5rem .4rem
        li
          line-height 1.5
          font-size .32rem
          color #444
          img
            width 100%
            margin-top .4rem
          i
            color red
          b
            font-weight bold
</style>
