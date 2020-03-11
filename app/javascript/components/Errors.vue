<template>
  <div id="errors">
      <div class="error" v-for='(error, key) in errors' :key='key'>
          {{key}} {{error[0]}}
      </div>
  </div>
</template>
<script>
export default {
    name: 'Errors',
    props: ['errors'],
}
</script>
<style scoped>
.error {
    color: red;
    font-size: 1.2em;
}
</style>