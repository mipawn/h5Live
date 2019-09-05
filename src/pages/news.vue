<template>
  <div>
    <header>
      <div class="title">{{content.title}}</div>
    </header>
    <section>
      <div class="content" v-html="content.content" id="news-content">
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: 0,
      content: ''
    }
  },
  methods: {
    setTitle () {
      document.title = this.content.title
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        const hack = document.createElement('iframe')
        hack.style.display = 'none'
        hack.src = './index.html'
        document.body.appendChild(hack)
        setTimeout(() => {
          document.body.removeChild(hack)
        },300)
      }
    },
    getContent () {
      this.$http({
        url: '/media/news?terminal=web&channel_id=6&data_id=' + this.id
      }).then(res => {
        if (res.data.redirect_url) {
          window.location.href = res.data.redirect_url
          return
        }
        this.content = res.data
        this.setTitle()
      })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getContent()
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding: 0.4rem;
  background: #ffffff;
  line-height: 1.5;
  font-size: 0.32rem;
  font-weight: bold;
  text-align: center;
}
.content {
  padding: 0 0.3rem;
  background: #ffffff;
}

</style>
<style>
#news-content p {
  line-height: 2!important;
}
#news-content img {
  max-width: 100%;
}
</style>
