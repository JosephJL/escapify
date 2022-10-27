<template>
  <h1>THIS IS DESTINATIONS</h1>
  <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

  <!-- <body> -->
  <!-- <div id="dest1">Destination 1:</div>
  <div id="dest2">Destination 2:</div>
  <div id="dest3">Destination 3:</div> -->
  <div>
    <h2>List of destinations</h2>
    <div v-for="destination in destinations" :key="destination">
      <span>Destination is </span>
    </div>
  </div>

  <img id="display" src="" alt="" />
  <div id="info"></div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  components: {},
  props: {},
  setup() {
    const options = {
      method: "GET",
      url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
      params: { radius: "15000", lon: "103.8505", lat: "1.2892" },
      headers: {
        "X-RapidAPI-Key": "7eb24a45a3msh648b8d859d3cf70p1c07a5jsn8d460e9a9032",
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };

    let destinations = ref([]);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        destinations.value = response.data;
        console.log(response.data.features[1].properties.name);
        console.log(response.data.features[2].properties.name);
        console.log(response.data.features[3].properties.name);
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
      .catch(function (error) {
        console.error(error);
      });

    const options2 = {
      method: "GET",
      url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/N6711454174",
      headers: {
        "X-RapidAPI-Key": "480d26927amsh4735a5991d23945p1077e5jsnd9d743e8977c",
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options2)
      .then(function (response) {
        // console.log(response.data);
        // console.log(response.data.image);
        var image = response.data.image;
        var text = response.data.wikipedia_extracts.text;
        var display = document.getElementById("display");
        display.setAttribute("src", image);
        var info = document.getElementById("info");
        info.innerHTML += text;
      })
      .catch(function (error) {
        console.error(error);
      });

    return { destinations };
  },
};
</script>