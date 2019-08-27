<template>
  <div class="container">
    <div class="item" @click="goHome">
      <img src="../assets/imgs/class1.jpg" alt="">
      <div>工匠学堂</div>
    </div>
    <div class="item" @click="goBookList">
      <img src="../assets/imgs/class2.jpg" alt="">
      <div>荐书时光</div>
    </div>
    <div class="item" @click="goEbook">
      <img src="../assets/imgs/class3.jpg" alt="">
      <div>电子书屋</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: 0,
      id: 0
    }
  },
  methods: {
    setTitle () {
      document.title = '微课堂'
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
    goHome () {
      this.$router.push({name: 'home'})
    },
    goBookList () {
      // this.$router.push({name: 'bookList'})
      this.$toast({
        message: '正在开发中...',
        mask: true
      })
    },
    goEbook () {
      window.location.href = 'http://bookstore.gh.chaoxing.com/wechat/home/list.shtml?unitId=10'
    }
  },
  mounted () {
    this.setTitle()
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
  background: #000;
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
</style>
