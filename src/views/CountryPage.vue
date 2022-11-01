<template>
  <div class="container-fluid">
    <section>
      <!-- <h1>Country Name here {{ name }}</h1> -->
      <!-- <span>Information of prop is {{ props }}</span> -->
    </section>
    <section>
      Country Information
    </section>
    <section class="destinations">
      <DestinationList />
      
    <section class="hotelSection">
      <!-- <AccommodationList/> -->
    </section>
    <!-- <AccomodationList :hotelList="hotels.value" /> -->
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import axios from "axios";
import DestinationList from "../components/destinations/DestinationList.vue"

export default {
  components: {DestinationList},
import AccommodationList from "../components/accommodation/AccommodationList.vue"


export default {

  components:{ AccommodationList },
  props: {
    name: String,
  },
  setup(props) {
  },
};
</script>
