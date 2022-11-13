<template>
  <div
    id="accomBody"
    class="container text-center mt-3 mb-3 rounded-2"
    style="background-color: #094067"
  >
    <!-- class horizontalScroll for horizontal -->
    <!-- <div class="row">
      <template v-for="hotel in hotels" :key="hotel">
        <AccommodationCard class="col" :details="hotel" />
      </template>
    </div> -->
    <div
      id="accommodationList"
      class="list-group d-flex overflow-auto text-light"
    >
      <div>
        <h4 class="mt-2">Selected Destination:</h4>
        <h5>{{ destinationName }}</h5>
        <!-- <div style="z-index: 5">
          Check-in Date:
          <DatePicker
            :readonly="true"
            format="MMM/D/YYYY"
            width="300px"
            name="date"
            value="help"
          ></DatePicker>
          Check-out Date:
          <DatePicker
            :readonly="true"
            format="MMM/D/YYYY"
            width="300px"
            name="date"
            value="me pls"
          ></DatePicker>
        </div> -->
      </div>
      <hr />
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
  #accomBody {
    height: 800px;
  }
}
@media (max-width: 767px) {
  #accommodationList {
    height: 400px;
  }
  #accomBody {
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
import DatePicker from "../../components/datepicker/DatePicker.vue";

export default {
  components: { AccommodationCard, DatePicker },
  props: { accomDetails: Object, countryDetails: Object },
  emits: ["modalInfo"],
  setup(props, context) {
    // const hotels = ref([]);
    // console.log(props)
    // let country = props.name
    // console.log("HELLO NAME IS ", name)
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

    const destinationName = ref(null);
    watch(
      () => props.accomDetails,
      () => {
        console.log("LIST IS CHANGINGGGG");
        hotels.value = [];
        destinationName.value = props.accomDetails.name;
        console.log("new accomdetails is ", props.accomDetails);
        getHotelInfo(destinationName, lat, lon);
      }
    );

    const { getHotelInfo, hotels } = getAccomodation();

    const getModalInfo = (arg) => {
      console.log("da modal info here!!", arg);
      context.emit("modalInfo", arg);
    };

    return { hotels, getModalInfo, destinationName };
  },
};
</script>
