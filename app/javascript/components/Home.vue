<template>
  <div id="home">
    <md-app>
      <md-app-toolbar class=md-primary>
        <span class="md-title">{{$store.getters.title}}</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar md-elevation="0">
          <span class="md-headline">SideWoo</span>
        </md-toolbar>
        <div class="region md-title">{{region.name}}</div>

        <md-list>

          <md-list-item>
            <router-link tag="span" class="no-decoration" to="/Posts">
              <span class="md-list-item-text">Posts</span>
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link tag="span" class="no-decoration" to="/Events">
              <span class="md-list-item-text">Events</span>
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link tag="span" class="no-decoration" to="/Me">
              <span class="md-list-item-text">My Business</span>
            </router-link>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
export default {
    name: 'Home',
    computed: {
      pageTitle() {
        return this.$store.getters.title
      },
      region() {
        return this.$store.state.currentUser.region
      }
    }
}
</script>
<style lang="sass">
</style>