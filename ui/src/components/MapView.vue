<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column pt-5>
      <v-flex>
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
        </v-layout>
      </v-flex>
      <v-flex xs12 class="pink-box">
        <GmapMap :center="markers[0] ? markers[0].location : {lat: 0, lng:0}" :zoom="7" class="gmap fill-height" ref="mapRef">
          <gmap-custom-marker
              :key="index"
              :marker="m.location"
              @click.native="onMarkerClick"
              alignment="right"
              style="cursor: pointer"
              v-for="(m, index) in markers">
            <div>
              <v-alert :type="getMarkerType(m.status.level)" dense>
                Dustbin is <strong>{{ m.status.level }}</strong>% filled
              </v-alert>
            </div>
          </gmap-custom-marker>
        </GmapMap>
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
    width: 100%;
    height: 85%;
    border: 1px solid
  }

  @media only screen and (max-width: 600px) {
    .gmap {
      height: 100%;
    }
  }
</style>
