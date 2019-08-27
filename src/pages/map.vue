<template>
  <div>
    <!-- <div class="select">
      <div class="title" @click="show"><span>{{area | placeHolder}}</span><span :class="selectItem ? 'normal' : 'active'"></span></div>
      <div class="options" v-if="selectItem">
        <div class="select-item" @click="select(index)" v-for="(item, index) in areas" :key="index">{{item.name}}</div>
      </div>
    </div> -->
    <div id="container">
    </div>
    <div class="nav" @click="goNav" v-if="nav">导航</div>
  </div>
</template>
<script>
export default {
  data () {
    let self = this
    return {
      map: '',
      area: '',
      areas: [
        { name: '西湖区', value: 0 },
        { name: '上城区', value: 1 },
        { name: '下城区', value: 2 },
        { name: '拱墅区', value: 2 },
        { name: '江干区', value: 2 },
        { name: '滨江区', value: 2 },
        { name: '余杭区', value: 2 },
        { name: '萧山区', value: 2 },
        { name: '临安区', value: 2 },
        { name: '富阳区', value: 2 },
        { name: '建德市', value: 2 },
        { name: '桐庐县', value: 2 },
        { name: '淳安县', value: 2 },
        { name: '大江东', value: 2 },
        { name: '其他', value: 2 },
      ],
      selectItem: false,
      nav: false,
      positon: [
        {
          name: '萧山区前进成人文化技术学校',
          positon: [120.590607,30.29839]
        },
        {
          name: '萧山区河庄街道办事处城市广场',
          positon: [120.457395,30.298072]
        },
        {
          name: '义蓬街道义和路1号',
          positon: [120.499042,30.27594]
        },
        {
          name: '邻里小区11幢104室',
          positon: [120.356684,30.290163]
        },
        {
          name: '下沙23号大街新雁公寓13幢底层',
          positon: [120.377138,30.299116]
        },
        {
          name: '海通街221-223号',
          positon: [120.320908,30.302445]
        },
        {
          name: '新湾街道华彩名府',
          positon: [120.538225,30.281938]
        },
        {
          name: '七格小区商业街北警务室',
          positon: [120.315953,30.29857]
        },
      ]
    }
  },
  methods: {
    setTitle () {
      document.title = '爱心驿站'
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
    select (index) {
      this.area = this.areas[index].name
      this.selectItem = false
    },
    show () {
      this.selectItem = !this.selectItem
    },
    goNav () {
      let area = this.area
      window.location.href = `https://uri.amap.com/line?name=${area}&src=mypage&callnative=1`
    },
    init () {
      var map = new AMap.Map('container', {
        resizeEnable: true,   
        zoom: 11,
        center: [120.52001,30.314406]
      })
      this.map = map
      this.addMarker()
    },
    addMarker () {
      var map = this.map
      let _this = this
      let positon = this.positon
      positon.forEach((item, index) => {
        let marker = new AMap.Marker({
          position: item.positon
        })
        map.add(marker)
        var infoWindow =  new AMap.InfoWindow()
        marker.on('click', function(e){
          _this.nav = true
          _this.area = item.name
          infoWindow.setContent("<ul class='main'><li> 爱心驿站<span></span></li>" 
                  + "<li>  地址: <span>"+ item.name +"</span></li>")
          infoWindow.open(map, item.positon)
        })
      })
    }
  },
  mounted () {
    this.setTitle()
    this.init()
    
  },
  filters: {
    placeHolder (val) {
      if (val) return val
      else return '区域选择'
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  padding: 0.2rem 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.select {
  position: relative;
  z-index: 2;
}
.title span:last-child {
  display: inline-block;
  margin-left: 0.2rem;
  width: 0;
  height: 0;
  border-left: 0.08rem solid transparent;
  border-right: 0.08rem solid transparent;
  border-bottom: 0.1rem solid #333;
}
.active {
  animation: selectArea 0.2s linear 0s 1 forwards;
}
.normal {
  animation: normal 0.2s linear 0s 1 forwards;
}
.select-item {
  padding: 0.4rem 0.4rem;
  background: #ffffff;
}
#container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.prompt {
  background: white;
  width: 100px;
  height: 30px;
  text-align: center;
}
.nav {
  position: fixed;
  z-index: 10;
  bottom: 0.4rem;
  right: 0.4rem;
  height: 0.3rem;
  padding: 0.2rem;
  border: 0.01rem solid #ccc;
  background: #ffffff;
}


@keyframes selectArea {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(180deg);
  }
}
@keyframes normal {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(180);
  }
}
</style>
<style>
#container .main {
  width: 90%;
}
</style>
