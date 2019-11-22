<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout wrap pt-2>
      <v-flex xs12 sm8 class="pink-box fill-height">
        <GmapMap :center="markers[0] ? markers[0].location : {lat: 0, lng:0}" :zoom="7" class="gmap fill-height" ref="mapRef">

          <gmap-custom-marker
                  :key="index"
                  :marker="m.location"
                  @click.native="showGraph(m)"
                  alignment="right"
                  style="cursor: pointer"
                  v-for="(m, index) in markers">
            <div>
              <v-hover v-slot:default="{ hover }">
              <v-alert v-if="hover" :type="getMarkerType(m.status.level)" dense>
                Dustbin is <strong>{{ m.status.level }}</strong>% filled
              </v-alert>
              <v-icon v-else :class="getMarkerIcon(m.status.level)" medium :color="getMarkerType(m.status.level)"></v-icon>
              </v-hover>
            </div>
          </gmap-custom-marker>
        </GmapMap>
      </v-flex>
      <v-flex sm4>
        <v-layout row wrap align-center>
          <v-flex xs8>
            <v-slider
                    :label="markerFilterFilled + '% filled'"
                    :thumb-size="24"
                    color="green lighten-1"
                    thumb-color="red"
                    thumb-label="always"
                    track-color="orange darken-3"
                    v-model="markerFilterFilled"
            ></v-slider>
          </v-flex>
          <v-flex xs4>
            <v-text-field
                    label="City"
                    outlined
                    v-model="markerFilterCity"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <div id="chartContainer" style="" class="fill-height"></div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6 sm6>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps';
  import GmapCustomMarker from 'vue2-gmap-custom-marker';

  export default {
    name: 'MapView',
    data() {
      return {
        markerFilterFilled: 0,
        markerFilterCity: ''
      }
    },
    components: {
      'gmap-custom-marker': GmapCustomMarker
    },
    methods: {
      getDustbins() {
        this.$store.dispatch('dustbin/getDustbins')
      },
      onMarkerClick() {
        console.log('clicked')
        // this.$refs.mapRef.center = this.markers[0]
      },
      getMarkerType(level) {
        if (level > 75) return 'error'
        else if (level > 50) return 'warning'
        else if (level > 25) return 'info'
        else return 'success'
      },
      getMarkerIcon(level) {
        if (level > 90) return 'mdi mdi-battery-90'
        else if (level > 80) return 'mdi mdi-battery-80'
        else if (level > 70) return 'mdi mdi-battery-70'
        else if (level > 60) return 'mdi mdi-battery-60'
        else if (level > 50) return 'mdi mdi-battery-50'
        else if (level > 40) return 'mdi mdi-battery-40'
        else if (level > 30) return 'mdi mdi-battery-30'
        else if (level > 20) return 'mdi mdi-battery-20'
        else if (level > 10) return 'mdi mdi-battery-10'
        else return 'mdi mdi-battery-outline'
      },
      showGraph(m) {
        const history = m.history.map(item=>{
          return {x: new Date(item.timestamp), y: parseInt(item.level)}
        })
        console.log(history)
        // eslint-disable-next-line no-undef
        const chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          title: {
            text: "Dustbin History"
          },
          axisY: {
            title: "Level",
            suffix: "%",
            gridThickness: 0
          },
          axisX:{

          },
          data: [{
            yValueFormatString: "#'%'",
            xValueFormatString: "HH:mm DD-MMM",
            type: "spline",
            dataPoints: history
          }]
        });
        chart.render();
      }
    },
    computed: {
      google: gmapApi,
      dustbins() {
        return this.$store.state.dustbin.dustbins
      },
      filteredDustbin() {
        const dustbins = this.dustbins ? this.dustbins.data : null
        if (!dustbins) return dustbins
        return dustbins.filter(dustbin => {
          return dustbin.status.level >= this.markerFilterFilled && dustbin.pincode.toLowerCase().includes(this.markerFilterCity.toLowerCase());
        })
      },
      markers() {
        const markers = []
        if (this.filteredDustbin) {
          this.filteredDustbin.forEach(dustbin => {
            markers.push(dustbin)
          })
        }
        return markers
      }
    },
    created() {
      this.getDustbins()
    }
  }
</script>

<style scoped>
  .gmap {
    height: 100%;
    border: 1px solid
  }

  @media only screen and (max-width: 600px) {
    .gmap {
      height: 100%;
    }
  }
</style>
