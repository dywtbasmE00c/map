<template>
  <div class="left">
    <div class="left_head">企业列表</div>
    <el-input v-model="searchInput">
        <template #suffix>
            <el-icon @click="searchEnt" style="cursor: pointer"><Search /></el-icon>
        </template>
    </el-input>
    <div class="left_container">
      <ul v-infinite-scroll="load" :infinite-scroll-immediate="true" infinite-scroll-distance='1' :infinite-scroll-disabled="current > pages">
        <li v-for="item in entList" :key="item.id">
          <div class="left_container_box">
            <div class="left_container_box_head">
              <div class="left_container_box_head-title">{{ item.entName || '-' }}</div>
              <div class="left_container_box_head-span" v-if="item.industryNameSimple">{{ item.industryNameSimple }}</div>
            </div>
            <div class="left_container_box_info">
              <div>{{ item.entRule ? (item.entRule + '人') : '-' }}</div>
              <div>{{ item.entType !== '暂无评价' ? (item.entType + '级评价结果') : item.entType }}</div>
              <div>{{ item.city + item.county || '-' }}</div>
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
      pages: 0
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
    getData(current) {
      console.log(`output->current`, current)
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
          size: 1
        },
        data: {
          entName: this.searchInput

        }
      })
        .then((res) => {
          this.entList = this.entList.concat(res.data.data.records);
          this.total = res.data.data.total;
          this.pages = res.data.data.pages;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    searchEnt() {
      this.getData(1)
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
