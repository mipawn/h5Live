<template>
  <div class="chat">
    <ul class="chat-list">
      <li v-for="(item, index) in commentList" :key="index">
        <header>
          <div class="title">
            <div class="left">{{item.nickname}}</div>
            <div class="right">
              <span>{{item.like_num_count}}</span>
              <i :class="['iconfont', 'icon-good', item.like_num && item.like_num.length? 'hot': '']" @click="likeUp(index)"></i>
            </div>
          </div>
          <div class="create-time">{{item.create_at}}<a></a></div>
        </header>
        <div class="qq_face" v-html="item.content"></div>
        <div class="reply" v-if="item.sub" v-for="(itemChild, index) in item.sub" :key="index"><span style="color:#407d40;">{{itemChild.nickname}}</span>：{{itemChild.content}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import emojiTitle from '../../assets/js/emoji.js'
import emoji from '../../assets/js/emoji.js';
export default {
  name: 'chat',
  data() {
    return {
      id: '',
      commentList: [], // 评论列表
      uid: -1000,
      emojiList: [], // 表情库
      details: ''// 详情
    }
  },
  methods: {
    getComment () { // 获取评论列表
      this.$axios({
        url: this.baseUrl + 'v1/live/comment',
        data: this.$qs.stringify({
          id: this.id,
          uid: this.uid
        }),
        method: 'post'
      }).then(res => {
        if (res.data.code == 200) {
          let commentList = res.data.data
          for (let item in commentList) {
            commentList[item].content = this.handleEmoji(commentList[item].content)
            let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'}
            commentList[item].content = commentList[item].content.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
              return arrEntities[t]
            })
          }
          this.commentList = commentList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    likeUp (index) { // 点赞
      if (window.SZJSBridge) { // 是否在萧山app
        if (window.PalauAPI.user.userInfo().uid) { // 在萧山app已登陆
          if (this.commentList[index].like_num.length) {
            this.commentList[index].like_num.length = 0
            this.commentList[index].like_num_count = this.commentList[index].like_num_count - 1
          } else {
            this.commentList[index].like_num.length = 1
            this.commentList[index].like_num_count += 1
          }
          this.$axios({
            url: this.baseUrl + 'v1/live/comment_like',
            data: this.$qs.stringify({
              uid: this.uid,
              comment_id: this.commentList[index].id,
              status: 1
            }),
            method: 'post'
          })
        } else { // 在智慧萧山app未登录
          window.PalauAPI.user.login(() => {
            setTimeout(() => {
              this.uid = window.PalauAPI.user.userInfo().uid
              this.getComment()
            }, 100)
          })
        }
      } else { // 在微信
        this.$message({
          message: '请前往APP登录后点赞',
          type: 'warning',
          center: true
        })
      }
    },
    handleEmoji (content) { // 将【困】转变为对应的 类名 qqface
      if (content.indexOf('[') !== -1 && content.indexOf(']' !== -1)) { // 判断是否含有表情格式 【】
        let emoji = content.split(']') // 以  】 划分为数组
        if(emoji[emoji.length-1] == ']' || emoji[emoji.length-1] == ''){emoji.pop()} // 删除多余的 】 和 空格
        emoji = emoji.map(val => { 
          if (val.indexOf('[') !== -1) { // 判断是含有表情还是纯文字
            val = val + ']'
            let start = val.indexOf('[')
            let emojis = val.substring(start) // 表情
            this.emojiList.forEach(value => {
              if (value.title === emojis) {
                emojis = value.className // 将【大小】格式变为 对应类名 qqface10
              }
            })
            return val= val.substring(0,start) + "<a class='" + emojis + "'></a>"
          } else { // 文字直接返回
            return val
          }
        })
        return emoji.join('') // 变回字符串格式
      } else {
        return content // 返回
      }
    },
    setEmojiList () { // 设置表情库
      for (let i = 0; i < 105; i++) {
        let className = 'qqface' + i
        this.emojiList.push({'className': className, 'title': emojiTitle[i].zh_CN})
      }
    },
    getDetails () {
      this.$axios({
        url: this.baseUrl+'v1/live/details',
        params: {
          id: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.details = res.data.data
        }
      })
    },
    HTMLDecode (html) { // 转义
      var temp = document.createElement("div")
      temp.innerHTML = html
      var output = temp.innerText || temp.textContent
      temp = null
      return output
    }
  },
  mounted () {
    this.id = this.$route.query.id
    if (window.SZJSBridge) {
      this.uid = window.PalauAPI.user.userInfo().uid || -1000
    }
    this.getComment()
    this.getDetails()
    this.setEmojiList()
    this.$axios({
          url: 'http://h5.xianghunet.com/wx/wx_Signature.php',
          data: this.$qs.stringify({
            href: window.location.href
          }),
          method: 'post'
        }).then(res => {
            res.data.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline']
            wx.config(res.data)
            wx.ready(() => {
                var news_title = document.title
                var news_link = location.href
                var news_image = this.details.img_src || 'http://h5.xianghunet.com/live/static/img/logo.jpg'
                var news_intro = this.HTMLDecode(this.details.introduce)
                wx.onMenuShareAppMessage({
                title: news_title,
                desc: news_intro,
                link: news_link,
                imgUrl: news_image,
                success () {
                  this.$message({
                    message: '分享成功',
                    type: 'success',
                    center: true
                  })
                },
                fail () {
                    this.$message({
                        message: '分享失败',
                        type: 'warning',
                        center: true
                    })
                }
                })
                wx.onMenuShareTimeline({
                    title: news_title,
                    link: news_link,
                    imgUrl: news_image,
                    success () {
                    this.$message({
                        message: '分享成功',
                        type: 'success',
                        center: true
                    })
                    },
                    fail () {
                        this.$message({
                            message: '分享失败',
                            type: 'warning',
                            center: true
                        })
                    }
                })
            })  
        })
  }
}
</script>

<style lang="stylus" scoped>
.chat
  line-height 1.5
  overflow-y auto
  .chat-list
    padding .2rem 0
    margin-bottom 1rem
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
        .create-time
          color #bbb
          font-size .24rem
.hot
  color red
</style>
<style scoped>
.qq_face {
  width: 100%;
  overflow: hidden;
  white-space:normal;
  word-break:break-all;
  word-wrap:break-word; 
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.qq_face a {
    background:url("../../assets/imgs/WechatIMG2112.jpeg") no-repeat;
    background-size: 434px 202px;
}
.qq_face a {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 0;
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
.reply {
  width: 100%;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  white-space:normal;
  word-break:break-all;
  word-wrap:break-word; 
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: #eee;
  position: relative;
  padding: 0.1rem;
  box-sizing: border-box;
  border-radius: 6px;
}
.reply::after{
    content: '';
    width: 0;
    height: 0;
    border-width: 0px 8px 10px 8px;
    border-color: #eee transparent;
    border-style: solid;
    position: absolute;
    left: 10px;
    top: -8px;
}   
</style>
