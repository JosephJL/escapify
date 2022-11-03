<template>
  <div class="container-fluid">
    <div
      v-if="info"
      @click="selectDestination"
      class="card"
      style="height: 100%"
      :style="isClicked ? { 'background-color': '#e6e6e6' } : null"
    >
      <img
        v-if="imageLoading"
        :src="returnURl"
        class="card-img-top rounded"
        alt="image here"
        style="height: 100%; object-fit: cover"
      />
      <div v-else class="d-flex" style="height: 10rem; width: 100%">
        <div
          class="spinner-grow text-light mx-auto align-self-center"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="card-body">
        <!-- textExists is {{ textExists }} -->
        <!-- {{ details }} -->
        <h5 class="card-title">Name:{{ details.properties.name }}</h5>
        <!-- <p class="card-text">Details is {{ info }}</p> -->
        <button @click="selectDestination" class="btn btn-info">
          Go to Destination
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import getDestinationInfo from "../../composables/destination/getDestinationInfo";
import getPlacePhoto from "../../composables/image/getPhotos";

export default {
  props: { details: Object },
  emits: ["selected"],
  setup(props, context) {
    // const loadText = async (placeId) => {
    //   const options2 = {
    //     method: "GET",
    //     url: `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${placeId}`,
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "480d26927amsh4735a5991d23945p1077e5jsnd9d743e8977c",
    //       "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    //     },
    //   };

    //   await axios
    //     .request(options2)
    //     .then(function (response) {
    //       // console.log(response.data.image);
    //       // var image = response.data.image;
    //       console.log(
    //         "Check if wikipedia exists",
    //         response.data.wikipedia_extracts != "undefined"
    //       );
    //       if (response.data.wikipedia_extracts != "undefined") {
    //         textExists.value = true;
    //         text.value = response.data.wikipedia_extracts.text;
    //       }
    //       // var display = document.getElementById("display");
    //       // display.setAttribute("src", image);
    //       // var info = document.getElementById("info");
    //       // info.innerHTML += text;
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //       textExists.value = false;
    //     });
    // };
    const { loadText, error, info } = getDestinationInfo();
    loadText(props.details.properties.xid);

    // loadText(props.details.properties.xid);

    const isClicked = ref(false);

    const selectDestination = () => {
      isClicked.value = true;
      context.emit("selected", {
        name: props.details.properties.name,
        text: text.value,
      });
    };

    const { imageLoading, returnURl, load } = getPlacePhoto();
    load(props.details.properties.name);

    return { selectDestination, info, isClicked, imageLoading, returnURl };
  },
};
</script>
