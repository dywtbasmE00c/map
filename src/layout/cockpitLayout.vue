<template>
  <el-container class="workContainer">
    <div class="workBg"></div>
    <div id="workSession" class="workSession"></div>
    <el-header class="input">
      <!-- <input placeholder="输入省市区名称" v-model="value" />
      <button @click="change">确定</button>
      {{ value }} -->
    </el-header>
    <el-main class="app-main">
      <router-view :area="value" />
    </el-main>
  </el-container>
</template>
<script>
import { markRaw } from "vue";
import AMap from "AMap";
export default {
  data() {
    return {
      map: null,
      district: null,
      geoCoder: null,
      value: "河北省",
      polygons: [],
    };
  },
  // watch: {
  //   value: {
  //     immediate: true,
  //     handler() {
  //       this.drawBounds();
  //     },
  //   },
  // },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("workSession", {
        zoom: 6,
        center: [116.30946, 39.937629],
        viewMode: "3D",
        mapStyle: "amap://styles/darkblue",
        resizeEnable: true,
      });
      this.geoCoder = new AMap.Geocoder();
      let opts = {
        subdistrict: 1, //获取边界返回下级行政区
        extensions: "all", //返回行政区边界坐标组等具体信息
        // level: "province", //查询行政级别为 市
      };
      this.district = new AMap.DistrictSearch(opts);
      this.drawBounds();
      this.mapClick();
    },
    drawBounds(city) {
      // if(!this.value) {
      //   value = '河北省'
      // }
      if (this.polygons) {
        this.polygons.forEach((item, index) => {
          this.map.remove(this.polygons[index]);
        });
      }
      const that = this;
      this.district.search(this.value, function (status, result) {
        that.polygons = [];
        const cities = result.districtList[0].districtList;
        cities.forEach((item, index) => {
          that.district.search(item.name, function (status, result) {
            that.polygons[index] = [];
            let bounds = result.districtList[0].boundaries;
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                let polygon = new AMap.Polygon({
                  strokeWeight: 1,
                  path: bounds[i],
                  fillOpacity: 0.4,
                  fillColor: "red",
                  strokeColor: "purple",
                });
                that.polygons[index].push(polygon);
              }
              that.map.add(that.polygons[index]);
            }
          });
        });
      });
    },
    change() {
      this.drawBounds();
    },
    mapClick() {
      const that = this;
      this.map.on("click", (e) => {
        const position = [e.lnglat.lng, e.lnglat.lat];
        that.geoCoder.getAddress(position, (status, result) => {
          if (status === "complete" && result.regeocode) {
            console.log("点击位置信息：", result.regeocode.formattedAddress);
            // code用起来太不稳定了，中文更稳定
            // let adcode = result.regeocode.addressComponent.adcode;
            //   let reg = /.+?(省|市|自治区|自治州|县|区)/g
            // let provinceId = parseInt(adcode.substr(0, 2) + "0000");
            // let cityId = parseInt(adcode.substr(0, 4) + "00");
            // let areaId = adcode;
            // console.log("点击位置的省市区id：", provinceId, cityId, areaId);
            that.value = result.regeocode.formattedAddress.slice(0, 3);
            that.drawBounds();
          }
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.workContainer {
  width: 100%;
  height: 100%;
}
.workBg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  pointer-events: none;
  background: radial-gradient(
    farthest-corner at 50% 46.25%,
    rgba(0, 16, 37, 0) 0%,
    #001836 100%
  );
}
.workSession {
  position: absolute;
  width: 100%;
  height: 100%;
}
.input {
  /* position: absolute;
  top: 10px;
  left: 10px; */
  z-index: 30;
  height: 10%;
  color: white;
  background: url("@/assets/cockpit/cockpit-title.png") no-repeat top/100%;
}
.app-main {
  pointer-events: none;
  z-index: 30;
}
/deep/.el-main {
  padding-top: 0;
}
</style>