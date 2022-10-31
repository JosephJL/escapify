<template>
  <div class="container-fluid" style="background: lightblue">
    <div>These are your destinations</div>
    <template v-for="document in list" :key="document">
      <DestinationCard :details="document" :id="id" />
    </template>
  </div>
</template>
<script>
import DestinationCard from "../../components/destination/DestinationCard.vue";
export default {
  components: { DestinationCard },
  props: {
    list: Object,
    id: String,
  },
  setup() {},
};
</script>
