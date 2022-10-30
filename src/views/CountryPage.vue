<template>
  <div class="container-fluid">
    <section>
      <!-- <h1>Country Name here {{ name }}</h1> -->
      <h1>{{ countryName }}</h1>
      <!-- <span>Information of prop is {{ props }}</span> -->
      {{ countryDetails.latlng }}
    </section>
    <section class="hotelSection">
      <!-- <AccommodationList/> -->
    </section>
    <!-- <AccomodationList :hotelList="hotels.value" /> -->
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import AccommodationList from "../components/accommodation/AccommodationList.vue";

export default {
  components: { AccommodationList },
  props: {
    details: String,
  },
  setup(props) {
    // console.log("props list is ,", props.details);
    const countryDetails = ref(JSON.parse(props.details));
    const countryName = ref(null);

    if (typeof countryDetails.value.name == "object") {
      countryName.value = countryDetails.value.name.official;
      // load(countryDetails.name.official);
    } else {
      countryName.value = countryDetails.value.name;
      // load(countryDetails.name);
    }

    return { countryDetails, countryName };
  },
};
</script>
