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
    <div v-for="(destination, index) in destinations" :key="index">
      <DestinationCard @selected="getSelection" :details="destination" />
    </div>
  </div>

  <img id="display" src="" alt="" />
  <div id="info"></div>
</template>

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
    const displayDestinations = ref([]);

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
        "X-RapidAPI-Key": "7eb24a45a3msh648b8d859d3cf70p1c07a5jsn8d460e9a9032",
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("response data is here", response.data);
        destinations.value = response.data.features;
        console.log(destinations.value);

        displayDestinations.value = destinations.value.slice(0, 10);
        // console.log(response.data.features[1].properties.name);
        // console.log(response.data.features[2].properties.name);
        // console.log(response.data.features[3].properties.name);
        // xid1 = response.data.features[1].properties.xid;
        // xid2 = response.data.features[1].properties.xid;
        // xid3 = response.data.features[1].properties.xid;

        // var dest1 = document.getElementById("dest1");
        // var dest2 = document.getElementById("dest2");
        // var dest3 = document.getElementById("dest3");
        // dest1.innerText += response.data.features[1].properties.name;
        // dest2.innerText += response.data.features[2].properties.name;
        // dest3.innerText += response.data.features[3].properties.name;
      })
      .catch((error) => {
        console.log(error.message);
      });

    const getSelection = (arg) => {
      console.log("selection is made!!!!!!!");
      console.log(arg.name);
      console.log(arg.text);

      context.emit("selectedFromList", {
        name: arg.name,
        text: arg.text,
      });
    };

    return { destinations, getSelection, displayDestinations };
  },
};
</script>
