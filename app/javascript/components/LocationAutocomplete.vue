<template>
  <div class="location-autocomplete">
      <div id="search-result" ref="searchResult">
      </div>
      <md-field>
          <label>Business Name and City</label>
          <md-input @keypress='tryAutocomplete' v-model='address'>
          </md-input>
      </md-field>
      <md-list class="md-double-line">
          <md-list-item
            v-for="(p, i) in predictions"
            :key='`place.${i}`'
            @click='() => getPlace(p)'
             :class="{selected: place && p.place_id === place.place_id}"
            >
              <div class="md-list-item-text">
                  <span>{{p.description}}</span>
              </div>
          </md-list-item>
      </md-list>
  </div>
</template>
<script>
import initGoogle from '../services/google'

export default {
    name: 'LocationAutocomplete',
    data() {
        return {
            autocomplete: null,
            sessionToken: null,
            places: null,

            place: null,
            address: '',
            predictions: [],
        }
    },
    mounted() {
        initGoogle.then(google => {
            this.places = new google.maps.places.PlacesService(this.$refs.searchResult)
            this.autocomplete = new google.maps.places.AutocompleteService()
            this.sessionToken = new google.maps.places.AutocompleteSessionToken()
        })
    },
    methods: {
        tryAutocomplete(event) {
            if (this.address.length > 3) {
                const request = {
                    input: this.address,
                    // https://developers.google.com/places/supported_types#table3
                    types: ['establishment'],
                    sessionToken: this.sessionToken,
                }
                this.autocomplete.getPlacePredictions(request, this.autocompleteResponse)
            }
        },
        autocompleteResponse(predictions, serviceStatus) {
            switch (serviceStatus) {
                case 'OK':
                    this.predictions = predictions
                    break
                default:
                    console.log(`Service status is not OK: ${serviceStatus}`)
            }
        },
        getPlace(prediction) {
            const request = {
                placeId: prediction.place_id,
                sessionToken: this.sessionToken,
                fields: [
                    'formatted_address',
                    'name',
                    'place_id',
                    'photos',
                ]
            }
            this.places.getDetails(request, this.detailsResponse)
        },
        detailsResponse(place, serviceStatus) {
            switch (serviceStatus) {
                case 'OK':
                    console.log('Selectd location', place)
                    this.$emit('locationSelected', place)
                    console.log('place', place)
                    // place.photos[].geturl() => https://image.url
                    this.place = place
                    break
                default:
                    console.log(`Service status is not OK: ${serviceStatus}`)
            }
        }
    }
}
</script>

<style scoped>
.selected {
    background-color: lightgray;
}
</style>