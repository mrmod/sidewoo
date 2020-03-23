<template>
  <li id="tag">
    <md-button v-if='isEditable' @click='deleteTag' class="close-icon md-dense md-raised md-icon-button">
      <md-icon>close</md-icon>
    </md-button>
    {{ tag.name }}
  </li>
</template>
<script>
export default {
    name: 'Tag',
    props: {
        tag: Object,
        isEditable: {default: false, type: Boolean},
    },
    methods: {
        deleteTag: function() {
            this.$emit('deleteTag', this.tag)
        }
    }
}
</script>
<style scoped>
#tag {
  text-align: left;
}
li {
  display: inline;
  list-style-type: none;
  padding: 15px;
  margin: 5px;
  background-color: lightblue;

  border-radius: 20px;
}
.close-icon {
  top: -7px;
  left: -15px;
  margin-right: 0px;
  padding-right: 0px;
}

</style>