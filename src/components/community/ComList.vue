<template>
  <div class="countryList">
    <div class="container-fluid mt-5">
      <!-- class horizontalScroll for horizontal -->
      <div>
        <template v-for="trip in trips" :key="trip">
          <Comcard :details="trip" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countryList {
  height: 100%;
}

.horizontalScroll {
  display: flex;
  overflow-x: auto;
}
</style>

<script>
import Comcard from "../community/ComCard.vue";
import axios from "axios";

export default {
  components: { Comcard },
  props: {
    trips: Object,
  },
  setup(props) {
    var tripList = props.trips;
    console.log("triplist is,", tripList);

    return {};
  },
};
</script>
