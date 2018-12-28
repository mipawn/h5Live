<template>
  <div class="footer">
    <div class="main-position">
      <div class="main">
        <div class="left">
          <div class="content" contenteditable="true" ref="content" @blur="contentBlur" @click="contentFoucs">
            <span class="text" ref="focus" v-html="content"></span>
          </div>
        </div>
        <div class="right">
          <div class="emoji" @click="showPackage"></div>
          <div class="emoji-package" v-if="show">
            <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + n + '.gif'"
              alt="" v-for="n in 20" :key="n" @click="addImage">
          </div>
          <div class="collection"></div>
          <div class="share"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerbar',
  data () {
    return {
      content: 'default',
      show: false,
      range: {},
      selection: {}
    }
  },
  methods: {
    showPackage () {
      this.show = !this.show
      this.selection.removeAllRanges()
      this.selection.addRange(this.range)
    },
    contentBlur () {
    },
    contentFoucs (e) {
      let node = e.target
      this.selection = document.getSelection()
      this.range = this.selection.getRangeAt(0)
      if (node.tagName === 'IMG') {
        this.setCursor(node, e.offsetX < node.width / 2)
      }
    },
    addImage (e) {
      let node = e.target.cloneNode(true)
      this.range.insertNode(node)
      this.setCursor(node, false)
    },
    setCursor (node, before) {
      let range = document.createRange()
      range.selectNodeContents(node)
      range.setStart(before ? node : node.nextSibling, 0)
      range.collapse(true)
      this.selection.removeAllRanges()
      this.selection.addRange(range)
      this.range = this.selection.getRangeAt(0)
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
.footer
  background #cccccc
  position fixed
  top calc(100% - 1rem)
  left 0
  width 100%
  .main-position
    height 1rem
    position relative
    .main
      display flex
      // box-shadow 0 0 20px rgba(0,0,0,.4)
      border-top 1px solid #ddd
      min-height 1rem
      position absolute
      width 100%
      bottom 0
      background #fff
      align-items flex-end
      .left
        flex 1
        background #ffffff
        overflow hidden
        align-self flex-start
        .content
          background #fff
          width 100%
          min-height 100%
          outline none
          padding .1rem
          box-sizing border-box
          .text
            padding-bottom .1rem
            font-size .32rem
            line-height 1.5
            img
              width 1.5em
              object-fit cover
              vertical-align bottom
            // border-bottom 1px solid #444
      .right
        width 3rem
        background #888
        display flex
        height 1rem
        position relative
        >div
          width 1rem
        .emoji-package
          border-top 1px solid #ddd
          position absolute
          right 0
          bottom calc(100% + 2px)
          background #ffffff
          width 100vw
          height 2.4rem
          display grid
          grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr
          justify-items center
          align-items center
        .emoji
          background #f00
        .collection
          background #0ff
        .share
          background #f0f
</style>
