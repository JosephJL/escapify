<template>
  <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

  <!-- <body> -->
  <!-- <div id="dest1">Destination 1:</div>
  <div id="dest2">Destination 2:</div>
  <div id="dest3">Destination 3:</div> -->
  <div>
    <h2>Check it out!</h2>
    <!-- <p>Destination is</p> -->
    <div id="destinationList" class="overflow-auto">
      <div v-for="(destination, index) in list[page]" :key="index">
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
  props: { list: Object, page: Number },
  emits: ["selectedFromList"],
  setup(props, context) {
    console.log("props list is", props.list);
    console.log("current page in country list is", props.page);

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

    return { getSelection };
  },
};
</script>
