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
          name: '松下电化住宅设备机器（杭州）有限公司',
          positon: [120.365848,30.326831],
          location: '杭州经济技术开发区松乔街2号'
        },
        {
          name: '杭州加多宝饮料有限公司',
          positon: [120.378103,30.296442],
          location: '杭州市经济开发区23号大街750号'
        },
        {
          name: '艾博生物医药（杭州）有限公司',
          positon: [120.37905,30.293856],
          location: '下沙经济技术开发区12号大街东198号'
        },
        {
          name: '杭州和利时自动化有限公司',
          positon: [120.35433,30.308482],
          location: '下沙开发区19号路北1号'
        },
        {
          name: '卓尚服饰（杭州）有限公司',
          positon: [120.348078,30.332558],
          location: '杭州市经济技术开发区长空路1号'
        },
        {
          name: '东芝信息机器（杭州）有限公司',
          positon: [120.339906,30.28618],
          location: '开发区M12-19-1地块'
        },
        {
          name: '富士康钱塘科技工业园联合工会',
          positon: [120.351529,30.282218],
          location: '浙江省杭州市下沙经济技朮开发区11号大街58号富士康钱塘科技工业园'
        },
        {
          name: '杭州九阳小家电有限公司1',
          positon: [120.344066,30.337343],
          location: '杭州经济及开发区银海街760号九阳工业园'
        },
        {
          name: '杭州九阳小家电有限公司2',
          positon: [120.344066,30.337343],
          location: '杭州经济及开发区银海街760号九阳工业园'
        },
        {
          name: '泰尔茂医疗产品（杭州）有限公司工会',
          positon: [120.35778,30.30376],
          location: '杭州经济技术开发区6号大街498号'
        },
        {
          name: '怡得乐电子（杭州）有限公司',
          positon: [120.375986,30.298904],
          location: '杭州下沙开发区10号大街280号'
        },
        {
          name: '杭州协合医疗用品有限公司',
          positon: [120.37599,30.29689],
          location: '杭州经济技术开发区10号大街（东）125号'
        },
        {
          name: '金隅（杭州）房地产开发有限公司',
          positon: [120.205743,30.240939],
          location: '钱江国际时代广场2号楼32楼'
        },
        {
          name: '雅培眼力健（杭州）有限公司',
          positon: [120.354575,30.308303],
          location: '杭州经济技术开发区4号大街200号'
        },
        {
          name: '中粮包装投资有限公司工会',
          positon: [120.359308,30.331536],
          location: '杭州经济技术开发区围垦街160号'
        },
        {
          name: '杭州味全食品有限公司工会委员会',
          positon: [120.215286,30.251995],
          location: '杭州下沙银海街468号品牌馆内'
        },
        {
          name: '杭州秉信环保包装有限公司',
          positon: [120.344991,30.328511],
          location: '杭州下沙围垦街439号'
        },
        {
          name: '杭州东芝家电技术电子有限公司',
          positon: [120.365848,30.326831],
          location: '杭州出口加工区标准工厂A区6号工厂'
        },
        {
          name: '杭州顶益食品有限公司',
          positon: [120.360451,30.289266],
          location: '浙江省杭州市经济技术开发区银海街555号'
        },
        {
          name: '杭州丘比食品有限公司1',
          positon: [120.343249,30.284984],
          location: '杭州经济技术开发区（下沙）16号大街5号'
        },
        {
          name: '杭州丘比食品有限公司2',
          positon: [120.371448,30.303804],
          location: '杭州经济技术开发区（下沙）16号大街6号'
        },
        {
          name: '杭州神林电子有限公司',
          positon: [120.346828,30.299777],
          location: '8号大街1号7幢'
        },
        {
          name: '史陶比尔工会',
          positon: [120.361907,30.330617],
          location: '围垦街123号'
        },
        {
          name: '矢崎配件有限公司第一工场',
          positon: [120.36237,30.289601],
          location: '浙江省杭州经济技术开发区12号路出口加工区内'
        },
        {
          name: '矢崎配件有限公司第二工场',
          positon: [120.36237,30.289601],
          location: '浙江省杭州经济技术开发区12号路出口加工区内'
        },
        {
          name: '矢崎配件有限公司第三工场',
          positon: [1120.36237,30.289601],
          location: '浙江省杭州经济技术开发区12号路出口加工区内'
        },
        {
          name: '矢崎配件有限公司第四工场',
          positon: [120.36237,30.289601],
          location: '浙江省杭州经济技术开发区12号路出口加工区内'
        },
        {
          name: '矢崎配件有限公司第五工场',
          positon: [120.36237,30.289601],
          location: '浙江省杭州经济技术开发区12号路出口加工区内'
        },
        {
          name: '西门子（杭州）高压开关有限公司',
          positon: [120.331718,30.289044],
          location: '下沙开发区18号路'
        },
        {
          name: '中日龙电器制品（杭州）有限公司',
          positon: [120.36776,30.292809],
          location: '下沙经济技术开发区12号大街出口加工区B区7号、8号、9号'
        },
        {
          name: '杭州经济技术开发区资产经营集团有限公司',
          positon: [120.32292,30.311108],
          location: '杭州经济技术开发区金沙大道东部国际商务中心2幢21楼'
        },
        {
          name: '杭州旭化成纺织有限公司',
          positon: [120.384298,30.30076],
          location: '杭州经济技术开发区10号路26号'
        },
        {
          name: '玫琳凯（中国）有限公司',
          positon: [120.343967,30.288056],
          location: '开发区十四号大街西35号'
        },
        {
          name: '正泰中自科技园工会联合会',
          positon: [120.375628,30.304583],
          location: '杭州经济技术开发区6号大街260号'
        },
        {
          name: '白杨街道闻潮社区爱心驿家',
          positon: [120.497798,30.27614],
          location: '白杨街道闻潮社区爱心驿家'
        },
        {
          name: '白杨街道邻里社区爱心驿家',
          positon: [120.381335,30.300899],
          location: '白杨街道邻里社区爱心驿家'
        }
      ]
    }
  },
  methods: {
    setTitle () {
      document.title = '妈咪小屋'
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
        zoom: 10,
        center: [120.153576,30.287459]
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
          infoWindow.setContent("<ul class='main'><li> 单位名称: <span>"+item.name+"</span></li>" 
                  + "<li>  地址: <span>"+item.location+"</span></li>"
                  + "<li><a https://uri.amap.com/line?name="+ item.location+"&src=mypage&callnative=1></a></li>")
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
