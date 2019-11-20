<template>
    <div class="fill-height">
        <div class="home fill-height">
            <Map/>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import Map from '@/components/MapView.vue'

    export default {
        name: 'home',
        components: {Map},
        methods: {

        },
        created() {
            // this.showGraph()
        }
    }
</script>
