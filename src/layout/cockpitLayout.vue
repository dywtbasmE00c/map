<template>
  <el-container class="workContainer">
    <div class="workBg"></div>
    <div id="workSession" class="workSession"></div>
    <el-header class="input">
      <!-- v-if="$store.state.userInfo.authority === 1" -->
      <div class="input-close" @click="toPlatform">
        <el-icon><SortUp /></el-icon>回到工作台
      </div>
    </el-header>
    <el-main class="app-main">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import { SortUp } from '@element-plus/icons-vue'
import AMap from "AMap";
// import { capitals } from './cockpitMarker.js'
export default {
  components: {
    SortUp
  },
  data() {
    return {
      map: null,
      district: null,
      geoCoder: null,
      polygons: [],
      circleMarker: null
    };
  },
  watch: {
    '$store.state.entCreditCode': {
      // immediate: true,
      handler() {
        console.log(`output->market`)
        this.marker();
      },
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("workSession", {
        zoom: 8,
        center: [120.152585, 30.266597],
        viewMode: "3D",
        mapStyle: "amap://styles/fresh",
        resizeEnable: true,
      });
      this.geoCoder = new AMap.Geocoder();
      let opts = {
        subdistrict: 1, //获取边界返回下级行政区
        extensions: "all", //返回行政区边界坐标组等具体信息
        // level: "province", //查询行政级别为 市
      };
      this.district = new AMap.DistrictSearch(opts);
      // this.drawBounds();
      // this.mapClick();
      // this.marker()
    },
    drawBounds() {
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
        console.log(`output->result`,result)
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
                  // fillColor: "red",
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
            console.log('1', result.regeocode.formattedAddress.indexOf('省'))
            that.value = result.regeocode.formattedAddress.slice(0, 3);
            that.drawBounds();
          }
        });
      });
    },
    toPlatform() {
      this.$router.push('/platform')
    },
    marker(){
      // for(let i=0; i < capitals.length ; i+=1){
        // let center = capitals.center;
        if(this.circleMarker !== null) {
          
          this.circleMarker.setMap(null)
          this.circleMarker = null
        }
        console.log(this.$store.state.entPoint)
        this.circleMarker = new AMap.CircleMarker({
          center:this.$store.state.entPoint,
           icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          // radius:20+Math.random()*10,//3D视图下，CircleMarker半径不要超过64px
          strokeColor:'white',
          strokeWeight:2,
          strokeOpacity:0.5,
          fillColor:'rgba(0,0,255,1)',
          fillOpacity:0.5,
          zIndex:10,
          bubble:true,
          cursor:'pointer',
          clickable: true
        })
        this.circleMarker.setMap(this.map)
        this.map.panTo(this.$store.state.entPoint)
        // this.circleMarker.on('click', ()=> {
        //   console.log(1)
          
        // })
        
        
        // this.map.panBy(50, 100)
      // }
    }
  },
};
</script>
<style lang="less" scoped>
.workContainer {
  position: relative;
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
  z-index: 30;
  display: flex;
  justify-content: flex-end;
  height: 10%;
  color: white;
  background: url("@/assets/cockpit/cockpit-title.png") no-repeat top/100%;
  &-close {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
.app-main {
  pointer-events: none;
  z-index: 30;
}
/deep/.el-main {
  padding-top: 0;
}
</style>