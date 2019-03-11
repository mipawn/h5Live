<template>
  <div class="chat">
    <ul class="chat-list">
      <li>
        <header>
          <div class="title">
            <div class="left">名字</div>
            <div class="right">
              <span>15</span>
              <i class="iconfont icon-good"></i>
            </div>
          </div>
          <div class="create-time">2小时前</div>
        </header>
        <section>
          支持G20
        </section>
      </li>
      <li>
        <header>
          <div class="title">
            <div class="left">名字</div>
            <div class="right">
              <span>15</span>
              <i class="iconfont"></i>
            </div>
          </div>
          <div class="create-time">2小时前</div>
        </header>
        <section>
          支持G20
        </section>
      </li>
      <li>
        <header>
          <div class="title">
            <div class="left">名字</div>
            <div class="right">
              <span>15</span>
              <i class="iconfont"></i>
            </div>
          </div>
          <div class="create-time">2小时前</div>
        </header>
        <section>
          支持G20
        </section>
      </li>
      <li>
        <header>
          <div class="title">
            <div class="left">名字</div>
            <div class="right">
              <span>15</span>
              <i class="iconfont"></i>
            </div>
          </div>
          <div class="create-time">2小时前</div>
        </header>
        <section>
          支持G20
        </section>
      </li>
      <li>
        <header>
          <div class="title">
            <div class="left">名字</div>
            <div class="right">
              <span>15</span>
              <i class="iconfont"></i>
            </div>
          </div>
          <div class="create-time">2小时前</div>
        </header>
        <section>
          支持G20
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chat'
}
</script>

<style lang="stylus" scoped>
.chat
  line-height 1.5
  overflow-y auto
  .chat-list
    padding .2rem 0
    li
      padding .1rem .4rem
      border-bottom 1px solid #dddddd
      header
        margin-bottom .1rem
        .title
          display flex
          justify-content space-between
          .left
            font-size .3rem
            color #3bf
          .right
            color #aaa
            // font-size .28rem
        .create-time
          color #bbb
          font-size .24rem
      section
        font-size .32rem
</style>
