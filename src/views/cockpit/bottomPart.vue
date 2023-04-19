<template>
  <div class="bottomPart">
    <div class="myEChartsBar" id="myEChartsBar"></div>
    <div class="pieCharts" id="pieCharts"></div>
  </div>
</template>
<script>
import axios from 'axios';
import { getAttrs } from '@/common/utils/others.js';
// import { warnMsg } from '@/common/utils/msgBox.js'
export default {
  data() {
    return {
      listData: [],
      sourceData: [],
      seriesData: []
    }
  },
  mounted() {
    this.getListData()
  },
  methods: {
    getListData() {
      axios({
        method: 'get',
        url: '/user_api/analysis/multidimensionalAnalysis',
        params: {
          type: 1,
          dataYear: this.$store.state.yuntuYear
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.listData = res.data.data
          this.sourceData[0] = ['county', 'number', 'landAreaVacate', 'allEnergyConsumeVacate']
          res.data.data.forEach((item, index) => {
            this.sourceData[index + 1] = [];
            this.sourceData[index + 1].push(item.binning);
            this.sourceData[index + 1].push(item.number);
            this.sourceData[index + 1].push(item.landAreaVacate);
            this.sourceData[index + 1].push(item.allEnergyConsumeVacate);
          })
          console.log(`output->this.sourceData`,this.sourceData)
          this.changeBar();
          this.pieCharts();
        }
      }).catch(e => {
        console.error(e)
      })
    },
    changeBar() {
      const myEChart = this.$echarts.init(document.getElementById("myEChartsBar"));
      const option = {
        legend: {
          orient: 'horizontal',
          data: ['整治企业数（家）', '腾出用地（万亩）', '腾出用能（万吨标煤）'],
          textStyle: {
            color: 'white'          // 图例文字颜色
          }
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          show: false,
          top: '20%',
          right: '15%',
          bottom: '15%',
          left: '10%'
        },
        xAxis: {
          data: getAttrs(this.listData, 'binning'),
          axisLabel: {
            interval: 0
          },
        },
        yAxis: {
          splitLine: {    //网格线
            lineStyle: {
              type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true //隐藏或显示
          }
        },
        series: [
          {
            name: '整治企业数（家）',
            type: "bar",
            // data: getAttrs(this.listData, this.tabSelect),
            data: getAttrs(this.listData, 'number'),
          },
          {
            name: '腾出用地（万亩）',
            type: "bar",
            // data: getAttrs(this.listData, this.tabSelect),
            data: getAttrs(this.listData, 'landAreaVacate'), 
          },
          {
            name: '腾出用能（万吨标煤）',
            type: "bar",
            // data: getAttrs(this.listData, this.tabSelect),
            data: getAttrs(this.listData, 'allEnergyConsumeVacate'),
          }
        ],
      };
      myEChart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
        myEChart.resize();
      });
    },
    pieCharts() {
      const myEChart = this.$echarts.init(document.getElementById("pieCharts"));
      const option = {
        title: [
          {
            text: '整治企业数（家）',
            left: '6%',//居中显示
            top: 0,//底部显示
            textStyle: {
              color: 'white',
              fontSize: 12
            }
          },
          {
            text: '腾出用地（万亩）',
            left: '32%',//居中显示
            top: 0,//底部显示
            textStyle: {
              color: 'white',
              fontSize: 12
            }
          },
          {
            text: '腾出用能（万吨标煤）',
            left: '56%',//居中显示
            top: 0,//底部显示
            textStyle: {
              color: 'white',
              fontSize: 12
            }
          },
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 40,
          top: 20,
          bottom: 20,
          formatter: function (params) {
            var val = "";
            if (params.length > 6) {
              val = params.substr(0, 6) + '...';
              return val;
            } else {
              return params;
            }
          },
          textStyle: {
            color: 'white'          // 图例文字颜色
          }
        },
        tooltip: {},
        dataset: {
          // source: [
            // ['product', 'number', 'landAreaVacate', 'allEnergyConsumeVacate'],
            // ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            // ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            // ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            // ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          // ]
          source: this.sourceData
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['13%', '60%'],
            encode: {
              itemName: 'county',
              value: 'number'
            },
            label: {
              show: false
            },
          },
          {
            type: 'pie',
            radius: '70%',
            center: ['39%', '60%'],
            encode: {
              itemName: 'county',
              value: 'landAreaVacate'
            },
            label: {
              show: false
            },
          },
          {
            type: 'pie',
            radius: '70%',
            center: ['65%', '60%'],
            encode: {
              itemName: 'county',
              value: 'allEnergyConsumeVacate'
            },
            label: {
              show: false
            },
          }
        ]
      };
      myEChart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
        myEChart.resize();
      });
    },
  }
}
</script>
<style lang="less" scoped>
.bottomPart {
  display: flex;
  height: 100%;
  pointer-events: all;
  .myEChartsBar {
    width: 50%;
    height: 100%;
  }
  .pieCharts {
    width: 50%;
    height: 100%;
  }
}
</style>