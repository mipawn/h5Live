<template>
  <div :class="'footer ' + (!isWriting ? 'footer-hide' : '')" @click.self="footerBlur">
    <div class="main-position">
      <div class="main">
        <div :class="'left' + (isWriting ? ' writing' : '')">
          <!-- 编辑器元素 -->
          <div class="content" ref="content"
            contenteditable="true"
            @blur="contentBlur"
            @click="contentFoucs">
          </div>
          <div class="emoji" @click="showPackage">
            <i class="iconfont icon-laugh"></i>
          </div>
          <div class="send" @click="sendComment">发送</div>
        </div>
        <!-- 表情包 -->
        <div class="emoji-package" v-show="show" @click="addImage">
          <div class="page1">
            <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + n + '.gif'"
              alt="" v-for="n in 21" :key="n" />
          </div>
          <div class="page2">
            <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + (n + 21) + '.gif'"
              alt="" v-for="n in 21" :key="n" />
          </div>
        </div>
        <div class="center" @click="startWrite" v-show="!isWriting">
          <p v-if="content">
            <span class="sketch">[草贴]</span>
            <span v-html="content"></span>
          </p>
          <p v-else>写评论</p>
        </div>
        <div class="right" v-show="!isWriting">
          <div class="share" @click="doShare">
            <i class="iconfont icon-share"></i>
          </div>
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
      range: {},
      selection: {},
      isWriting: false,
      items: 40
    }
  },
  methods: {
    contentBlur () {
      /**
       * 每次焦点移出都要保存一次当前 range ，后面好放回来
       * 由于输入框以外的点击都会使输入框失去焦点，不知道会有什么操作，故勤保存
       */
      this.range = this.selection.getRangeAt(0)
    },
    startWrite () {
      this.isWriting = true
      if (this.content) {
        // 如果focus前有内容， 光标设置到之前保存的位置 setCursor
        this.setCursor()
      } else {
        // 开始评论，输入框自动聚焦
        this.$refs.content.focus()
        this.contentFoucs()
      }
    },
    contentFoucs (e) {
      /**
       * range更新到点击的位置
       * 点到图片就根据点击位置和图片大小设置一个合理的位置(前或后)
       */
      let node = e ? e.target : {}
      this.range = this.selection.getRangeAt(0)
      if (node.tagName === 'IMG') {
        this.setCursor(node, e.offsetX < node.width / 2)
      }
    },
    showPackage () {
      this.show = !this.show
      this.setCursor()
    },
    addImage (e) {
      /** 
       * 点击emoji图片后，复制节点添到当前range里并设置光标和更新range 
       * 若是点到其他地方则设置到之前的位置
       */
      if (e.target.tagName === 'IMG') {
        let node = e.target.cloneNode(true)
        this.range.insertNode(node)
        this.setCursor(node, false)
      } else {
        this.setCursor()
      }
    },
    setCursor (node, before) {
      /**
       * node 为传入的节点，不传则foucs到之前保存的位置
       * before 控制折叠方向
       */
      if (node) {
        // 需要新建一个range来添加内容
        let range = document.createRange()
        range.selectNode(node)
        range.collapse(!!before)
        this.selection.removeAllRanges()
        this.selection.addRange(range)
        // 更新 range
        this.range = range
      } else {
        this.selection.removeAllRanges()
        // 使用之前的
        this.selection.addRange(this.range)
      }
    },
    footerBlur () {
      // 退出输入状态，保存内容
      this.show = false
      this.isWriting = false
      this.content = this.$refs.content.innerHTML
    },
    sendComment () {
      this.content = this.$refs.content.innerHTML
      if (!this.content) { return }
      this.$emit('comment', this.content)
      this.show = false
      this.isWriting = false
      this.content = ''
      this.$refs.content.innerHTML = ''
    },
    doCollect () {
    },
    doShare () {
    }
  },
  mounted () {
    // 先得到selection，并创建一个range
    this.selection = document.getSelection()
    this.range = document.createRange()
  }
}
</script>

<style lang="stylus" scoped>
div.footer-hide
  top auto
.footer
  position fixed
  top 0
  // top calc(100% - 1rem)
  bottom 0
  left 0
  width 100%
  .main-position
    height .8rem
    line-height .8rem
    position absolute
    bottom 0
    left 0
    width 100%
    .main
      display flex
      border-top 1px solid #eee
      // height 100%
      position absolute
      width 100%
      bottom 0
      background #fff
      align-items flex-end
      .emoji-package
        border-top 1px solid #ddd
        position absolute
        right 0
        bottom 100%
        background #ffffff
        width 100vw
        height 2.4rem
        overflow-x scroll
        user-select none
        >div
          height 100%
          display grid
          grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr
          justify-items center
          align-items center
      div.writing
        width 100%
        max-height none
      .left
        display flex
        width 0
        max-height .8rem
        background #fafafa
        overflow hidden
        position relative
        align-items flex-end
        .emoji
          float right
          width 1rem
          text-align center
          line-height 30px
          .iconfont
            font-size .5rem
        .send
          width 1rem
          text-align center
          padding-right .2rem
          font-size .32rem
          color #666
        .content
          flex 1
          align-self stretch
          background #fff
          width 100%
          min-height 100%
          max-height 5em
          overflow-x hidden
          overflow-y scroll
          outline none
          padding .1rem .2rem
          box-sizing border-box
          line-height 1.4
          border 1px solid #ddd
          border-radius 3px
          word-break break-all
          >img
            width 1.4em
      .center
        height 100%
        padding .1rem .2rem .1rem .3rem
        flex 1
        overflow hidden
        box-sizing border-box
        .sketch
          color #f33
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
        width 1.8rem
        display flex
        height 100%
        position relative
        text-align center
        >div
          width .8rem
          .iconfont
            font-size .4rem
</style>
