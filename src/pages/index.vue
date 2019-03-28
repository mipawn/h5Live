
<template>
  <div class="g_container">
    <div class="m_topbg" style="margin-top:0px">
      <div class="m_header" id="realTimeDiv">
        <div class="m_box fl w60">
          <div class="tempBox">
            <em class="tempture">{{weatherHeader.DryBulTemp}}</em>
            <b class="unit"></b>
          </div>
          <ul class="ele_list clearfix">
            <li><i class="i_tag0"></i>{{weatherHeader.Precipitation}}</li>
            <li><i class="i_tag1"></i>{{weatherHeader.RelHumidity}}</li>
            <li><i class="i_tag3"></i>{{weatherHeader.StationPress}}</li>
          </ul>
        </div>
        <div class="m_box fl w40">
          <div class="windBox">
            <div class="wb_con" id="container">
              你若安好便是晴天
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <span class="link24R">{{weatherHeader.WindDirect}}风{{weatherHeader.WindVelocity}}</span>
      </div>
    </div>
    <!-- 顶部结束 -->
    <!-- 短期预报开始 -->
    <!-- <div class="m_block mb_short" id="shortTimeDiv">
      <div class="m_tit">短期预报</div>
      <p class="m_detail">今天下午到夜里多云；明天白天晴到多云，夜里多云转阴；后天阴有雨。偏南风3～4级。明天早晨最低气温8～9度，明天白天最高气温22～23度。明天平均相对湿度75%。</p>
    </div> -->
    <!-- 短期预报结束 -->
    <div class="m_block mb_7day ">
      <div class="m_tit">七天预报</div>
      <div class="m_content" id="7dayWrap" style="overflow-x: scroll">
        <table class="m_table day7_tab" id="forecast7dayTab" style="transition-property: -webkit-transform; transform-origin: 0px 0px; transform: translate3d(0px, 0px, 0px);">
            <tbody>
              <tr>
                <td v-for="(item, key) in forecastSevenList" :key="key">{{item.week}}<br>{{key}}</td>
              </tr>
              <tr>
                <td v-for="(item, key) in forecastSevenList" :key="key">{{item.am.weather}}</td>
              </tr>
              <tr>
                <!-- <td>
                  <i class="day_tag">早</i>
                  <img src="../assets/images/day/7.png">
                </td> -->
                <td v-for="(item, key) in forecastSevenList" :key="key"><img :src="item.am.icon"></td>
              </tr>
              <tr style="height:6.5rem;">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <div style="width:442px;position: absolute;
                top: 6.5rem;
                width: 100%;
                height: 140px;
                z-index: 0;" 
                ref="mychart">
              </div>
              <tr>
                <td v-for="(item, key) in forecastSevenList" :key="key" v-if="item.pm"><img :src="item.pm.icon"></td>
              </tr>
              <tr>
                <td v-for="(item, key) in forecastSevenList" :key="key" v-if="item.pm">{{item.pm.weather}}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div class="m_block mb_index">
      <div class="m_tit">生活指数</div>
      <table class="index_tab" id="lifeIndexDiv">
        <tbody>
          <tr>
            <td colspan="3" class="no_border">
              <div class="tab_poplayer"><p></p></div>
            </td>
          </tr>
        <!-- 指数详情end -->
        </tbody>
          <tr v-if="liveInfo.length > 0">
            <td>
              <img class="index_img" src="../assets/images/indexicon_0.png" :alt="liveInfo[0].name">
              <span class="index_txt">{{liveInfo[0].name}}<br>{{liveInfo[0].level}}级</span>
            </td>
            <td>
              <img class="index_img" src="../assets/images/indexicon_1.png" :alt="liveInfo[1].name">
              <span class="index_txt">{{liveInfo[1].name}}<br>{{liveInfo[1].level}}级</span>
            </td>
            <td>
              <img class="index_img" src="../assets/images/indexicon_2.png" :alt="liveInfo[2].name">
              <span class="index_txt">{{liveInfo[2].name}}<br>{{liveInfo[2].level}}级</span>
            </td>
          </tr>
          <tr v-if="liveInfo.length > 0">
            <td>
              <img class="index_img" src="../assets/images/indexicon_3.png" :alt="liveInfo[3].name">
              <span class="index_txt">{{liveInfo[3].name}}<br>{{liveInfo[3].level}}级</span>
            </td>
            <td>
              <img class="index_img" src="../assets/images/indexicon_4.png" :alt="liveInfo[4].name">
              <span class="index_txt">{{liveInfo[4].name}}<br>{{liveInfo[4].level}}级</span>
            </td>
            <td>
              <img class="index_img" src="../assets/images/indexicon_5.png" :alt="liveInfo[5].name">
              <span class="index_txt">{{liveInfo[5].name}}<br>{{liveInfo[5].level}}级</span>
            </td>
          </tr>
      </table>
    </div>
    <div style="text-align:center;padding:10px 0;">萧山天气数据由萧山气象台提供</div>
  </div>
</template>

