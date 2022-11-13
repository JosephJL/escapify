<template>
  <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

  <!-- <body> -->
  <!-- <div id="dest1">Destination 1:</div>
  <div id="dest2">Destination 2:</div>
  <div id="dest3">Destination 3:</div> -->
  <div>
    <!-- <p>Destination is</p> -->
    <div id="destinationList" class="overflow-auto mt-3 mb-3" style="">
      <div class="mb-2" v-for="(destination, index) in list[page]" :key="index">
        <DestinationCard
          @selected="getSelection"
          @modalInfo="getModalInfo"
          :details="destination"
          :countryPacket="countryDetails"
        />
      </div>
    </div>
  </div>
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
    height: 100%;
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
import axios from "axios";
import { ref } from "vue";
import DestinationCard from "../destination/DestinationCard.vue";

export default {
  components: { DestinationCard },
  props: { list: Object, page: Number, countryDetails: Object },
  emits: ["selectedFromList", "modalInfo"],
  setup(props, context) {
    console.log("props list is", props.list);
    console.log("current page in country list is", props.page);

    const getSelection = (arg) => {
      console.log("selection is made!!!!!!!");
      console.log(arg.name);
      console.log(arg.lat);
      console.log(arg.lon);

      context.emit("selectedFromList", {
        name: arg.name,
        lat: arg.lat,
        lon: arg.lon,
      });
    };

    const getModalInfo = (arg) => {
      // console.log("da modal info here!!");
      console.log(arg.name);
      console.log(arg.lat);
      console.log(arg.lon);
      console.log(arg.kinds);
      console.log(arg.xid);

      context.emit("modalInfo", arg);
    };

    return { getSelection, getModalInfo };
  },
};
</script>
