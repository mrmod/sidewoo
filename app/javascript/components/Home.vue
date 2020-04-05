<template>
  <div id="home">
    <md-app>
      <md-app-toolbar class=md-primary>
        <span class="md-title">{{$store.getters.title}}</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar md-elevation="0">
          SideWoo
        </md-toolbar>
        <md-list>
          <md-list-item>
            <router-link tag="span" class="no-decoration" to="/">
              <span class="md-list-item-text">Posts</span>
            </router-link>
          </md-list-item>
          <md-list-item>
            <router-link tag="span" class="no-decoration" to="/Events">
              <span class="md-list-item-text">Events</span>
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
import Posts from './Posts.vue'
export default {
    name: 'Home',
    components: {Posts},
    computed: {
      pageTitle: function() {
        return this.$store.getters.title
      }
    }
}
</script>
<style lang="sass">

</style>