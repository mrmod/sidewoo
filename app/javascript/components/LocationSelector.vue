<template>
  <div id="location-selector">
    <LocationFinder v-on:results='handleResults' />
    <md-list>
        <md-list-item
        v-for='(l, id) in locationResults'
        :key='l.place_id'
        @click='() => selectBusinessLocation(id, l)'
        :class='selectedLocationIndex === id ? "selected-location": ""'
        >
            <div class="md-list-item-text">
                <span>{{l.name}}</span>
                <span>{{l.formatted_address}}</span>
            </div>
        </md-list-item>
    </md-list>
  </div>
</template>
<script>
import LocationFinder from './LocationFinder.vue'
export default {
    name: 'LocationSelector',
    components: {LocationFinder},
    data() {
        return {
            selectedLocationIndex: -1,
            location: null,
            locationResults: [],
        }
    },
    methods: {
        handleResults(locationResults) {
            this.locationResults = locationResults
        },
        selectBusinessLocation(index, googlePlacesLocation) {
            if (this.selectedLocationIndex === index) {
                this.selectedLocationIndex = -1
                this.$emit('locationSelected', null)
                return
            }

            this.selectedLocationIndex = index
            this.$emit('locationSelected', googlePlacesLocation)
        },
    }
}
</script>
<style scoped>
.selected-location {
    background-color: rgba(255, 201,135, .3);
}
</style>