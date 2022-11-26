<template>
  <div class="workContainer">
    <div id="workSession" class="workSession"></div>
    <div class="input">
      <input placeholder="输入省市区名称" v-model="value"/>
      <button @click="change">确定</button>
      {{ value }}
    </div>
  </div>
</template>
<script>
import AMap from 'AMap'
export default {
  data() {
    return {
      map: null,
      district: null,
      value: '河北省'
    };
  },
  // watch: {
  //   map: {
  //     handler() {
  //       this.drawBounds()
  //     }
  //   }
  // },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap(value) {
      let map = new AMap.Map("workSession", {
        zoom: 5,
        center: [116.30946, 39.937629],
        viewMode: "3D",
        mapStyle: "amap://styles/darkblue",
      });
      let opts = {
          subdistrict: 1, //获取边界不需要返回下级行政区
          extensions: "all", //返回行政区边界坐标组等具体信息
          level: "province", //查询行政级别为 市
        };
        this.district = new AMap.DistrictSearch(opts);
        console.log(this.district)
        if(!value) {
          value = '河北省'
        }
        this.district.search(value, function (status, result) {
        console.log(status)
        console.log('000')
        // if (this.polygons) {
        //   this.map.remove(this.polygons);
        // }

        let polygons = [];
        let bounds = result.districtList[0].boundaries;
        console.log('bounds', bounds)
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
            polygons.push(polygon);
          }
          map.add(polygons);
          map.setFitView(polygons);
        }
      });
    },
    // drawBounds() {
      //   let opts = {
      //     subdistrict: 0, //获取边界不需要返回下级行政区
      //     extensions: "all", //返回行政区边界坐标组等具体信息
      //     level: "province", //查询行政级别为 市
      //   };
      //   this.district = new AMap.DistrictSearch(opts);
      //   console.log(this.district)
      // this.district.search("河北省", function (status, result) {
      //   console.log(status)
      //   console.log('000')
      //   // if (this.polygons) {
      //   //   this.map.remove(this.polygons);
      //   // }

      //   let polygons = [];
      //   let bounds = result.districtList[0].boundaries;
      //   console.log('bounds', bounds)
      //   if (bounds) {
      //     for (var i = 0, l = bounds.length; i < l; i++) {
      //       //生成行政区划polygon
      //       let polygon = new AMap.Polygon({
      //         strokeWeight: 1,
      //         path: bounds[i],
      //         fillOpacity: 0.4,
      //         fillColor: "red",
      //         strokeColor: "purple",
      //       });
      //       polygons.push(polygon);
      //     }
      //     this.map.add(polygons);
      //     this.map.setFitView(polygons);
      //   }
      // });
    // },
    change(){
      this.initMap(this.value)
    }
  },
};
</script>
<style>
.workContainer {
  position: relative;
  width: 100%;
  height: 100%;
}
.workSession {
  width: 100%;
  height: 100%;
}
.input {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
}
</style>