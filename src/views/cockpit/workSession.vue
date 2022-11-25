<template>
  <div id="workSession" class="workSession"></div>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      district: null,
      polygons: [],
    };
  },
  mounted() {
    this.initMap();
    this.drawBounds();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("workSession", {
        zoom: 8,
        center: [120.209947, 30.245853],
        viewMode: "3D",
        mapStyle: "amap://styles/darkblue",
      });
    },
    drawBounds() {
      if (!this.district) {
        let opts = {
          subdistrict: 0, //获取边界不需要返回下级行政区
          extensions: "all", //返回行政区边界坐标组等具体信息
          level: "district", //查询行政级别为 市
        };
        this.district = new AMap.DistrictSearch(opts);
      }
      this.district.setLevel("district");
      this.district.search("杭州市", function (status, result) {
        this.map.remove(this.polygons);
        this.polygons = [];
        let bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            let polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.4,
              fillColor: "#80d8ff",
              strokeColor: "#0091ea",
            });
            this.polygons.push(polygon);
          }
          this.map.add(this.polygons);
          this.map.setFitView(polygons);
        }
      });
    },
  },
};
</script>
<style>
.workSession {
  width: 100%;
  height: 100%;
}
</style>