<template>
  <div id="errors">
      {{errors}}
  </div>
</template>
<script>
export default {
    name: 'Errors',
    props: {
        errors: Array,
    },
}
</script>