<script>
import MapLoader from '@/assets/js/amap.js'
export default {
  data () {
    return {
      weatherHeader: '', // 顶部天气实况
      forecastSevenList: '', // 七天天气列表
      maxTemp: [], // 最高温
      minTemp: [], // 最低温
      liveInfo: [], // 生活指数
      position: ''
    }
  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(this.$refs.mychart) // 初始化
      // 绘制图表
      myChart.setOption({
        xAxis: [
          {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            show: false,
            type: 'category',
            boundaryGap: false,
            scale: true
          },
          {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            show: false,
            position:"bottom",
            offset:60,
            type: 'category',
            boundaryGap: false,
            scale: true
          }
        ],
        yAxis: {
          splitLine: {
            show: false
          },
          show: false,
          scale: true,
          boundaryGap: false,
        },
        grid: {
          top: 25,
          bottom: 25,
          left: 30,
          right: 30
        },
        tooltip: {
          trigger: 'none'
        },
        toolbox: {
          show: false
        },
        series:[
          {
            name: '最高温',
            type: 'line',
            smooth: true,
            data: this.maxTemp,
            xAxisIndex: 0,
            barGap: 0,
            label: {
              show: true,
              color: '#fff'
            },
            lineStyle: {
              color: '#f8d404'
            }
          },
          {
            name: '最低温',
            type: 'line',
            smooth: true,
            data: this.minTemp,
            xAxisIndex: 1,
            label: {
              show: true,
              color: '#fff',
              position: 'bottom'
            },
            lineStyle: {
              color: '#618ab0'
            }
          }
        ]
      })
    },
    getHeader () { // 获取顶部天气实况
      this.$http({
        url: '/xstq/liveWeatherInfo.jspx',
        params: {},
        method: 'get'
      }).then(res => {
        if (res.result === 1 ) {
          let weatherHeader = res.info
          weatherHeader.DryBulTemp = weatherHeader.DryBulTemp.slice(0,-1)
          weatherHeader.Precipitation = weatherHeader.Precipitation.replace('mm', '毫米')
          weatherHeader.StationPress = weatherHeader.StationPress.replace('hpa', '百帕')
          this.weatherHeader = weatherHeader
        } else {
          this.weatherHeader = []
        }
      }).catch(err => {
        console.log('err', err)
        this.$message({
          message: '获取天气实况失败',
          type: 'warning',
          center: true
        })
      })
    },
    getForecastSeven () { // 获取7天数据
      this.$http({
        url: '/xstq/forecast7Day.jspx',
        method: 'get',
        params: {}
      }).then(res => {
        if (res.result == 1) {
        let forecastSevenList = res.data
        this.setLength(forecastSevenList)
        this.setWeek(forecastSevenList)
        this.getTempArea(forecastSevenList)
        this.forecastSevenList = forecastSevenList
        }
      }).catch(err => {
        console.log('err', err)
        this.$message({
          message: '获取7天数据失败' + err,
          type: 'warning',
          center: true
        })
      })
    },
    //时间格式
    setWeek(time){ // 设置星期 time为 object
      let key = Object.keys(time)
      time[key[0]].week = '今天'
      time[key[1]].week = '明天'
      time[key[2]].week = '后天'
      let date = new Date()
      let weekday = date.getDay() //今天是星期几
      time[key[3]].week = weekday + 3 > 6? weekday + 3 - 6:weekday + 3
      time[key[4]].week = weekday + 4 > 6? weekday + 4 - 6:weekday + 4
      time[key[5]].week = weekday + 5 > 6? weekday + 5 - 6:weekday + 5
      time[key[6]].week = weekday + 6 > 6? weekday + 6 - 6:weekday + 6
      for (let key in time) {
        if (time[key].week === 0) {
          time[key].week = '周日'
        } else if(time[key].week === 1) {
          time[key].week = '周一'
        } else if(time[key].week === 2) {
          time[key].week = '周二'
        } else if(time[key].week === 3) {
          time[key].week = '周三'
        } else if (time[key].week === 4) {
          time[key].week = '周四'
        } else if(time[key].week === 5) {
          time[key].week = '周五'
        } else if(time[key].week === 6) {
          time[key].week = '周六'
        }
      }
      return time
    },
    setLength (object) { // 递归处理7天数据的长度
      let key = Object.keys(object) // 获取key[]
      if (key.length === 7) {
        return object
      } else {
        delete object[key[key.length-1]] // 删除最后一个
        this.setLength(object)
      }
    },
    getTempArea (temp) { // 获取温度范围
      let maxTemp=[],minTemp=[]
        for (let key in temp) {
          maxTemp.push(temp[key].maxTemp)
          minTemp.push(temp[key].minTemp)
          
          this.maxTemp = maxTemp
          this.minTemp = minTemp
        }
      this.drawLine()
    },
    getLiveForecast () { // 获取生活指数
      this.$http({
        url: 'xstq/liveForecast.jspx',
        method: 'get'
      }).then(res => {
        this.liveInfo = res.info
      }).catch(err => {
        this.$message({
          message: '获取生活预报失败',
          type: 'warning',
          center: true
        })
      })
    },
    getPosition () { // 获取地理位置
      
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        AMap.plugin('AMap.Geocoder', function() {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '010'
          })
          var lnglat = [116.396574, 39.992706]
          geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                console.log(result)
            }
          })
        })
      }, e => {
      console.log('地图加载失败' ,e)
      })
    }
  },
  mounted () {
    this.getHeader()
    this.getForecastSeven()
    this.getLiveForecast()
    this.getPosition()
  }
}
</script>

