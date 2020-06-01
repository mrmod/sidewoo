<template>
  <div id="location-finder">
    <div id="search-result" ref="searchResult">
    </div>
    <md-field>
        <label>Business Name and City</label>
        <md-input @keypress='handleKeypress' v-model='address' />
    </md-field>
    <md-button class="md-raised" @click='addressSearch'>Verify address</md-button>
  </div>
</template>
<script>

import initGoogle from '../services/google'
export default {
    name: 'LocationFinder',
    data() {
        return {
            places: null,
            address: '',
        }
    },
    mounted() {
        initGoogle.then(google => {
           this.places = new google.maps.places.PlacesService(this.$refs.searchResult)
        })
    },
    methods: {
        handleKeypress(e) {
            if (e.key !== 'Enter') {
                return
            }
            e.preventDefault()
            this.addressSearch()
        },
        addressSearch() {
            if (this.address.length > 3 && this.address.indexOf(' ') > 0) {
                // https://developers.google.com/maps/documentation/javascript/reference/places-service#FindPlaceFromQueryRequest
                // Uses the Basic Data SKU https://developers.google.com/maps/billing/gmp-billing#basic-data
                let searchRequest = {
                    fields: [
                        // 'address_components',
                        'formatted_address',
                        'name',
                        'place_id',
                        // 'url',
                        // 'utc_offset',
                        // 'vicinity',
                    ],
                    query: this.address,
                }
                if (this.places) {
                   this.places.findPlaceFromQuery(searchRequest, (results) => {
                        this.$emit('results', results)
                    })
                }
            }
        }
    }
}
</script>