<template>
  <div class="container" v-if="broadCast">
    <div class="video">
      <div id="player"></div>
    </div>
    <div class="title">{{title}}</div>
  </div>
  <div class="container" ref="wrap" v-else>
    <div class="item" @click="goDetails(item.redirect_url)" v-for="(item, index) in list" :key="index">
      <img :src="'http://o.cztvcloud.com/'+item.thumb" alt="">
      <div>{{item.title}}</div>
    </div>
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      list: [],
      page: 0,
      id: 13643,
      broadCast: false,
      source: '',
      title: ''
    }
  },
  methods: {
    setTitle (title="视听荟萃") {
      document.title = title
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
    goDetails (url) {
      let id = url.slice(url.indexOf('=') + 1)
      this.$router.push({name: 'live', query:{'id': id}})
    },
    getList () { // 获取视频列表
      let page = this.page + 1
      this.$http({
        url: `/media/latest?size=10&page=${page}&channel_id=6&category_id=${this.id}`,
        method: 'get'
      }).then(res => {
        this.list = [...this.list, ...res.data.list]
        if (res.data.list.length) this.page = res.data.page
        this.wrapHeight = this.$refs.wrap.offsetHeight
      })
    },
    onScroll () {
      let scrollTop = this.$refs.wrap.scrollTop, scrollHeight = this.$refs.wrap.scrollHeight
      if (scrollHeight - scrollTop - this.wrapHeight === 0) {
        this.getList()
      }
    },
    getBroadCast() { // 获取直播资源
      this.$http({
        url: `/media/latest?size=10&page=1&channel_id=6&category_id=13842`
      }).then(res => {
        let url = res.data.list[0]
        // console.log(url)
        if (url.redirect_url) {
          let id = url.redirect_url.slice(url.redirect_url.indexOf('=') + 1)
          this.$router.replace({name: 'live', query:{'id': id}})
        } else {
          this.getList()
        }
      })
    },
  },
  mounted () {
    this.setTitle()
    this.getBroadCast()

  }
}
</script>

<style scoped>
.container {
  background: #f5f5f5;
  padding: 0.26rem;
}
.item {
  height: 5.12rem;
  background:#ffffff;
  box-shadow:0 0 0.16rem 0 rgba(98,98,98,0.2);
  margin-top: 0.26rem;
}
.item:nth-of-type(1) {
  margin: 0;
}
.item img {
  width: 100%;
  height: 4.2rem;
  /* border: 1px solid #e5e5e5; */
  /* border-radius: 50%; */
  overflow: hidden;
  flex-shrink: 0;
}
.item div {
  height: 0.92rem;
  font-size: 0.24rem;
  font-family: 'MicrosoftYaHei';
  font-weight: 400;
  color: #000000;
  line-height: 0.92rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 0.26rem;
}
.title {
  line-height: 1.2;
  font-size: 0.34rem;
  text-align: center;
  padding: 0.3rem 0.2rem;
  overflow: hidden;
}
.video {
  width: 100%;
  height: 4.3rem;
  margin-top: 0.4rem;
}
</style>
