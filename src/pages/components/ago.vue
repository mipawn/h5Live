<template>
  <div class="ago">
    <div class="item-box" v-for="(item, index) in list" :key="index" @click="toDetail(item.id, item.type)">
      <div class="item-photo">
        <img :src="item.list_img" alt="">
      </div>
      <div class="item-desc">
        <div class="item-title">{{item.title}}</div>
        <div class="item-info">
          <div class="item-time">{{item.start_time}}</div>
          <div class="item-num">{{item.live_click.click_num}}人次</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      list: '', // 列表
      details: ''// 详情
    }
  },
  methods: {
    getList () { // 获取列表
      this.$axios({
          url: this.baseUrl+'v1/live/lists',
          data: '',
          method: 'get'
      }).then(res =>{
          if (res.data.code == 200) {
              this.list = res.data.data
          }
      }).catch(err => {
          console.log(err)
      })
    },
    toDetail (id) { // 查看详情
      this.$router.push({path: '/home/intro', query:{id:id}})
      // this.$emit('goLive',this.$route.query)
      window.location.reload()
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
    HTMLDecode(html) { // 转义
      var temp = document.createElement("div")
      temp.innerHTML = html
      var output = temp.innerText || temp.textContent
      temp = null
      return output
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getList()
    this.getDetails()
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

<style>
  .ago {
    padding: 0.4rem;
  }
  .item-box {
    box-shadow: 0 0 10px #ccc;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-top: 0.2rem;
  }
  .item-box:nth-of-type(1) {
    margin: 0;
  }
  .item-photo {
    max-width: 3.2rem;
    height: 1.7rem;
    min-width: 3rem;
  }
  .item-photo>img {
    width: 100%;
    height: 100%;
  }
  .item-desc {
    display: flex;
    height: 1.7rem;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 0.5rem;
  }
  .item-title {
    font-size: 0.32rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: break-word;
    line-height: 1.2;
  }
  .item-time {
    font-size: 0.2rem;
    color: #9c9b9b;
  }
  .item-num {
    font-size: 0.2rem;
    margin-top: 0.1rem;
    color: #9c9b9b;
  }
</style>
