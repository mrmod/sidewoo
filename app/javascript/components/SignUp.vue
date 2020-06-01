<template>
  <div id="signup">
      <md-steppers :md-active-step.sync="activeStep" :md-linear='true' >
<!-- Step 1 : Add the name and primary address to the business-->
          <md-step id="newBusiness" :md-label='steps.newBusiness.label' :md-done.sync='steps.newBusiness.isDone'>
              Define the address, name, website URL, link a Google business
              Display the owner employee, the one who "Signed Up" with Google or whatever here
              <md-field>
                  <label>Name</label>
                  <md-input v-model='business.name' />
              </md-field>
              <LocationAutocomplete v-on:locationSelected='locationSelected' />
              <div ref="placesDetail"></div>
              <div>
                <md-button
                    class="md-raised md-primary"
                    @click='endNewBusinessStep'
                    :disabled='!stepComplete("newBusiness")'>
                        Next: Add locations
                </md-button>
              </div>
          </md-step>
<!-- Step 2 : Add locations-->
          <md-step id="setupLocations" :md-label='steps.setupLocations.label' :md-done.sync='steps.setupLocations.isDone'>
              Add other locations your business has
              <md-list>
                  <md-list-item v-for='l in locations' :key='l.places_id'>
                      <md-icon v-if='l.primary' class="md-primary">star</md-icon>
                      <div class="md-list-item-text">
                          <span>{{l.name}}</span>
                          <span>{{l.address}}</span>
                          <span v-if='l.primary'>Primary location</span>
                      </div>
                  </md-list-item>
              </md-list>
              <LocationAutocomplete v-on:locationSelected='additionalLocationSelected' />
              <div ref="additionalLocation"></div>
              <div ref="neighborhood"></div>
              <div>
                <md-button class="md-raised md-primary" @click='nextStep'>Next: Add Employees</md-button>
                <md-button class="md-raised" @click='previousStep'>Go back</md-button>
              </div>
          </md-step>
<!-- Step 3 : Setup additional employees-->
          <md-step id="setupEmployees" :md-label='steps.setupEmployees.label' :md-done.sync='steps.setupEmployees.isDone'>
              Display the owner employee as un-editable.
              Allow adding as many employees as the company needs.
              <md-list>
                  <md-list-item v-for='e in employees' :key='e.email'>
                      <md-icon v-if='isOwner(e)' class="md-primary">star</md-icon>
                      <div class="md-list-item-text">
                          <span>{{e.name}}</span>
                          <span>{{e.email}}</span>
                          <span>{{employeeRole(e)}}</span>
                          <span>{{locations[e.location_id].address}}</span>
                      </div>
                  </md-list-item>
              </md-list>
              <md-field>
                  <label>First name</label>
                  <md-input v-model='employee.firstName' required></md-input>
              </md-field>
              <md-field>
                  <label>Last name</label>
                  <md-input v-model='employee.lastName' required></md-input>
              </md-field>
              <md-field>
                  <label>Email</label>
                  <md-input v-model='employee.email' required></md-input>
              </md-field>
              <md-field>
                  <md-select v-model='employee.role' required>
                      <md-option value=1>Lead</md-option>
                      <md-option value=2>Employee</md-option>
                      <md-option value=0>Co-owner</md-option>
                  </md-select>
              </md-field>
              <md-field>
                  <md-select v-model='employee.location_id' required>
                      <md-option v-for="(l, idx) in locations" :key="idx" :value="idx">
                          {{l.address}}
                      </md-option>
                  </md-select>
              </md-field>
              <md-button class="md-raised" @click='addEmployee'>Add Another Employee</md-button>
              <md-divider />
              <div>
                <md-button class="md-raised md-primary" @click='endSetupEmployeesStep'>Next: Review</md-button>
                <md-button class="md-raised" @click='previousStep'>Go back</md-button>
              </div>
          </md-step>
