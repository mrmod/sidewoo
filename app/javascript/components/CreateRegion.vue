<template>
    <div id="create-region" ref="createRegion">
        <md-steppers :md-active-step.sync="activeStep">
            <md-step id="first" md-label="Draw Business Region" :md-done.sync='isRegionCreated' >
                <DrawRegion v-on:createdRegion='createdRegion' />
                <md-button
                    class="md-raised md-primary"
                    :disabled='!isRegionCreated'
                    @click='setRegion'>
                    Continue
                </md-button>
                <md-button
                    class="md-raised md-accent"
                    @click='resetRegion'>
                    Cancel
                </md-button>
            </md-step>
            <md-step id="second" md-label="Confirm location" :md-done.sync='isLocationConfirmed' >
                <md-field>
                    <label for='location'>Confirm the business in this region</label>
                    <md-select
                        v-model='location'
                        name='location'
                        id='location'
                        v-on:md-selected='setLocation'>
                        <md-option
                            v-for='l in locations'
                            :key='l.id'
                            :value='l.id'>{{l.name}}
                        </md-option>
                    </md-select>
                </md-field>
                <md-button
                    class="md-raised md-primary"
                    :disabled='!isLocationConfirmed'
                    @click='saveRegion'>
                Save
                </md-button>
                <md-button
                    class="md-raised md-accent"
                    @click='resetRegion'>
                    Cancel
                </md-button>
            </md-step>
        </md-steppers>
    </div>
</template>
<script>
import DrawRegion from './DrawRegion.vue'
export default {
    name: 'CreateRegion',
    components: {DrawRegion},
    data() {
        return {
            activeStep: 'first', // Which 
            isRegionCreated: false,
            isLocationConfirmed: false,
            region: null,
            location: null,
        }
    },
    computed: {
        locations() {
            let locations = this.$store.getters.businessLocations
            let location = locations.find(l => l.primary)
            if (location) {
                this.location = location.id
                this.isLocationConfirmed = true
            }
            return locations
        },
    },
    created() {
        this.$store.dispatch('getBusinessLocations', this.$currentUser.business_id)
    },
    methods: {
        // https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=ja#Polygon
        createdRegion(polygon) {
            this.region = polygon
            this.isRegionCreated = true
        },
        resetRegion() {
            this.$router.go()
        },
        setRegion() {
            this.activeStep = 'second'
        },
        setLocation(id) {
            this.location = id
            this.isLocationConfirmed = true
        },
        saveRegion() {
            this.isLocationConfirmed = false
            const region = {
                points: JSON.stringify(this.region.getPath().getArray()),
            }
            this.$store.dispatch('createRegion', region)
            .then(r => {
                const location = Object.assign(
                    {},
                    this.locations.find(l => l.id === this.location),
                    {region_id: r.id}
                )
                return this.$store.dispatch('updateLocation', location)
            })
            .then(() => this.$router.push('/me'))
        }

    }
}
</script>