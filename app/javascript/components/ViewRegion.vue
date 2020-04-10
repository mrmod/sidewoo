<template>
    <div id="draw-region" ref="drawRegion">
    
    </div>
</template>
<script>
import initGoogle from '../services/google'
export default {
    name: 'ViewRegion',
    data() {
        return {
            map: null,
            drawingManager: null,
            zoom: 6,
        }
    },
    props: {
        points: Array, // [{lat:, lng}]
    },
    mounted() {
        let vm = this
        initGoogle.then(google => {

            this.map = new google.maps.Map(
                this.$refs.drawRegion,
                {
                    streetViewControl: false, // Disable streetView
                    center: this.points[0],
                    zoom: this.zoom,
                }
            )
            let region = new google.maps.Polygon({
                paths: this.points,
                strokeColor: '#66BAFF',
                strokeWeight: 2,
                strokeOpacity: 0.8,
                fillColor: '#66BAFF',
                fillOpacity: 0.3,
            })
            region.setMap(this.map)
        })
        .catch(error => {
            console.log(error)
        })
    },
}
</script>
<style scoped>
#draw-region {
    height: 100%;
    width: 100%;
    min-width: 320px;
    min-height: 320px;
}
</style>