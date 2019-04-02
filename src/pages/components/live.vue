<template>
  <div class="live">
    <div class="box" v-for="(item, index) in broadcastList" :key="index">
      <header>
        <div class="title">
          <div class="left">
            <img :src="details.man_src" alt="">
            <span>{{details.man_name}}</span>
          </div>
          <div class="right">
            <span>{{item.like_num_count}}</span> 
            <i :class="['iconfont', 'icon-good', item.like_num && item.like_num.length? 'hot': '']" @click="likeUp(index)"></i>
          </div>
        </div>
        <div class="create-time">{{item.create_at}}</div>
      </header>
      <section v-html="item.content" class="text-desc"></section>
      <div class="live-photo" v-if="item.media_type == 1 && item.figure && item.figure.length < 2">
        <img :src="itemChild" alt="" v-for="(itemChild, indexChild) in item.figure" :key="indexChild" @click="showFullScreen(itemChild)">
      </div>
      <div class="live-photo-more" v-else-if="item.media_type == 1 && item.figure &&item.figure.length > 1">
        <img :src="itemChild" alt="" v-for="(itemChild, indexChild) in item.figure" :key="indexChild" @click="showFullScreen(itemChild)">
        <div id="fullScreen-photo"  v-if="fullScreen" @click="showFullScreen">
          <img :src="fullScreenPhoto" alt="">
        </div>
      </div>
      <div v-else-if="item.media_type == 3" class="live-photo">
        <audio :src="item.audio_src" controls="controls"></audio>
      </div>
      <div class="live-photo" v-if="item.media_type == 2">
        <video :src="item.video_src" controls></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'live',
  data () {
    return {
      broadcastList: [],
      id: '',
      type: '',
      details: '',
      uid: -1000,
      fullScreenPhoto: '', //全屏展示的图片
      fullScreen: false, // 全屏展示图片开关

    }
  },
  methods: {
    likeUp (index) { // 点赞
      if (window.SZJSBridge) { // 是否在萧山app
        if(window.PalauAPI.user.userInfo().uid) { // 在萧山app已登陆
          if (this.broadcastList[index].like_num.length) {
            this.broadcastList[index].like_num.length = 0
            this.broadcastList[index].like_num_count = this.broadcastList[index].like_num_count - 1
          } else {
            this.broadcastList[index].like_num.length = 1
            this.broadcastList[index].like_num_count += 1
          }
          this.$axios({
            url: this.baseUrl + 'v1/live/text_like',
            data: this.$qs.stringify({
              uid: this.uid,
              text_id: this.broadcastList[index].id,
              status: 1
            }),
            method: 'post'
          })
        } else { // 在萧山app未登录
          window.PalauAPI.user.login(res => {
            setTimeout(() => {
                this.uid = window.PalauAPI.user.userInfo().uid
                this.getBroadcast()
            }, 100);
          })
        }
      } else { // 在微信
        this.$message({
          message: '请前往APP登录后点赞',
          type: 'warning',
          center: true
        })
        return
      }
    },
    getBroadcast () { // 获取图文直播的列表 1图文 2视频 3音频
      this.$axios({
        url: this.baseUrl+'v1/live/text_lists',
        data: this.$qs.stringify({
          id: this.id,
          uid: this.uid
        }),
        method: 'post'
      }).then(res => {
        if (res.data.code == 200) {
          let broadcastList = res.data.data
          broadcastList.map((item, index) => { // 图文直播最多6张图片
            if (item.figure && item.figure.length > 6) {
              item.figure.length = 6
            }
            return item
          })
          this.broadcastList = broadcastList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getType () { // 获取直播的类型 1图文 2视频
      let {type, id} = this.$route.query
      this.type = type
      this.id = id
    },
    getDetails () { // 获取详情
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
      }).catch(err => {
        console.log(err)
      })
    },
    getUserInfo() { // 获取用户信息
      if (window.SZJSBridge) {
        this.uid = window.PalauAPI.user.userInfo().uid || -1000
      }
    },
    showFullScreen (image) { // 全屏展示图文
      this.fullScreenPhoto = image
      this.fullScreen = !this.fullScreen
    }
  },
  mounted () {
    this.getUserInfo() 
    this.getType()
    this.getBroadcast()
    this.getDetails()
  },
  
}
</script>

<style lang="stylus" scoped>
.live
  line-height 1.5
  overflow-y
  header
    margin-bottom .2rem
    .title
      display flex
      justify-content space-between
      .left
        font-size .4rem
        color #3bf
        display flex
        img 
          width 0.8rem
          height 0.8rem
          border-radius 50%
          border none
        span 
          margin-left 0.3rem
      .right
        color #aaa
        font-size .32rem
    .create-time
      color #bbb
      font-size .28rem
      padding-left 1.1rem
.hot
  color red
.live-photo
  height 3rem
  margin-top 0.2rem
  padding-left 1.1rem
  img 
    width 100%
    height 100%
  video 
    width 100%
    height 100%
  audio 
    width 100%
    
.box
  padding .4rem
  border-bottom 2px solid #ccc
.live-photo-more
  height 3rem
  margin-top 0.2rem
  display flex 
  padding-left 1.1rem
  flex-wrap wrap
  img 
    width 31%
    height 40%
    margin-right 0.1rem
.text-desc
  text-overflow ellipsis
  overflow hidden
  padding-left 1.1rem
</style>
<style scoped>
.audio {
    width: 1.1rem;
    height: 1.1rem;
    position: relative;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 50%;
}
.wifi-symbol {
    width: 1rem;
    height: 1rem;
    box-sizing: border-box;
    overflow: hidden;
    transform: rotate(135deg);
    margin-left: 0.3rem;
}
.wifi-circle {
    border: 0.1rem solid #999999;
    border-radius: 50%;
    position: absolute;
}
.first {
    width: 0.1rem;
    height: 0.1rem;
    background: #cccccc;
    top: 0.9rem;
    left: 0.9rem;
}
.wifi-run>.second {
    width: 0.5rem;
    height: 0.5rem;
    top: 0.7rem;
    left: 0.7rem;
    animation: fadeInOut 1s infinite 0.2s;
}
.second {
    width: 0.5rem;
    height: 0.5rem;
    top: 0.7rem;
    left: 0.7rem;
}
.wifi-run>.third {
    width: 0.7rem;
    height: 0.7rem;
    top: 0.5rem;
    left: 0.5rem;
    animation: fadeInOut 1s infinite 0.4s;
}
.third {
    width: 0.7rem;
    height: 0.7rem;
    top: 0.5rem;
    left: 0.5rem;
}
@keyframes fadeInOut {
    0% {
        opacity: 0; /*初始状态 透明度为0*/
    }
    100% {
        opacity: 1; /*结尾状态 透明度为1*/
    }
}
#fullScreen-photo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.3);
}
#fullScreen-photo >img {
  width: auto;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

