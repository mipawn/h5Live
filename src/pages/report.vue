<template>
  <div class="wrap" ref="wrap" @scroll="onScroll">
    <div class="container">
      <div class="item" @click="goDetails">
        <img src="../../static/img/youngth-more.png" alt="">
        <span>钱塘新区2019年度职工技能培训</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [],
      wrapHeight: 0,
      page: 0,
      id: 0
    }
  },
  methods: {
    setTitle (name) {
      document.title = name
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        const hack = document.createElement('iframe')
        hack.style.display = 'none'
        hack.src = '/index.html? r =' + Math.random()
        document.body.appendChild(hack)
        setTimeout(() => {
          document.body.removeChild(hack)
        },300)
      }
    },
    goDetails (id) {
      this.$toast({
        message: '课程报名于9月2日13:00开始，敬请期待',
        mask: true
      })
    },
    getInfo () {
      return Promise.resolve(this.$route.query)
    },
    getList (id) {
      if (id) this.id = id
      let page = this.page + 1
      this.$http({
        url: `/media/latest?size=10&page=${page}&channel_id=6&category_id=${id || this.id}`,
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
    }
  },
  mounted () {
    this.getInfo().then((res) => {
      this.setTitle(res.name)
      // this.getList(res.categoryid)
    })
  }
}
</script>

<style scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
}
.container {
  background: #f5f5f5;
  padding: 0.26rem;

}
.item {
  height:1.96rem;
  background:#ffffff;
  box-shadow:0 0 0.16rem 0 rgba(98,98,98,0.2);
  display: flex;
  align-items: center;
  padding: 0 0.48rem 0 0.44rem;
  margin-top: 0.26rem;
}
.item:nth-of-type(1) {
  margin: 0;
}
.item img {
  width: 1.29rem;
  height: 1.29rem;
  /* border: 1px solid #e5e5e5; */
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
.item span {
  margin-left: 0.55rem;
  font-size: 0.3rem;
  font-family: 'MicrosoftYaHei';
  font-weight: 400;
  color: #000000;
  line-height: 0.4rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>
