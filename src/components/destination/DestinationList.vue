<template>
  <h1>THIS IS DESTINATIONS</h1>
  <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

  <!-- <body> -->
  <!-- <div id="dest1">Destination 1:</div>
  <div id="dest2">Destination 2:</div>
  <div id="dest3">Destination 3:</div> -->
  <div>
    <h2>List of destinations</h2>
    <p>Destination is {{ destinations.length }}</p>
    <div id="destinationList" class="overflow-auto">
      <div v-for="(destination, index) in destinations" :key="index">
        <DestinationCard @selected="getSelection" :details="destination" />
      </div>
    </div>
  </div>

  <img id="display" src="" alt="" />
  <div id="info"></div>
</template>

<style scoped>
@media (min-width: 767px) {
  #destinationList {
    height: 800px;
  }
}
@media (max-width: 767px) {
  #destinationList {
    display: flex;
    overflow-y: auto;
    white-space: nowrap;
    height: 200px;
  }
}
</style>

<script>
import axios from "axios";
import { ref } from "vue";
import DestinationCard from "../destination/DestinationCard.vue";

export default {
  components: { DestinationCard },
  props: { coordinates: Object },
  emits: ["selectedFromList"],
  setup(props, context) {
    const destinations = ref([]);

    console.log("coordinates is", props.coordinates);

    const options = {
      method: "GET",
      url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
      params: {
        radius: "15000",
        lon: props.coordinates["1"],
        lat: props.coordinates["0"],
        limit: 500,
      },
      headers: {
        "X-RapidAPI-Key": "42e5228046msh886bb3b8f9a3386p188235jsnbb3a9adaa7af",
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("response data is here", response.data);
        destinations.value = response.data.features;
        console.log(destinations.value);

      })
      .catch((error) => {
        console.log(error.message);
      });

    const getSelection = (arg) => {
      console.log("selection is made!!!!!!!");
      console.log(arg.name);
      console.log(arg.lat);
      console.log(arg.lon)

      context.emit("selectedFromList", {
        name: arg.name,
        lat: arg.lat,
        lon: arg.lon
      });
    };

    return { destinations, getSelection };
  },
};
</script>
