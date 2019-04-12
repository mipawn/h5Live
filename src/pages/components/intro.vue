<template>
  <div class="introduce">
    <div class="paragraph" v-html="details.introduce"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: '',
      id: ''
    }
  },
  methods: {
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
    }
  },
  mounted () {
    this.id = this.$route.query.id
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
                var news_image = this.details.img_src
                var news_intro = "活动直播"
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
  .introduce {
    padding: 0.4rem;
    line-height: 1.5;
  }
  .paragraph{
    margin-top: 0.3rem;
    word-wrap: break-word;
  }
  .paragraph:nth-of-type(1) {
    margin: 0;
  }
</style>
