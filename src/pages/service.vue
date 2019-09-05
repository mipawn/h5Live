
<template>
  <div class="container">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" style="height:4.3rem;">
      <!-- slides -->
      <swiper-slide><img src="../assets/imgs/banner1.jpg" alt="" style="width:100%;height100%"></swiper-slide>
      <!-- <swiper-slide><img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" alt=""></swiper-slide> -->
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div class="list">
      <div class="item" @click="goHall">
        <img src="../assets/imgs/service1.jpeg" alt="服务大厅">
        <span>服务大厅</span>
      </div>
      <div class="item" @click="goClassroom">
        <img src="../assets/imgs/service2.png" alt="微课堂">
        <span>微课堂</span>
      </div>
      <div class="item" @click="goShop">
        <img src="../assets/imgs/shop.jpeg" alt="微课堂">
        <span>群团购</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // loop: true,
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'bulletActive'
        }
      }
    }
  },
  methods: {
    setTitle () {
      document.title = '普惠服务'
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
    goClassroom () {
      this.$router.push({name: 'classroom'})
    },
    callback (e) {
      // console.log(e)
    },
    goHall() {
      this.$router.push({name: 'hall'})
    },
    goShop () {
      this.$router.push({name: 'shop'})
      // this.$toast({
      //   message: '正在开发中...',
      //   mask: true
      // })
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
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
  /* padding: 0 0.26rem; */
}
.swiper-pagination {
  display: flex;
  justify-content: flex-end;
}
.list {
  padding: 0.18rem 0.17rem;
}
.item {
  background: #ffffff;
  height: 2.94rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}
.item:nth-of-type(1) {
  margin: 0;
}
.item img {
  width: 4.72rem;
  height: 100%;
}
.item span {
  width: 2.44rem;
  font-weight: bold;
}
.container >>> .swiper-pagination-bullet {
   background: #ffffff;
   opacity: 1;
}
.container >>> .bulletActive {
  background: #009DFF;
  opacity: 1;
}
</style>
