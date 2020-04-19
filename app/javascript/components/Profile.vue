<template>
  <div id="profile">
      <div id="business" v-if='business && employee'>
          <div class="md-display-1">Hello {{employee.name}}!</div>
          <span class="md-headline">{{business.name}}</span>
          <span class="md-subheading">{{business.website}}</span>
          <span class="md-subheading">{{business.website}}</span>
          <br /> <br />
      </div>
      <div id="locations">
          <div class="md-display-1">Locations</div>
        <md-list>
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
          <md-list>
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
        }
    },
    created() {
        Promise.all([
            this.$store.dispatch('getBusiness', this.$currentUser.business_id),
            this.$store.dispatch('getEmployee', this.$currentUser.employee_id),
            this.$store.dispatch('getBusinessLocations', this.$currentUser.business_id),
            this.$store.dispatch('getBusinessEmployees', this.$currentUser.business_id),
        ])
    },
    computed: {
        business() {
            return this.$store.getters.business
        },
        employee() {
            return this.$store.getters.employee
        },
        employees() {
            return this.$store.getters.businessEmployees(this.$currentUser.business_id)
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