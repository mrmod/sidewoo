<template>
  <div id="login">
    Login
    <md-button v-if="inDevelopment" class="md-primary" @click="login">
      Login as business 1
    </md-button>
  </div>
</template>
<script>
export default {
    name: 'Login',
    computed: {
      inDevelopment() {
        return this.rails_env === 'development'
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", 1)
        .then(() => this.$router.push({name: 'Posts'}))
      }
    }
}
</script>