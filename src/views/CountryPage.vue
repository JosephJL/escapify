<template>
  <div class="container-fluid">
    <section>
      <!-- <h1>Country Name here {{ name }}</h1> -->
      <!-- <span>Information of prop is {{ props }}</span> -->
    </section>
    <section class="hotelSection">
      <!-- <AccommodationList/> -->
    </section>
    <!-- <AccomodationList :hotelList="hotels.value" /> -->
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import axios from "axios";
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
