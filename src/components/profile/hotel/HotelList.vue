<template>
  <div class="container-fluid" style="background: lightpink">
    <div>These are your Hotels</div>
    <template v-for="document in list" :key="document">
      <HotelCard :details="document" :id="id" />
    </template>
  </div>
</template>

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
