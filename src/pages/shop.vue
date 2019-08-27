<template>
  <div id="shop">
    <span class="tips">正在开发中...</span>
    <!-- <div class="container">
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" style="height:4.3rem;"> -->
        <!-- slides -->
        <!-- <swiper-slide><img src="../assets/imgs/banner1.jpg" alt="" style="width:100%;height100%"></swiper-slide> -->
        <!-- <swiper-slide><img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" alt=""></swiper-slide> -->
        <!-- Optional controls -->
        <!-- <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div class="list">
        <div class="item">
          <img src="../assets/imgs/banner1.jpg" alt="">
          <div class="item-title">颠三倒四的是但是但是大是大大是大是</div>
          <div class="item-info">
            <van-icon name="location-o" color="#ff002f" size="0.36rem" />
            <span>2019年的大大奥迪啊</span>
          </div>
          <div class="item-info">
            <van-icon name="clock-o" color="#ff002f" size="0.32rem" />
            <span>2019年的大大奥迪啊</span>
          </div>
        </div>
        <div class="item">
          <img src="../assets/imgs/banner1.jpg" alt="">
          <div class="item-title">颠三倒四的是但是但是大是大大是大是</div>
          <div class="item-info">
            <van-icon name="location-o" color="#ff002f" size="0.36rem" />
            <span>2019年的大大奥迪啊</span>
          </div>
          <div class="item-info">
            <van-icon name="clock-o" color="#ff002f" size="0.32rem" />
            <span>2019年的大大奥迪啊</span>
          </div>
        </div>
      </div>
    </div> -->
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
        hack.src = '/index.html? r =' + Math.random()
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
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.tips {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  background: #f5f5f5;
  padding-top: 4.4rem;
}
.swiper-pagination {
  display: flex;
  justify-content: flex-end;
}
.list {
  padding: 0.18rem 0.17rem 1rem;
}
.item {
  background: #ffffff;
  margin-top: 0.3rem;
  text-align: left;
  font-weight: bold;
  padding-bottom: 0.2rem;
  box-shadow:  0 2px 30px 0 rgba(0,0,0,.15);
}
.item:nth-of-type(1) {
  margin: 0;
}
.item img {
  width: 100%;
  height: 3.4rem;
}
.item-title {
  padding: 0.5em 1em;
  font-size: 0.32rem;
  font-weight: bold;
}
.item-info {
  padding: 0.3em 1em;
  display: flex;
  align-items: center;
}
.item-info span {
  margin-left: 0.1rem;
}
.container >>> .swiper-pagination-bullet {
   background: #ffffff;
   opacity: 1;
}
.container >>> .bulletActive {
  background: #009DFF;
  opacity: 1;
}
.swiper-container {
  position: fixed;
  top: 0;
}
</style>
