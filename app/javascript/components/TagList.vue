<template>
  <ul id="tag-list">
    <Tag :tag='tag' v-for='tag in tags' :key='tag.id' v-on:deleteTag='deleteTag' v-on:addTag='addTag' :isEditable="isEditable" />
    <md-field v-if='isEditable'>
        <md-input placeholder='Enter new tag...' v-model='tag' />
        <md-button @click='addTag' class="md-raised md-primary">Save</md-button>
    </md-field>
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
    data: function() {
        return {tag: ''}
    },
    methods: {
        deleteTag: function(tag) {
            this.$emit('deleteTag', tag)
        },
        addTag: function() {
            this.$emit('addTag', this.tag)
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