<!-- Step 4 : List all information -->
          <md-step id="done" :md-label="steps.done.label" :md-done-sync='allDone'>
              <span class="md-display-2">Locations</span>
              <md-list>
                  <md-list-item v-for='l in locations' :key='l.places_id'>
                      <md-icon v-if='l.primary' class="md-primary">star</md-icon>
                      <div class="md-list-item-text">
                          <span>{{l.name}}</span>
                          <span>{{l.address}}</span>
                          <span v-if='l.primary'>Primary location</span>
                      </div>
                  </md-list-item>
              </md-list>
              <span class="md-display-2">Employees</span>
               <md-list>
                  <md-list-item v-for='e in employees' :key='e.email'>
                      <md-icon v-if='isOwner(e)' class="md-primary">star</md-icon>
                      <div class="md-list-item-text">
                          <span>{{e.name}}</span>
                          <span>{{e.email}}</span>
                          <span>{{employeeRole(e)}}</span>
                          <span>{{locations[e.location_id].address}}</span>
                      </div>
                  </md-list-item>
              </md-list>
              <div>
                <md-button class="md-raised md-primary" @click='completeSignUp'>Finish</md-button>
                <md-button class="md-raised" @click='previousStep'>Go back</md-button>
              </div>
          </md-step>

      </md-steppers>
  </div>
