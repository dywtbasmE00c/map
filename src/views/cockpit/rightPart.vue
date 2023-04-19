<template>
  <div class="right">
    <div class="right_head">企业详情</div>
    <div class="right_content">
      <div class="right_content-title">{{ entDetail.entName }}</div>
      <div class="right_content-list">
        <ul>
          <li v-for="(item, index) in listItem" :key="index" class="right_content-list-item">
            <div class="right_content-list-item_title">{{ item.label + ':' }}</div>
            <div class="right_content-list-item_info">{{ entDetail[item.prop] }}</div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      // dataYear: 0,
      // creditCode: ''
      entDetail: {},
      listItem: [
        {
          label: "统一社会信用代码",
          prop: "creditCode",
          width: 240,
        },
        {
          label: "低效工作展开年份",
          prop: "dataYear",
          width: 160,
        },
        {
          label: "区域名",
          prop: "county",
          width: 120,
        },
        {
          label: "行业名",
          prop: "industryNameSimple",
          width: 280,
        },
        {
          label: "企业规模",
          prop: "entRule",
          width: 160,
        },
        {
          label: "企业评价结果",
          prop: "entType",
          width: 120,
        },
        {
          label: "腾出用地面积（亩）",
          prop: "landAreaVacate",
          width: 140,
        },
        {
          label: "腾出用能（吨标煤）",
          prop: "allEnergyConsumeVacate",
          width: 140,
        },
        {
          label: "经度",
          prop: "latitude",
          width: 120,
        },
        {
          label: "纬度",
          prop: "longitude",
          width: 120,
        },
      ]
    }
  },
  // computed: {
  //   creditCode() {
  //     return 
  //   }
  // },
  watch: {
    '$store.state.entCreditCode': {
      handler: function() {
        this.getEntDetail()
      },
    },

  },
  methods: {
    getEntDetail() {
      axios({
        method:'get',
        url: '/user_api/yuntu/entDetail',
        params: {
          dataYear: this.$store.state.yuntuYear,
          creditCode: this.$store.state.entCreditCode
        }
      }).then(res => {
        if(res.data.code === 200) {
          this.entDetail = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.right {
  &_head {
    margin-bottom: 10px;
    font-size: 20px;
    font-family: '汉仪菱心体简', sans-serif;
    font-style:italic;
    line-height: 32px;
    border-bottom: 1px solid lightblue;
  }
  &_content {
    display: flex;
    flex-direction: column;
    &-title {
      color: #337ecc;
      font-size: 20px;
    }
    &-list {
      flex: 1;
      overflow-y: auto;
      &-item {
        display: flex;
        margin: 10px 0;
        &_title {
          width: 60%;
        }
      }
    }
  }
}
</style>