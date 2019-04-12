<template>
  <div class="footer" >
    <div class="main-position">
      <div class="main">
        <div class="center">
          <!-- <input type="text" class="" placeholder="发表评论" v-model="content"> -->
          <div class="input" contenteditable ref="input" placeholder="发表评论"></div>
        </div>
        <div class="emoji-package" v-show="showEmoji">
          <div class="qq_face">
            <a v-for="(item, index) in emojiList" :key="index" :class="item.className" @click="addImage(index, item.title)" ></a>
          </div>
        </div>
        <div class="right">
          <div class="share" @click="doShare" v-if="uid !== -1000">
            <i class="iconfont icon-share"></i>
          </div>
          <div class="emoji" @click="showPackage">
            <i class="iconfont icon-laugh" style="font-size: 0.45rem"></i>
          </div>
          <div class="send" @click="sendComment">发送</div>
        </div>
      </div>
      <div class="ad-footer" wx:if="adFooter">
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wisexs.xstv&amp;channel=0002160650432d595942&amp;fromcase=60001">
            <img src="http://app.xianghunet.com/static/330109/share.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import emojiTitle from '../../assets/js/emoji.js'
export default {
  name: 'footerbar',
  data () {
    return {
      content: '', // 评论内容
      showEmoji: false, // 是否显示选择表情
      emojiList:[], // emoji表情库
      userInfo: '', // 用户信息
      id: '' ,
      uid: -1000,
      adFooter: false // 底部广告
    }
  },
  props: {
    details: {
      type: Object,
      required: true
    },
  },
  methods: {
    sendComment () { //发送评论
      let content = this.$refs.input.innerHTML
      if (content === '') {
          this.$message({
              message: '请输入内容',
              type: 'warning',
              center: true
          })
      return
      }
      if (window.SZJSBridge) {
        if(window.PalauAPI.user.userInfo().uid) {
          this.$axios({
          url: this.baseUrl + 'v1/live/comment_add',
          data: this.$qs.stringify({
            live_id: this.id,
            uid: this.userInfo.uid,
            pid: 0,
            content: content,
            nickname: this.userInfo.nickName,
            tel: this.userInfo.phoneNumber
          }),
          method: 'post'
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: '评论成功',
              type: 'success',
              center: true
            })
            this.$refs.input.innerText = ''
            this.showEmoji = false
            this.$emit('changeCommentList') // 重新读取评论列表
          } else {
            this.$message({
              message: '评论失败',
              type: 'error',
              center: true
            })
          }
        })
        } else {
          window.PalauAPI.user.login(() => {
              setTimeout(() => {
                this.uid = window.PalauAPI.user.userInfo().uid
            }, 100);
          })
        }
      } else {
        this.$message({
          message: '请前往app登录评论',
          type: 'warning',
          center: true
        })
      }
    },
    doShare () { // 分享
      if (window.SZJSBridge) {
        window.PalauAPI.share('all',this.details.title.toString(),this.details.introduce,window.location.href,this.details.img_src, res => {
          if (res == 0) {
            this.$message({
              message: '分享失败',
              type: 'warning',
              center: true
            })
          } else if (res == 1) {
            this.message({
              message: '分享成功',
              type: 'success',
              center: true
            })
          }
        })
      } else {
        this.$message({
          message: '请前往app分享',
          type: 'warning',
          center: true
        })
      }
    },
    showPackage () { // 显示emoji表情开关
      this.showEmoji = !this.showEmoji
    },
    closePackage () {
      this.showEmoji = false
    },
    addImage (index, title) { // 添加图片 
      this.$refs.input.innerHTML += this.emojiList[index].title
    },
    setEmojiList () { // 设置表情库
      for (let i = 0; i < 105; i++) {
        let className = 'qqface' + i
        this.emojiList.push({'className': className, 'title': emojiTitle[i].zh_CN})
      }
    },
    getUserInfo() { // 获取用户信息
      if (window.SZJSBridge) {
          this.userInfo = window.PalauAPI.user.userInfo()
          this.uid = window.PalauAPI.user.userInfo().uid || -1000
          this.$nextTick(() => {
              this.adFooter = false
          })
      } else {
          this.uid = -1000
          this.$nextTick(() => {
              this.adFooter = true
          })
      }
    },
  },
  mounted () {
    this.setEmojiList()
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
div.footer-hide
  top auto
.footer
  position fixed
  bottom 0
  left 0
  width 100%
  .ad-footer
    position absolute
    left 0
    right 0
    bottom 0
    z-index 999999
    font-size 100%
    img 
      width 100%
  .main-position
    height .8rem
    position absolute
    bottom 0
    left 0
    width 100%
    .main
      display flex
      border-top 1px solid #eee
      position absolute
      width 100%
      bottom 0
      background #fff
      align-items center
      .emoji-package
        border-top 1px solid #ddd
        position absolute
        bottom 100%
        background #ffffff
        height 2.4rem
        overflow-y auto
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
            font-size .7rem
        .send
          width 1rem
          text-align center
          padding-right .2rem
          font-size .32rem
          color #666
      .center
        height 100%
        padding .1rem .2rem .1rem .3rem
        flex 1
        overflow hidden
        box-sizing border-box
        .sketch
          color #f33
        .input
          background #eee
          color #999
          width 100%
          max-height 0.7rem
          min-height 0.6rem
          border-radius .1rem
          line-height .46rem
          padding 0 .2rem
          box-sizing border-box
          outline none
          overflow hidden
          user-select:text;
          -webkit-user-select:text;
          font-size 0.3rem;
        .input:empty::before 
            color light
            content attr(placeholder)
            line-height 0.6rem
      .right
        display flex
        position relative
        align-items center
        padding: 0.1rem 0.2rem 0.1rem 0;
        div
          padding-left 0.1rem
          padding-right 0.1rem
          font-size .34rem
</style>
<style scoped>
.qq_face {
    display: flex;
    flex-wrap: wrap;
}
.qq_face a {
    background:url("../../assets/imgs/WechatIMG2112.jpeg") no-repeat;
    background-size: 434px 202px;
}
.qq_face a {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    font-size: 0;
    /* border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0; */
    cursor: pointer;
}
.qq_face .qqface0 {
    background-position: 0 0
}
.qq_face .qqface1 {
    background-position: -29px 0
}
.qq_face .qqface2 {
    background-position: -58px 0
}

.qq_face .qqface3 {
    background-position: -87px 0
}

.qq_face .qqface4 {
    background-position: -116px 0
}

.qq_face .qqface5 {
    background-position: -145px 0
}

.qq_face .qqface6 {
    background-position: -174px 0
}

.qq_face .qqface7 {
    background-position: -203px 0
}

.qq_face .qqface8 {
    background-position: -232px 0
}

.qq_face .qqface9 {
    background-position: -261px 0
}

.qq_face .qqface10 {
    background-position: -290px 0
}

.qq_face .qqface11 {
    background-position: -319px 0
}

.qq_face .qqface12 {
    background-position: -348px 0
}

.qq_face .qqface13 {
    background-position: -377px 0
}

.qq_face .qqface14 {
    background-position: -406px 0
}

.qq_face .qqface15 {
    background-position: 0 -29px
}

.qq_face .qqface16 {
    background-position: -29px -29px
}

.qq_face .qqface17 {
    background-position: -58px -29px
}

.qq_face .qqface18 {
    background-position: -87px -29px
}

.qq_face .qqface19 {
    background-position: -116px -29px
}

.qq_face .qqface20 {
    background-position: -145px -29px
}

.qq_face .qqface21 {
    background-position: -174px -29px
    
}

.qq_face .qqface22 {
    background-position: -203px -29px
}

.qq_face .qqface23 {
    background-position: -232px -29px
}

.qq_face .qqface24 {
    background-position: -261px -29px
}

.qq_face .qqface25 {
    background-position: -290px -29px
}

.qq_face .qqface26 {
    background-position: -319px -29px
}

.qq_face .qqface27 {
    background-position: -348px -29px
}

.qq_face .qqface28 {
    background-position: -377px -29px
}

.qq_face .qqface29 {
    background-position: -406px -29px
}

.qq_face .qqface30 {
    background-position: 0 -58px
}

.qq_face .qqface31 {
    background-position: -29px -58px
}

.qq_face .qqface32 {
    background-position: -58px -58px
}

.qq_face .qqface33 {
    background-position: -87px -58px
}

.qq_face .qqface34 {
    background-position: -116px -58px
}

.qq_face .qqface35 {
    background-position: -145px -58px
}

.qq_face .qqface36 {
    background-position: -174px -58px
}

.qq_face .qqface37 {
    background-position: -203px -58px
}

.qq_face .qqface38 {
    background-position: -232px -58px
}

.qq_face .qqface39 {
    background-position: -261px -58px
}

.qq_face .qqface40 {
    background-position: -290px -58px
}

.qq_face .qqface41 {
    background-position: -319px -58px
}

.qq_face .qqface42 {
    background-position: -348px -58px
}

.qq_face .qqface43 {
    background-position: -377px -58px
}

.qq_face .qqface44 {
    background-position: -406px -58px
}

.qq_face .qqface45 {
    background-position: 0 -87px
}

.qq_face .qqface46 {
    background-position: -29px -87px
}

.qq_face .qqface47 {
    background-position: -58px -87px
}

.qq_face .qqface48 {
    background-position: -87px -87px
}

.qq_face .qqface49 {
    background-position: -116px -87px
}

.qq_face .qqface50 {
    background-position: -145px -87px
}

.qq_face .qqface51 {
    background-position: -174px -87px
}

.qq_face .qqface52 {
    background-position: -203px -87px
}

.qq_face .qqface53 {
    background-position: -232px -87px
}

.qq_face .qqface54 {
    background-position: -261px -87px
}

.qq_face .qqface55 {
    background-position: -290px -87px
}

.qq_face .qqface56 {
    background-position: -319px -87px
}

.qq_face .qqface57 {
    background-position: -348px -87px
}

.qq_face .qqface58 {
    background-position: -377px -87px
}

.qq_face .qqface59 {
    background-position: -406px -87px
}

.qq_face .qqface60 {
    background-position: 0 -116px
}

.qq_face .qqface61 {
    background-position: -29px -116px
}

.qq_face .qqface62 {
    background-position: -58px -116px
}

.qq_face .qqface63 {
    background-position: -87px -116px
}

.qq_face .qqface64 {
    background-position: -116px -116px
}

.qq_face .qqface65 {
    background-position: -145px -116px
}

.qq_face .qqface66 {
    background-position: -174px -116px
}

.qq_face .qqface67 {
    background-position: -203px -116px
}

.qq_face .qqface68 {
    background-position: -232px -116px
}

.qq_face .qqface69 {
    background-position: -261px -116px
}

.qq_face .qqface70 {
    background-position: -290px -116px
}

.qq_face .qqface71 {
    background-position: -319px -116px
}

.qq_face .qqface72 {
    background-position: -348px -116px
}

.qq_face .qqface73 {
    background-position: -377px -116px
}

.qq_face .qqface74 {
    background-position: -406px -116px
}

.qq_face .qqface75 {
    background-position: 0 -145px
}

.qq_face .qqface76 {
    background-position: -29px -145px
}

.qq_face .qqface77 {
    background-position: -58px -145px
}

.qq_face .qqface78 {
    background-position: -87px -145px
}

.qq_face .qqface79 {
    background-position: -116px -145px
}

.qq_face .qqface80 {
    background-position: -145px -145px
}

.qq_face .qqface81 {
    background-position: -174px -145px
}

.qq_face .qqface82 {
    background-position: -203px -145px
}

.qq_face .qqface83 {
    background-position: -232px -145px
}

.qq_face .qqface84 {
    background-position: -261px -145px
}

.qq_face .qqface85 {
    background-position: -290px -145px
}

.qq_face .qqface86 {
    background-position: -319px -145px
}

.qq_face .qqface87 {
    background-position: -348px -145px
}

.qq_face .qqface88 {
    background-position: -377px -145px
}

.qq_face .qqface89 {
    background-position: -406px -145px
}

.qq_face .qqface90 {
    background-position: 0 -174px
}

.qq_face .qqface91 {
    background-position: -29px -174px
}

.qq_face .qqface92 {
    background-position: -58px -174px
}

.qq_face .qqface93 {
    background-position: -87px -174px
}

.qq_face .qqface94 {
    background-position: -116px -174px
}

.qq_face .qqface95 {
    background-position: -145px -174px
}

.qq_face .qqface96 {
    background-position: -174px -174px
}

.qq_face .qqface97 {
    background-position: -203px -174px
}

.qq_face .qqface98 {
    background-position: -232px -174px
}

.qq_face .qqface99 {
    background-position: -261px -174px
}

.qq_face .qqface100 {
    background-position: -290px -174px
}

.qq_face .qqface101 {
    background-position: -319px -174px
}

.qq_face .qqface102 {
    background-position: -348px -174px
}

.qq_face .qqface103 {
    background-position: -377px -174px
}

.qq_face .qqface104 {
    background-position: -406px -174px
}
</style>
