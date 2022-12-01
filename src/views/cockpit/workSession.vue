<template>
  <div class="session">
    <div class="session-left session-bg">
      <div class="pic" id="pic"></div>
    </div>
    <div class="session-right session-bg"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('pic'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },
};
</script>
<style lang="less" scoped>
.session {
  display: flex;
  justify-content: space-between;
  height: 100%;
  &-left {
    width: 25%;
    height: 60%;
  }
  &-right {
    width: 25%;
    height: 100%;
    pointer-events: all;
  }
  &-bg {
    background: rgba(10, 16, 28, 0.8);
  }
}
.pic {
  width: 200px;
  height: 200px;
}
</style>