<template>
  <div id="editable-media">
      <md-card>
          <MediaList :media='media' />
          <md-field v-if='isEditable'>
            <label>Add media</label>
            <md-file v-model='mediaFile' v-on:md-change='addMedia' />
          </md-field>
      </md-card>
  </div>
</template>
<script>
import MediaList from './MediaList.vue'
export default {
    name: 'EditableMedia',
    components: {MediaList},
    props: {
        model_id: Number,
        model_type: String,
        media: {type: Array, required: false},
        isEditable: {type: Boolean, default: false},
    },
    data: function() {
        return {
            mediaFile: null
        }
    },
    methods: {
        addMedia: function(fileList) {
            this.$emit('addMedia', fileList)
        }
    }
}
</script>