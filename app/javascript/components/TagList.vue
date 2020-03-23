<template>
  <ul id="tag-list">
    <Tag :tag='tag' v-for='tag in tags' :key='tag.id' v-on:deleteTag='deleteTag' v-on:addTag='addTag' :isEditable="isEditable" />
  </ul>
</template>
<script>
import Tag from './Tag.vue'

export default {
    name: 'TagList',
    components: {Tag},
    props: {
        tags: Array,
        isEditable: Boolean,
    },
    methods: {
        deleteTag: function(tag) {
            this.$emit('deleteTag', tag)
        },
        addTag: function(tag) {
            this.$emit('addTag', tag)
        }
    }
}
</script>

<style scoped>
ul {
    padding: 0px;
    margin: 0px;
}
</style>