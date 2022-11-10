<template>
  <div id="destinationList" class="container-fluid" style="">
    <div v-for="document in list" :key="document">
      <HotelCard :details="document" :id="id" />
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
import HotelCard from "../hotel/HotelCard.vue";
export default {
  components: { HotelCard },
  props: {
    list: Object,
    id: String,
  },
  setup() {},
};
</script>
