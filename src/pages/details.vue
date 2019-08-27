<template>
  <div class="container">
    <div class="title"></div>
    <video src="" class="video" controls></video>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  methods: {
    setTitle () {
      document.title = '职工本色'
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        const hack = document.createElement('iframe')
        hack.style.display = 'none'
        hack.src = '/index.html? r =' + Math.random()
        document.body.appendChild(hack)
        setTimeout(() => {
          document.body.removeChild(hack)
        },300)
      }
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
.title {
  line-height: 1.2;
  font-size: 0.34rem;
}
.video {
  width: 100%;
  height: 4.3rem;
  margin-top: 0.4rem;
}
</style>
