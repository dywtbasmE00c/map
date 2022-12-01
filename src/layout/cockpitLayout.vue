<template>
  <el-container class="workContainer">
    <div id="workSession" class="workSession"></div>
    <el-header class="input">
      <!-- <input placeholder="输入省市区名称" v-model="value" />
      <button @click="change">确定</button>
      {{ value }} -->
    </el-header>
    <el-main class="app-main">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
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
        // zoom: 5,
        center: [116.30946, 39.937629],
        viewMode: "3D",
        mapStyle: "amap://styles/darkblue",
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
    drawBounds() {
      // if(!this.value) {
      //   value = '河北省'
      // }
      const that = this;
      this.district.search(this.value, function (status, result) {
        if (that.polygons) {
          that.map.remove(that.polygons);
        }

        that.polygons = [];
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
            that.polygons.push(polygon);
          }
          that.map.add(that.polygons);
          that.map.setFitView(that.polygons);
        }
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
<style>
.workContainer {
  width: 100%;
  height: 100%;
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
  color: white;
  background: url('@/assets/cockpit/cockpit-title.png') no-repeat center/100%;
}
.app-main {
  pointer-events: none;
  z-index: 30;
}
</style>