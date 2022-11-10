<template>
  <div id="destinationList" class="container-fluid" style="">
    <div v-for="document in list" :key="document" class="p-0">
      <DestinationCard :details="document" :id="id" />
    </div>
  </div>
</template>

<style scoped>
#destinationList {
  display: flex;
  overflow-y: auto;
  white-space: nowrap;
  /* height: 100%; */
}
</style>

<script>
import DestinationCard from "../destination/DestinationCard.vue";
export default {
  components: { DestinationCard },
  props: {
    list: Object,
    id: String,
  },
  setup() {},
};
</script>