</template>
<script>
import {EmployeeRole} from '../services/types'
import LocationAutocomplete from './LocationAutocomplete.vue'
import placesDetail from '../services/placesDetail'
import neighborhoodSearch from '../services/neighborhoodSearch'
export default {
    name: 'SignUp',
    components: {LocationAutocomplete},
    data() {
        return {
            activeStep: "newBusiness",
            // Location finding for the primary location
            search: null,
            selectedLocation: null,
            region_id: null,
            business: {
                id: null,
                name: '', address: '', phone: '', email: '', website: '',
                type: '', employee_business: false,
            },
            location: {
                name: '', address: '', city: '', country: '', province: '', state: '',
                postal: '', lat: '', long: '', primary: false,
            },
            employee: {
                firstName: '',
                lastName: '',
                role: EmployeeRole.employee,
                handle: '',
                email: '',
                location_id: this.primaryLocationIndex || 0,
            },

            steps: {
                newBusiness: {
                    label: "Basics", // Include the Business owner employee profile
                    next: "setupLocations",
                    isDone: false,
                },
                setupLocations: {
                    label: "Locations",
                    next: "setupEmployees",
                    previous: "newBusiness",
                    isDone: false,
                },
                setupEmployees: {
                    label: "Employees", // Everyone but the owner
                    next: "done",
                    previous: "setupLocations",
                    isDone: false,
                },
                done: {
                    label: "All done!", // Give a brief getting started guide
                    previous: "setupEmployees",
                }
            }
        }
    },
    created() {
        this.$store.dispatch('getAllRegions')
    },
    computed: {
        locations() {
            return this.$store.state.signup.locations
        },
        employees() {
            return this.$store.state.signup.employees
        },
        primaryLocation() {
            try {
                return this.$store.state.signup.locations.find(l => l.primary)
            } catch(e) {
                console.dir(this.$store.state.signup)
            }
        },
        primaryLocationIndex() {
            let index = 0
            this.$store.state.signup.locations.forEach((l, idx) => {
                if (l.primary) {
                    index = idx
                }
            })
            return index
        },
        nonPrimaryLocations() {
            try {
                return this.$store.state.signup.locations.filter(l => !l.primary)
            } catch(e) {
                console.dir(this.$store.state.signup)
            }
        }
    },
    methods: {
        nextStep() {
            let step = this.steps[this.activeStep]
            this.steps[this.activeStep].isDone = true
            // TODO: Execute step saving actions
            if (step.next) {
                this.activeStep = step.next
            } else {
                this.activeStep = null
            }
            return this.activeStep
        },
        previousStep() {
            let step = this.steps[this.activeStep]
            this.steps[this.activeStep].isDone = false
            if (step.previous) {
                this.activeStep = step.previous
            } else {
                this.activeStep = 'newBusiness'
            }
            console.log('active step', this.activeStep)
            return this.activeStep
        },
        completeSignUp() {
            let business = Object.assign({}, this.business, {
                id: this.$store.state.currentUser.business_id,
            })

            let locationPromises = this.locations.map((location, idx) => {

                return this.$store.dispatch(
                    'createBusinessLocation', {
                        business: business,
                        location: location,
                })
                .then(dbLocation => ({
                    location: dbLocation,
                    idx: idx,
                }))
            })
            // TODO: Update the logged in employee's location to the 
            //       primary location of the business

            // Create a new business
            return this.$store.dispatch('saveBusiness', business)
            .then(b => this.business = b)
            /// Create locations
            .then(() => Promise.all(locationPromises))
            // Create employees
            .then(indexedLocations => {
                console.log('Assiginging employees business id from ', this.business)
                // Select the location matching the employee's assignment
                let creatableEmployees = []
                this.employees.forEach(e => {
                    let matchedLocation = indexedLocations.find(l => l.idx === e.location_id)
                    if (matchedLocation) {
                        let employee = Object.assign({}, e, {
                            business_id: this.business.id,
                            location_id: matchedLocation.location.id,
                        })
                        delete employee.firstName
                        delete employee.lastName
                        console.log('Adding creatable employee', employee)
                        creatableEmployees.push(employee)
                    } else {
                        console.error(`Could not find location index ${l} for employee ${e.name}`)
                        console.log('Locations data: ', indexedLocations)
                    }
                })
                let employeePromises = creatableEmployees.map(e => this.$store.dispatch(
                    'createEmployee',
                    e
                ))
                let primaryLocation = indexedLocations.find(l => l.location.primary)
                console.log('Updating currentusers location to', primaryLocation)
                if (primaryLocation) {
                    employeePromises.push(
                        this.$store.dispatch('setCurrentUserLocation', primaryLocation.location)
                    )
                }
                return Promise.all(employeePromises)
            })
            // TODO: Create a mutation
            .then(() => (this.$store.createEmployees = []))
            .then(() => this.$router.push('/me'))
            .catch(err => {
                console.error(err)
                return false
            })
        },
        allDone() {
            return true
        },
        // returns true if it's OK to proceed to the next step
        stepComplete(step) {
            switch (step) {
                case 'newBusiness':
                    return this.business.name.length && (this.primaryLocation || this.selectedLocation)
                case 'setupLocations':
                    return this.primaryLocation !== null
                case 'setupEmployees':
                    return true
            }
        },
        endNewBusinessStep() {
            if (this.primaryLocation) {
                this.nextStep()
                return
            }
            placesDetail(this.selectedLocation.place_id, this.$refs.placesDetail)
            .then(details => {
                console.dir(details)
                return this.locationFromAddressComponents(details, true)
                .then(location => {
                    this.location = location
                    this.business.phone = details.formatted_phone_number
                    this.business.website = details.website
                    this.business.address = details.formatted_address
                    this.$store.dispatch('addSignupLocation', location)
                })
            }).then(() => this.nextStep())
        },
        isValidEmployee() {
            console.log('isValid?', this.employee)
            return (this.employee.firstName.length > 2 &&
            this.employee.lastName.length > 2 &&
            this.employee.email.length > 8)
        },
        endSetupEmployeesStep() {
            console.log('thisEmployee', this.employee)
            if (this.isValidEmployee()) {
                this.addEmployee()
            }
            this.nextStep()
        },
        addLocation(placesId, ref, primary) {
            return placesDetail(placesId, ref)
            .then(details => this.locationFromAddressComponents(details, primary))
        },
        addEmployee() {
            this.employee.role = parseInt(this.employee.role)
            this.employee.business_id = this.business.id
            this.employee.name = `${this.employee.firstName} ${this.employee.lastName}`
            if (this.employee.location_id === 0) {
                this.employee.location_id = this.primaryLocationIndex
            }
            delete this.employee.firstName
            delete this.employee.lastName
            
            this.$store.dispatch('addSignupEmployee', this.employee)
            .then(() => this.employee = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: EmployeeRole.employee,
                    handle: '',
                    location_id: this.primaryLocationIndex,
                }
            )
        },
        isOwner(employee) {
            return employee.role === EmployeeRole.owner
        },
        employeeRole(employee) {
            switch (employee.role) {
                case EmployeeRole.owner:
                    return 'Owner'
                case EmployeeRole.lead:
                    return 'Lead'
                case EmployeeRole.employee:
                    return 'Employee'
            }
        },
        // Create a location from a Google Places API details.address_components response
        // TODO: This is a clumsy mess. Decompose the actions into chainable units
        locationFromAddressComponents(details, primary) {
            let location = {
                places_id: details.id,
                primary: primary,
                name: details.name,
                address: details.formatted_address,
                lat: details.geometry.location.lat(),
                long: details.geometry.location.lng(),
            }

            details.address_components.forEach(c => {
                if (c.types.indexOf('political') >= 0) {
                    if (c.types.indexOf('locality') >= 0) {
                        location.city = c.long_name
                    }
                    if (c.types.indexOf('country') >= 0) {
                        location.country = c.short_name
                    }
                    if (c.types.indexOf('administrative_area_level_1') >= 0) {
                        location.state = c.short_name
                    }
                    if (c.types.indexOf("neighborhood") >= 0) {
                        location.places_neighborhood = c.long_name
                    }
                } else if (c.types.indexOf('postal_code') >= 0) {
                    location.postal = c.long_name
                } 

            })
            if (location.places_neighborhood) {
                return neighborhoodSearch(location.places_neighborhood, this.$refs.neighborhood)
                .then(result => {
                    if (result.length === 0) {
                        let region = this.$store.getters.defaultRegion
                        if (location.primary) {
                            this.$store.commit('currentUserRegion', region)
                        }
                        location.region_id = region.id
                        // console.log(`Assigning default region to location with unknown neighborhood ${location.places_neighborhood}`)
                        return location
                    }
                    if (result.length > 1) {
                        // console.log(`warning: found ${result.length} results. First may not be right or best`)
                    }
                    let neighborhood = result[0]
                    if (neighborhood.geometry) {
                        if (neighborhood.geometry.viewport) {
                            let vp = neighborhood.geometry.viewport
                            // {south: 36.9630347, west: -122.01758, north: 36.9815085, east: -122.0004434}
                            // console.log(neighborhood.geometry.viewport.toJSON())
                            // Draw a box [NW, NE, SE, SW]
                            let ne = vp.getNorthEast()
                            let sw = vp.getSouthWest()
                            let regionBounds = [
                                {lat: ne.lat(), lng: sw.lng()},
                                {lat: ne.lat(), lng: ne.lng()},
                                {lat: sw.lat(), lng: ne.lng()},
                                {lat: sw.lat(), lng: sw.lng()},
                            ]
                            // console.log('Created region bounds', regionBounds)
                            let matchingRegions = this.$store.getters.regionsNamed(location.places_neighborhood)
                            // console.log(`Found ${matchingRegions.length} regions matching ${location.places_neighborhood}`)
                            if (matchingRegions.length === 0) {
                                let region = {
                                    name: location.places_neighborhood,
                                    points: JSON.stringify(regionBounds),
                                    center_lat: vp.getCenter().lat(),
                                    center_lng: vp.getCenter().lng(),
                                }
                                return this.$store.dispatch('createRegion', region)
                                .then(r => {
                                    this.$store.commit('currentUserRegion', region)
                                    location.region_id = r.id
                                    return location
                                })
                            } else {
                                this.$store.commit('currentUserRegion', matchingRegions[0])
                                location.region_id = matchingRegions[0].id
                                return location
                            }
                        }
                    }
                })
            }
            let region = this.$store.getters.defaultRegion
            location.region_id = region.id
            this.$store.commit('currentUserRegion', region)
            return new Promise((resolve, reject) => resolve(location))
        },
        locationSelected(googlePlacesLocation) {
            if (googlePlacesLocation === null) {
                this.selectedLocation = null
                return
            }
            this.selectedLocation = googlePlacesLocation
            if (googlePlacesLocation.name) {
                this.business.name = googlePlacesLocation.name
            }
        },
        additionalLocationSelected(place) {
            this.addLocation(place.place_id, this.$refs.additionalLocation, false)
            .then(location => {
                this.$store.dispatch('addSignupLocation', location)
            })
        }
    }
}
</script>
