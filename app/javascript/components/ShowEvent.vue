<template>
  <div id="show-event">
      <Event :event='event' :isEditable='true' />
  </div>
</template>
<script>
import Event from './Event'
import {getOneEvent} from '../services/events'
export default {
    name: 'ShowEvent',
    components: {Event},
    data: function() {
        return {
            id: parseInt(this.$route.params.id),
            name: '',
            theme: '',
            description: '',
            start_time: new Date(),
            end_time: new Date(),
            parent_id: null,
            business_id: null,
            created_at: new Date(),
            updated_at: new Date(),
        }
    },
    computed: {
        event: function() {
            return {
                id: this.id,
                name: this.name,
                theme: this.theme,
                description: this.description,
                start_time: this.start_time,
                end_time: this.end_time,
                parent_id: this.parent_id,
                business_id: this.business_id,
                created_at: this.created_at,
                updated_at: this.updated_at,
            }
        }
    },
    created: function() {
        getOneEvent(this.id).then(r => {
            const event = r.data
            this.name = event.name
            this.theme = event.theme
            this.description = event.description
            this.start_time = event.start_time
            this.end_time = event.end_time
            this.parent_id = event.parent_id
            this.business_id = event.business_id
            this.created_at = event.created_at
            this.updated_at = event.updated_at
        })
    }
}
</script>