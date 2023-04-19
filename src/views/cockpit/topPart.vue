<template>
  <div class="top">
    <div class="top_box" v-for="item in listItem" :key="item.key">
      <div class="top_box_title">{{ item.label }}</div>
      <div class="top_box_nums">{{ listData[item.key] }}
        <span class="top_box_nums-span">{{ '/' + listData[item.subKey] + item.unit }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      listItem: [
        {
          key: 'number',
          subKey: 'numberTarget',
          label: '整治企业数',
          unit: '家'
        },
        {
          key: 'landAreaVacate',
          subKey: 'landAreaVacateTarget',
          label: '腾出用地',
          unit: '万亩'
        },
        {
          key: 'allEnergyConsumeVacate',
          subKey: 'allEnergyConsumeVacateTarget',
          label: '腾出用能',
          unit: '万吨标煤'
        }
      ],
      listData: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      axios({
        method:'get',
        url: '/user_api/yuntu/topList',
        params: {
          dataYear: this.$store.state.yuntuYear
        }
      }).then(res => {
        if(res.data.code === 200) {
          this.listData = res.data.data
        }
      }).catch(e => {
        console.error(e)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  display: flex;
  width: 100%;
  height: 100%;
  &_box {
    display: flex;
    flex-direction: column;
    width: 33.3%;
    height: 100%;
    &_nums {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 44px;
      color: #337ecc;
      &-span {
        position: absolute;
        bottom: 0%;
        right: 10%;
        font-size: 16px;
        color: white;
      }
    }
  }
}
</style>