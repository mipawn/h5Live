<template>
  <div class="live">
    <header>
      <div class="title">
        <div class="left">智慧萧山小编</div>
        <div class="right">
          <span>15</span>
          <i class="iconfont"></i>
        </div>
      </div>
      <div class="create-time">2小时前</div>
    </header>
    <section>
      精彩纷呈，二十国领导观看表演
      <img src="" alt="">
    </section>
  </div>
</template>

<script>
export default {
  name: 'live'
}
</script>

<style lang="stylus" scoped>
.live
  padding .4rem
  line-height 1.5
  header
    margin-bottom .2rem
    .title
      display flex
      justify-content space-between
      .left
        font-size .4rem
        color #3bf
      .right
        color #aaa
        font-size .32rem
    .create-time
      color #bbb
      font-size .28rem
</style>
