import initGoogle from './google'

const freeFields = [
    'adr_address',
    'address_components',
    'name',
    'id',
    'formatted_address',
    'formatted_phone_number',
    'geometry',
    'photo',
    'types',
    'website',
]

export default (neighborhood, tag) => initGoogle
  .then(google => new Promise((resolve, reject) => {
        // https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceDetailsRequest
        let request = {
            type: 'neighborhood',
            query: neighborhood,
        }

        const places = new google.maps.places.PlacesService(tag)
        // https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesService.getDetails
        places.textSearch(request, (response) => resolve(response))
    }))