<template>
  <div class="footer">
    <div class="main-position" contenteditable="true">
      <div class="main">
        <div :class="'left' + (isWriting ? ' writing' : '')" @blur="contentBlur" >
          <div class="content" ref="content" v-html="content"
            @focus="startWrite">
          </div>
          <div class="emoji" @click="showPackage">表情</div>
          <div class="send" @click="sendComment">发送</div>
          <div class="emoji-package" v-if="show">
            <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + n + '.gif'"
              alt="" v-for="n in 20" :key="n" @click="addImage" />
          </div>
        </div>
        <div class="center" @click="contentFoucs" v-show="!isWriting">
          <p>写评论</p>
        </div>
        <div class="right" v-show="!isWriting">
          <div class="collection">收藏</div>
          <div class="share">分享</div>
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
      content: '',
      preContent: '写评论',
      show: false,
      range: '',
      selection: '',
      isWriting: false
    }
  },
  methods: {
    showPackage () {
      if (!this.selection) {
        this.$refs.content.focus()
      } else {
        this.range && this.selection.removeAllRanges() && this.selection.addRange(this.range)
      }
      this.show = !this.show
    },
    contentBlur () {
      console.log(999)
      this.range = this.selection.getRangeAt(0)
      this.isWriting = false
      if (this.content) {
        this.preContent = '草稿' + this.content
      }
      // console.log(this.range)
    },
    startWrite () {
      if (!this.selection) {
        this.selection = document.getSelection()
        this.range = this.selection.getRangeAt(0)
      } else {
        console.log(this.selection)
        // this.range && this.selection.removeAllRanges() && this.selection.addRange(this.range)
      }
    },
    contentFoucs (e) {
      this.isWriting = true
      console.log(document.getSelection().getRangeAt(0))
      this.$refs.content.focus()
      // let node = e ? e.target : {}
      // this.selection = document.getSelection()
      // this.range = this.selection.getRangeAt(0)
      // if (node.tagName === 'IMG') {
      //   this.setCursor(node, e.offsetX < node.width / 2)
      // }
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
      console.log(this.range)
    },
    sendComment () {}
  },
  mounted () {
    // this.range = document.createRange()
  }
}
</script>

<style lang="stylus" scoped>
.footer
  position fixed
  // top calc(100% - 1rem)
  bottom 0
  left 0
  width 100%
  .main-position
    height .8rem
    line-height .8rem
    position relative
    .main
      display flex
      border-top 1px solid #eee
      height 100%
      position absolute
      width 100%
      bottom 0
      background #fff
      align-items flex-end
      div.writing
        flex 1
      .left
        flex 0
        display flex
        background #ffffff
        overflow hidden
        position relative
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
          float right
        .content
          flex 1
          background #fff
          width 100%
          min-height 100%
          outline none
          padding 0 .2rem
          box-sizing border-box
          .text
            padding-bottom .1rem
            font-size .32rem
            line-height 1.5
            img
              width 1.5em
              object-fit cover
              vertical-align bottom
      .center
        height 100%
        padding .1rem .3rem
        flex 1
        box-sizing border-box
        p
          background #eee
          color #999
          height 100%
          border-radius .7rem
          line-height .6rem
          padding 0 .2rem
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      .right
        width 2rem
        // background #888
        display flex
        height 100%
        position relative
        >div
          width 1rem
        // .collection
          // background #0ff
        // .share
          // background #f0f
</style>
