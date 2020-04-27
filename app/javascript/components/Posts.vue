<template>
  <div id='posts'>
      <md-field>
          <label>Sort by</label>
          <md-select v-model='comparatorName' v-on:md-selected='onSelected'>
              <md-option value='orderByCreated'>Date created</md-option>
              <md-option value='orderByLastCommented'>Last commented</md-option>
          </md-select>
      </md-field>
      <PostList :posts='posts' />
  </div>
</template>
<script>
import PostList from './PostList.vue'
import {getAllPosts} from '../services/posts'
import {parseDate} from '../services/dates'
import compareDesc from 'date-fns/compareDesc'

export default {
    name: 'Posts',
    components: { PostList },
    data() {
        return {
            comparator: this.orderByCreated,
            comparatorName: 'orderByCreated',
        }
    },
    computed: {
        posts() {
            return this.$store.getters.posts.sort(this.comparator)
        },
    },
    created: function() {
        this.$store.dispatch('getRegionalPosts', this.$store.state.currentUser.region.id)
    },
    methods: {
        onSelected(v) {
            this.comparator = this[v]
        },
        orderByCreated(a, b) {
            let aTime = parseDate(a.updated_at)
            let bTime = parseDate(b.updated_at)
            return compareDesc(aTime, bTime)
        },
        orderByLastCommented(a, b) {
            let aTime = parseDate(a.last_commented)
            let bTime = parseDate(b.last_commented)
            return compareDesc(aTime, bTime)
        }
    }
}
</script>

<style >

</style>