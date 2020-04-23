<template>
    <div id="draw-region" ref="drawRegion">
      <div v-if="points === null" class="no-region">
          <span class="md-title">Create a neighborhood boundary</span>
      </div>
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
            zoom: 10,
        }
    },
    props: {
        points: Array, // [{lat:, lng}]
    },
    mounted() {
        let vm = this
        if (this.points === null) {
            return
        }
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
            console.error(error)
        })
    },
}
</script>
<style scoped>
#draw-region {
    width: 320px;
    height: 320px;
}
.no-region {
    background-color: rgba(240, 240, 240, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    min-width: 320px;
    min-height: 320px;
}
</style>