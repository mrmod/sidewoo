<template>
  <div id="media-list">
    <ul class="media">
      <li v-for='m in media' :key='m.id'>
        <img :src='m.url' class="media-file" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    name: 'Media',
    props: {
        media: Array,
    },
}
</script>
<style language='scss' scoped>
.media-file {
    width: 125px;
    height: 125px;
}
ul {
    list-style-type: none;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
}
ul > li {
    display: inline-block;

}
</style>