<template>
    <div id="draw-region" ref="drawRegion">
    
    </div>
</template>
<script>
import initGoogle from '../services/google'
export default {
    name: 'DrawRegion',
    data() {
        return {
            map: null,
            drawingManager: null,
            center: {lat: 36.979214, lng: -122.011703},
            zoom: 8,
        }
    },
    mounted() {
        let vm = this
        initGoogle.then(google => {
            this.map = new google.maps.Map(
                this.$refs.drawRegion,
                {
                    streetViewControl: false, // Disable streetView
                    center: this.center,
                    zoom: this.zoom,
                }
            )
            this.drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.POLYGON,
                drawingControl: false,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_LEFT,
                    drawingModes: ['polygon'],
                },
                // markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
            })
            google.maps.event.addListener(
                this.drawingManager,
                'polygoncomplete',
                function(polygon) {
                    // Disable further drawing on the map
                    vm.drawingManager.setDrawingMode(null)
                    vm.drawingManager.setOptions({
                        drawingControl: false,
                    })
                    vm.$emit('createdRegion', polygon)
                }
            )
            this.drawingManager.setMap(this.map)
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