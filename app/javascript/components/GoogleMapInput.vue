<template>
  <md-input>
  </md-input>
</template>
<script>
import initGoogle from '../services/google'
export default {
    name: 'GoogleMapInput',
    mounted() {
        let vm = this
        initGoogle.then(google => {
            let autocomplete = new google.maps.places.Autocomplete(vm.$refs.placesSearch)
        })
    },
}
</script>