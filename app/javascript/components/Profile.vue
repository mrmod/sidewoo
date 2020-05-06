<template>
  <div id="profile">
      <div id="business" v-if='business && employee'>
          <div class="md-display-1">Hello {{employee.name}}!</div>
          <div class="md-headline">{{business.name}}</div>
          <div class="md-subheading" v-if='business.website'>
              <a target="_blank" rel="noopener noreferrer" :href='business.website'>{{business.website}}</a>
          </div>
      </div>
      <div id="locations">
          <div class="md-display-1">Locations</div>
        <md-list v-if='isLoaded'>
            <md-list-item v-for='location in locations' :key='`location.${location.id}`'>
                <div class="md-list-item-text">
                    <span>{{location.name}}</span>
                    <span>{{location.city}}, {{location.state}} {{location.postal}} </span>
                </div>
                <div>
                    <ViewRegion v-if="isRegionLoaded(location)" :points='regionPoints(location)' />
                </div>
            </md-list-item>
        </md-list>
      </div>
      <div id="employees">
          <div class="md-display-1">Employees</div>
          <md-list v-if='isLoaded'>
            <md-list-item v-for='e in employees' :key='`employee.${e.id}`'>
                <div class="md-list-item-text">
                    <span v-if="e.id === employee.id">
                        <strong>{{e.name}}</strong> 
                        </span>
                    <span v-if="e.id !== employee.id">{{e.name}}</span>
                    <span>{{employeeRole(e)}}</span>
                </div>
            </md-list-item>
        </md-list>
      </div>

      <div id="neighbors">
          <div class="md-display-1">Neighbors</div>
          <md-list v-if='isLoaded'>
              <md-list-item v-for='b in regionalBusinesses' :key='`regionalBusiness.${b.id}`'>
                  <div v-if='b.id !== business.id' class="md-list-item-text">
                      <span>{{b.name}}</span>
                      <span>{{b.address}}</span>
                  </div>
              </md-list-item>
          </md-list>
      </div>
  </div>
</template>
<script>
import ViewRegion from './ViewRegion.vue'
export default {
    name: 'Profile',
    components: {ViewRegion},
    data() {
        return {
            regionsLoaded: [], // Location Ids
            isLoaded: false,
        }
    },
    created() {
        Promise.all([
            this.$store.dispatch('getBusiness', this.$store.state.currentUser.business_id),
            this.$store.dispatch('getCurrentUserEmployee', this.$store.state.currentUser.employee_id),
            this.$store.dispatch('getBusinessLocations', this.$store.state.currentUser.business_id),
            this.$store.dispatch('getBusinessEmployees', this.$store.state.currentUser.business_id),
            this.$store.dispatch('getRegionalBusinesses', this.$store.state.currentUser.region.id),
        ])
        .then(() => this.isLoaded = true)
    },
    computed: {
        business() {
            return this.$store.getters.business
        },
        employee() {
            return this.$store.state.currentUser.employee
        },
        employees() {
            return this.$store.getters.businessEmployees(this.$store.state.currentUser.business_id)
        },
        regionalBusinesses() {
            return this.$store.state.regionalBusinesses
        },
        locations() {
            let locations = this.$store.getters.businessLocations

            locations.map(l => {
                this.$store.dispatch('getLocationRegion', l.id).then(() => this.regionsLoaded.push(l.id))
            })
            return locations
        },
    },
    methods: {
        employeeRole(employee) {
            switch (employee.role) {
                case 0:
                    return 'Owner'
                case 1:
                    return 'Lead'
                case 2:
                    return 'Employee'
            }
        },
        isRegionLoaded(location) {
            return this.regionsLoaded.indexOf(location.id) >= 0
        },
        regionPoints(location) {
            let region = this.$store.getters.region(location.region_id)
            if (region) {
                try {
                    let points = JSON.parse(region.points)
                    return points
                } catch(e) {
                    console.log('failed to parse points', e)
                    return []
                }
            }
            return []
        },
    }
}
</script>