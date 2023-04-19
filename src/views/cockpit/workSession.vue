<template>
  <div class="session">
    <div class="session-left session-bg">
      <LeftPart />
    </div>
    <div class="session-right session-bg">
      <RightPart />
    </div>
    <div class="session-bottom session-bg">
      <BottomPart />
    </div>
    <div class="session-top session-bg">
      <TopPart />
    </div>
  </div>
</template>
<script>
// import { markRaw } from 'vue'

import LeftPart from './leftPart.vue';
import RightPart from './rightPart.vue';
import BottomPart from './bottomPart.vue';
import TopPart from './topPart.vue';

export default {
  mounted() {
    // this.initChart()
  },
  props: {
    area: {
      type: String
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  components: {
    LeftPart,
    RightPart,
    BottomPart,
    TopPart
  },
  methods: {
    // initChart() {
    //   // 基于准备好的dom，初始化echarts实例
    //   this.myChart = markRaw(echarts.init(document.getElementById('pic')));
    //   // 绘制图表
    //   this.myChart.setOption({
    //     title: {
    //       text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20]
    //       }
    //     ]
    //   });
    //   window.addEventListener('resize', () => {
    //     this.myChart.resize();
    //   })
    // }
  },
};
</script>
<style lang="less" scoped>
.session {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
  color: white;
  &-left {
    width: 22%;
    height: 68%;
    pointer-events: all;
  }
  &-right {
    width: 22%;
    height: 68%;
    pointer-events: all;
  }
  &-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 31%;
  }
  &-top {
    position: absolute;
    top: 0;
    left: 26%;
    width: 48%;
    height: 15%;
  }
  &-bg {
    padding: 10px;
    box-sizing: border-box;
    background: rgba(10, 16, 28, 0.8);
  }
}
.pic {
  width: 100%;
  height: 200px;
}
</style>