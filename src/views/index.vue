<template>
  <div class="app-container">
    <div id="map" ref="rootmap"></div>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import Proj from "proj4leaflet";
import 'esri-leaflet';
let esri = require("esri-leaflet");

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      map:null,
    }
  },
  methods: {


  },
  mounted(){
      var res = [
        0.00549933137253187, // Level 0
        0.00274966568626595, // Level 1
        0.00137483284313297, // Level 2
        0.000687416421566485, // Level 3
        0.000343708210783242, // Level 4
        0.000171854105391621,
        8.59270526958104E-05,
        4.29635263479052E-05,
        2.14817631739526E-05,
        1.07408815869763E-05,
        5.37044079348816E-06,
        2.68522039674407E-06,
        1.34261019837204E-06
      ];
      var crs = new L.Proj.CRS('SR-ORG:7408', '+proj=longlat +ellps=GRS80 +no_defs',
        {
          resolutions: res,
          origin: [118.122911693886, 31.2869311022836],
        }
      );
      var southWest = [29.1304, 118.1217];//地图西南点坐标
      var northEast = [30.6191, 120.7753];//地图东北点坐标
      var bounds = L.latLngBounds(southWest, northEast);//地图边界

      this.map = L.map('map', {
        crs: crs,
        attributionControl: false,
        measureControl: true,
        zoomControl: true,
        zoom: 3,
        //minZoom: 9,
        //maxZoom: 17,
        maxBounds: bounds,//地图的边界
        center: [30.25, 120.145]

      });

      var basemap = new L.TileLayer(//    hzsyvector_dark
        //this.mapDzUrl+"/tile/{z}/{y}/{x}",
        "http://172.18.109.232:8080/7F6B37860FE86671CFEBFF88BB2D1C65F7C1216D9CF88722E4A623ABE09D5B6B6750E6D8E4F10588F8036F137E53FA33/PBS/rest/services/hzsyraster/Mapserver/tile/{z}/{y}/{x}",
        {
          tileSize: 256,
          minZoom: 0,
          maxZoom: 12,
        }
      );

      var basemap1 = new L.TileLayer(//    hzsyvector_dark
        "http://172.18.109.232:8080/7F6B37860FE86671CFEBFF88BB2D1C65F7C1216D9CF88722E4A623ABE09D5B6B6750E6D8E4F10588F8036F137E53FA33/PBS/rest/services/hzsyvector/Mapserver/tile/{z}/{y}/{x}",
        //this.mapYxUrl+"/tile/{z}/{y}/{x}",
        {
          tileSize: 256,
          minZoom: 0,
          maxZoom: 12,
        }
      );
      //紫线测试
      var basemap2 = new L.TileLayer(
        "http://126.15.15.141:6080/arcgis/rest/services/ZXCS/MapServer/tile/{z}/{y}/{x}",
        {
          tileSize: 256,
          minZoom: 0,
          maxZoom: 12,
          zIndex: 4,
        }
      );
    let zx = esri.dynamicMapLayer({
      url: "http://126.15.15.141:6080/arcgis/rest/services/ZXCS/MapServer",
      layers:[0]
    });

      var yn = L.layerGroup([zx]);

      var baseMaps = {
        "电子地图":basemap1,
        "影像地图":basemap
      };
      var overlayMaps = {
        "紫线":yn
      };
      this.map.addLayer(basemap1);
      //L.control.layers(baseMaps).addTo(this.map);
      this.map.addLayer(yn);
      L.control.layers(baseMaps,overlayMaps).addTo(this.map);
      var multipolygon = L.featureGroup();
      this.map.addLayer(multipolygon);

      this.map.on('click',function(e) {
        console.log("mappp",e);
      });
      //this.loadYjjbnt();
    },
}
</script>

<style lang="scss" scoped>

  #map{
    height: 85vh;
    width: 100%;
  }
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
