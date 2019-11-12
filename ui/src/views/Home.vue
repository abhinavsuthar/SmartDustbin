<template>
  <div class="home fill-height">
    <Map/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Map from '@/components/MapView.vue'

  export default {
    name: 'home',
    components: {
      Map
    }
  }
</script>
