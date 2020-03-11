<template>
  <div id="home">
      <md-card>
          <md-card-header>
            <span class="md-display-3">
              <router-link to='/posts'>Posts</router-link>
            </span>
        </md-card-header>
      </md-card>
      <md-card>
          <md-card-header>
            <span class="md-display-3">
              <router-link to='/events'>Events</router-link>
            </span>
          </md-card-header>
      </md-card>
  </div>
</template>
<script>
export default {
    name: 'Home'
}
</script>
<style lang="sass">
#home {
    display: grid;
    grid-template-columns: 300px 300px;
}
.md-card {
  margin: 10px;
}
</style>