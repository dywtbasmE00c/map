<template>
  <div class="left">
    <div class="left_head">
      <div>企业列表</div>
      <div class="left_head-time">
        <el-select v-model="yuntuYear" @change="yearChange()" size="small" style="width: 80px">
          <el-option
            v-for="item in timeSelect"
            :key="item.value"
            :label="item.label + '年'"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <el-input v-model="searchInput">
        <template #suffix>
            <el-icon @click="searchEnt" style="cursor: pointer"><Search /></el-icon>
        </template>
    </el-input>
    <div class="left_container">
      <ul v-infinite-scroll="load" :infinite-scroll-immediate="true" infinite-scroll-distance='1' :infinite-scroll-disabled="current > pages">
        <li v-for="item in entList" :key="item.id" @click="getEntClick(item)">
          <div class="left_container_box">
            <div class="left_container_box_head">
              <div class="left_container_box_head-title">{{ item.entName || '-' }}</div>
              <div class="left_container_box_head-span" v-if="item.industryNameSimple">{{ item.industryNameSimple }}</div>
            </div>
            <div class="left_container_box_info">
              <div>{{ item.entRule == '0' ? '规上企业' : item.entRule == '1' ? '规下企业' : '暂无'}}</div>
              <div>{{ item.entType !== '暂无评价' ? (item.entType + '级评价结果') : item.entType }}</div>
              <div>{{ item.county || '-' }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Search } from "@element-plus/icons-vue";
import axios from 'axios'
export default {
  components: {
    Search
  },
  data() {
    return {
      count: 10,
      searchInput: '',
      entList: [],
      current: 1,
      pages: 0,
      yuntuYear: 2023,
      timeSelect: [
        {
          label: 2023,
          value: 2023
        },
        {
          label: 2022,
          value: 2022
        },
        {
          label: 2021,
          value: 2021
        },
        {
          label: 2020,
          value: 2020
        },
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    load() {
      this.current++
      this.getData()
    },
    // 获取左侧列表数据
    getData(current) {
      if (current) {
        this.current = current;
      }
      if(this.current === 1) {
        this.entList = [];
      }
      axios({
        method: "post",
        url: "/user_api/yuntu/dataList",
        baseURL: "",
        params: {
          current: this.current,
          size: 10
        },
        data: {
          entName: this.searchInput,
          dataYear: this.yuntuYear
        }
      })
        .then((res) => {
          this.entList = this.entList.concat(res.data.data.records);
          this.total = res.data.data.total;
          this.pages = res.data.data.pages;
          this.$store.commit({
            type: 'getEntData',
            entList: this.entList
          })
          if(this.current === 1) {
              this.yearChange()
              this.getEntClick(res.data.data.records[0])
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    // 时间框change
    yearChange() {
      this.$store.commit({
        type: 'getYuntuYear',
        yuntuYear: this.yuntuYear
      })
      this.getData(1)
    },
    // 搜索框
    searchEnt() {
      this.getData(1)
    },
    // 点击获取选中企业数据
    getEntClick(ent) {
      console.log(`output->ent`, ent)
      this.$store.commit({
        type: 'getEntCode',
        creditCode: ent.creditCode
      })
      this.$store.commit({
        type: 'getEntPoint',
        longitude: ent.longitude,
        latitude: ent.latitude
      })
      this.$store.commit({
        type: 'getEntName',
        entName: ent.entName
      })
    }
  }
}
</script>
<style lang="less" scoped>
.left {
  display: flex;
  flex-direction: column;
  height: 100%;
  &_head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 20px;
    font-family: '汉仪菱心体简', sans-serif;
    font-style:italic;
    line-height: 32px;
    border-bottom: 1px solid lightblue;
  }
  &_container {
    flex: 1;
    overflow-y: auto;
    margin-top: 4px;
  }
  &_container_box {
    margin-top: 4px;
    padding: 6px;
    background-color: rgba(255, 165, 0, 0.2);
    cursor: pointer;
    &_head {
      display: flex;
      justify-content: space-between;
      &-span {
        padding: 0 6px;
        border-radius: 50px;
        background-color: orange;
      }
    }
    &_info {
      display: flex;
      margin-top: 6px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      & div {
        margin-right: 8px;
      }
    }
  }
}
</style>
