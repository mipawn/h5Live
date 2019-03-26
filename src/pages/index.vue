
<template>
  <div class="g_container">
    <div class="m_topbg" style="margin-top:0px">
      <div class="m_header" id="realTimeDiv">
        <h2 class="m_tit">实况监测：萧山气象台2019年03月25日14时50分发布</h2>
        <div class="m_box fl w70">
          <div class="tempBox">
            <em class="tempture">15.6</em>
            <b class="unit"></b>
          </div>
          <ul class="ele_list clearfix">
            <li><i class="i_tag0"></i>0.0毫米</li>
            <li><i class="i_tag1"></i>61% </li>
            <li><i class="i_tag3"></i>1006.0百帕</li>
          </ul>
        </div>
        <div class="m_box fr w30">
          <div class="windBox">
            <div class="wb_con">
              <img class="wind_top" src="../assets/images/wind_top.png">
              <img class="wind_img" src="../assets/images/wind.png">
            </div>
            <span class="wind_txt">西南偏西风1级</span>
          </div>
        </div>
        <div class="clearfix"></div>
        <a class="link24R" href="http://xswx.grassinfo.cn/xswx/index.php?s=/addon/Weather/Weather/currentInfo.html ">近24小时天气实况</a>
      </div>
    </div>
    <!-- 顶部结束 -->
    <!-- 短期预报开始 -->
    <div class="m_block mb_short" id="shortTimeDiv">
      <div class="m_tit">短期预报</div>
      <p class="m_detail">今天下午到夜里多云；明天白天晴到多云，夜里多云转阴；后天阴有雨。偏南风3～4级。明天早晨最低气温8～9度，明天白天最高气温22～23度。明天平均相对湿度75%。</p>
    </div>
    <!-- 短期预报结束 -->
    <div class="m_block mb_7day ">
      <div class="m_tit">七天预报</div>
      <div class="m_content" id="7dayWrap" style="overflow-x: scroll">
        <table class="m_table day7_tab" id="forecast7dayTab" style="transition-property: -webkit-transform; transform-origin: 0px 0px; transform: translate3d(0px, 0px, 0px);">
            <tbody>
              <tr>
                <td>今天<br>03/25</td>
                <td>明天<br>03/26</td>
                <td>后天<br>03/27</td>
                <td>周四<br>03/28</td>
                <td>周五<br>03/29</td>
                <td>周六<br>03/30</td>
                <td>周日<br>03/31</td>
              </tr>
              <tr>
                <td>小雨</td>
                <td>多云</td>
                <td>小到中雨</td>
                <td>中到大雨</td>
                <td>阴</td>
                <td>多云</td>
                <td>晴</td>
              </tr>
              <tr>
                <td>
                  <i class="day_tag">白天</i>
                  <img src="../assets/images/day/7.png">
                </td>
                <td><img src="../assets/images/day/1.png"></td>
                <td><img src="../assets/images/day/21.png"></td>
                <td><img src="../assets/images/day/22.png"></td>
                <td><img src="../assets/images/day/2.png"></td>
                <td><img src="../assets/images/day/1.png"></td>
                <td><img src="../assets/images/day/0.png"></td>
              </tr>
              <tr style="height:120px;">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <div style="width:442px;position: absolute;
                top: 110px;
                width: 100%;
                height: 140px;
                z-index: 0;" >
                <div ref="mychart" style="position: relative;
                overflow: hidden;
                width: 442px;
                height: 140px;
                line-height: normal;
                z-index: 0;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div>
              </div>
              <tr>
                 <td>
                   <i class="night_tag">晚上</i>
                   <img src="../assets/images/night/0.png">
                 </td>
                   <td><img src="../assets/images/night/7.png"></td>
                   <td><img src="../assets/images/night/8.png"></td>
                   <td><img src="../assets/images/night/7.png"></td>
                   <td><img src="../assets/images/night/1.png"></td>
                   <td><img src="../assets/images/night/7.png"></td>
                   <td><img src="../assets/images/night/0.png"></td>
              </tr>
              <tr>
                <td>晴</td><td>小雨</td><td>中雨</td><td>小雨</td><td>多云</td><td>小雨</td><td>晴</td>
              </tr>
              <tr>
                <td>-<br>&lt;3级</td><td>-<br>&lt;3级</td><td>东北风<br>3-4级</td><td>-<br>&lt;3级</td><td>-<br>&lt;3级</td><td>-<br>&lt;3级</td><td>-<br>&lt;3级</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div class="m_block mb_index">
      <div class="m_tit">指数预报</div>
      <table class="index_tab" id="lifeIndexDiv">
        <tbody>
          <tr>
            <td colspan="3" class="no_border">
              <div class="tab_poplayer"><p></p></div>
            </td>
          </tr>
        <!-- 指数详情end -->
        </tbody>
          <tr>
            <td data-id="AQI:40-50，首要污染物:无，空气质量等级:优。空气基本无污染。" data-val="AQI指数">
              <img class="index_img" src="../assets/images/indexicon_0.png" alt="AQI">
              <span class="index_txt">AQI指数<br>优级</span>
            </td>
            <td data-id="森林火险等级为二级，森林火险气象等级较低" data-val="森林火险">
              <img class="index_img" src="../assets/images/indexicon_1.png" alt="AQI">
              <span class="index_txt">森林火险<br>2级</span>
            </td>
            <td data-id="人体舒适度为舒适度指数4级，人体感觉较冷" data-val="人体舒适度">
              <img class="index_img" src="../assets/images/indexicon_2.png" alt="AQI">
              <span class="index_txt">人体舒适度<br>4级</span></td>
          </tr>
          <tr>
            <td data-id="行车安全指数为三级，气象条件比较差，请司机朋友们谨慎驾驶" data-val="行车安全">
              <img class="index_img" src="../assets/images/indexicon_3.png" alt="AQI">
              <span class="index_txt">行车安全<br>3级</span>
            </td>
            <td data-id="空气污染气象条件为二级,较有利于空气污染物稀释、扩散和清除" data-val="空气污染气象条件">
              <img class="index_img" src="../assets/images/indexicon_4.png" alt="AQI">
              <span class="index_txt">空气污染气象条件<br>2级</span>
            </td>
            <td data-id="洗车指数为四级，不太适宜洗车" data-val="洗车指数">
              <img class="index_img" src="../assets/images/indexicon_5.png" alt="AQI">
              <span class="index_txt">洗车指数<br>4级</span>
            </td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

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
            show: true,
            type: 'category',
          },
          {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            show: false,
            position:"bottom",
            offset:60,
            type: 'category',
          }
        ],
        yAxis: {
          splitLine: {
            show: false
          },
          show: false
        },
        tooltip: {
          trigger: 'none'
        },
        toolbox: {
          show: false
        },
        series:[
          {
            name: '白天',
            type: 'line',
            smooth: true,
            data: [10, 12, 21, 54, 260, 830, 710],
            xAxisIndex: 0
          },
          {
            name: '晚上',
            type: 'line',
            smooth: true,
            data: [20, 22, 31, 24, 26, 83, 71],
            xAxisIndex: 1
          }
        ]
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawLine()
    })
  }
}
</script>

