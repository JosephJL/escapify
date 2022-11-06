<template>
  <!-- <div> -->
  <!-- <h1>This is accomodation list</h1> -->
  <!-- <h1 class="mt-3 mb-2">Top Rated Hotels in Bangkok</h1> -->

  <!-- Table for hotels -->
  <!-- <table class="table table-striped table-secondary table-bordered">
      <thead>
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">Hotel Name</th>
          <th scope="col">Picture</th>
          <th scope="col">Hotel Address</th> -->
  <!-- <th scope="col">Hotel Location</th> -->
  <!-- </tr>
      </thead>
      <tbody>
        <tr v-for="(hotel, idx) in hotels" v-bind:key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ hotel[0] }}</td>
          <td>
            <img
              src="www.https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
              class="card-img-top rounded"
              alt="image here"
            />
          </td>
          <td>{{ hotel[1] }}</td>
        </tr>
      </tbody>
    </table> -->
  <!-- </div> -->

  <div class="container-fluid d-flex text-center bg-info mt-5 border-rounded">
    <!-- class horizontalScroll for horizontal -->
    <div class="row">
      <h1 class="text-light">Top Rated Accomodations around the Area</h1>
      <template v-for="hotel in hotels" :key="hotel">
        <AccommodationCard
          class="col-xxl-2 col-xl-3 col-lg-4 col-md-6"
          :details="hotel"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
// import getPlacePhoto from "../../composables/image/getPhotos.js";
import AccommodationCard from "./AccommodationCard.vue";

export default {
  components: { AccommodationCard },
  props: { accomDetails: Object },
  setup(props) {
    const features = ref([]);
    const hotels = ref([]);
    // console.log(props)
    // let country = props.name

    console.log("accomodations is set up", props.accomDetails);

    const getHotelInfo = async (name) => {
      const options = {
        method: "GET",
        url: "https://hotels4.p.rapidapi.com/locations/v3/search",
        params: { q: name, locale: "en_US" },
        headers: {
          "X-RapidAPI-Key":
            // "638ac48a76mshf275207fe9adab2p158478jsn11957d7c5c7f",
            "42e5228046msh886bb3b8f9a3386p188235jsnbb3a9adaa7af",
          "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        },
      };
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          console.log(name);
          let apiData = response.data.sr;
          for (let idx in apiData) {
            // console.log(apiData[idx])
            let result = apiData[idx];
            if (result.type == "HOTEL") {
              let hotelName = result.regionNames.primaryDisplayName;
              let hotelAddress = result.hotelAddress.street;
              hotels.value.push([hotelName, hotelAddress]);
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    getHotelInfo(props.accomDetails.name);
    // getHotelInfo();
    // for (hotel in hotels) {

    // }
    // getHotelPics();

    return { features, hotels };
  },
};
</script>
