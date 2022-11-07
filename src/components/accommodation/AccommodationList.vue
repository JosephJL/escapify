<template>
  <div
    id="accommodationList"
    class="container-fluid d-flex text-center bg-light mt-5 border-rounded"
  >
    <!-- class horizontalScroll for horizontal -->
    <!-- <div class="row">
      <template v-for="hotel in hotels" :key="hotel">
        <AccommodationCard class="col" :details="hotel" />
      </template>
    </div> -->

    <div class="list-group overflow-auto">
      <template v-for="hotel in hotels" :key="hotel">
        <AccommodationCard
          class="list-group-item"
          :details="hotel"
          :countryPacket="countryDetails"
          @modalInfo="getModalInfo"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 767px) {
  #accommodationList {
    height: 800px;
  }
}
@media (max-width: 767px) {
  #accommodationList {
    height: 400px;
  }
}

::-webkit-scrollbar {
  width: 9px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}
</style>

<script>
import { ref, watch } from "vue";
import axios from "axios";
// import getPlacePhoto from "../../composables/image/getPhotos.js";
import AccommodationCard from "./AccommodationCard.vue";
import getAccomodation from "../../composables/accommodation/getAccomodation.js";

export default {
  components: { AccommodationCard },
  props: { accomDetails: Object, countryDetails: Object },
  emits: ["modalInfo"],
  setup(props, context) {
    const features = ref([]);
    // const hotels = ref([]);
    // console.log(props)
    // let country = props.name

    console.log("accomodations is set up", props.accomDetails);
    const lat = props.accomDetails.lat;
    const lon = props.accomDetails.lon;
    // console.log(lat)
    // console.log(lon)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    // console.log(today)

    watch(
      () => props.accomDetails,
      () => {
        console.log("LIST IS CHANGINGGGG");
        hotels.value = [];
        console.log("new accomdetails is ", props.accomDetails);
        getHotelInfo(props.accomDetails.name, lat, lon);
      }
    );

    const { getHotelInfo, hotels } = getAccomodation();

    getHotelInfo(props.accomDetails.name, lat, lon);

    const getModalInfo = (arg) => {
      console.log("da modal info here!!", arg);
      context.emit("modalInfo", arg);
    };

    return { hotels, getModalInfo };
  },
};
</script>
