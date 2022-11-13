<template>
  <div class="container-fluid pt-2 pb-2">
    <div class="p-3">
      <h3 class="float-end text-light">Welcome Back {{ user.displayName }}!</h3>
    </div>
    <div class="mt-4 p-5 rounded">
      <h1 style="color: whitesmoke">Your Trips</h1>
      <p style="color: whitesmoke">Craft out your next adventure</p>
    </div>
    <div class="container-fluid bg-dark rounded-3" style="--bs-bg-opacity: 0.6">
      <!-- background-color: #b8c1ec -->
      <p class="text-light">View your Trips Here</p>
      <div
        id="tripList"
        class="p-4 fw-bold"
        v-on:mousemove="mouseMoveHandler"
        v-on:mouseup="mouseUpHandler"
        v-on:mousedown="mouseDownHandler"
        ref="menu"
      >
        <template v-if="documents.length">
          <div v-for="(trip, index) of documents" :key="index">
            <TripBadge :details="trip" @selectedTrip="displayTrip" />
          </div>
        </template>
        <template v-else>
          <div class="text-center" style="height: 8rem">
            <!-- <h4 class="">
              What are you waiting for? Click on Discover to create your next
              trip!
            </h4> -->
          </div>
        </template>
      </div>
    </div>
    <div v-if="selectedTrip">
      <TripList :trips="[selectedTrip]" />
    </div>
  </div>
</template>

<style scoped>
#tripList {
  display: flex;
  overflow-y: auto;
  white-space: nowrap;
  cursor: grab;
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
import { ref } from "vue";
import getCollectionById from "../composables/collection/queryCollection";
import getUser from "../composables/getUser";
import getPlacePhoto from "../composables/image/getPhotos";
import TripList from "../components/profile/trip/TripList.vue";
import TripCard from "../components/profile/trip/TripCard.vue";
import TripBadge from "../components/profile/trip/TripBadge.vue";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  components: { TripList, TripBadge },
  setup() {
    const { user } = getUser();
    console.log("user is ,", user.value.uid);
    const userId = JSON.parse(JSON.stringify(user.value)).uid;
    const { documents, error, loadCollection } = getCollectionById();
    loadCollection("trips", userId);

    //scroll functionality for current trips
    const menu = ref(null);
    onMounted(() => {
      menu.value.focus();
      console.log("menu is ", menu);
      menu.value.scrollLeft = 150;
      menu.value.scrollTop = 100;
    });

    const pos = ref({ top: 0, left: 0, x: 0, y: 0 });

    const mouseDownHandler = (e) => {
      menu.value.style.cursor = "grabbing";
      menu.value.style.userSelect = "none";
      pos.value = {
        left: menu.value.scrollLeft,
        top: menu.value.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
    };

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      if (menu.value.style.cursor == "grabbing") {
        const dx = e.clientX - pos.value.x;
        const dy = e.clientY - pos.value.y;

        // Scroll the element
        menu.value.scrollLeft = pos.value.left - dx;
        menu.value.scrollTop = pos.value.top - dy;
      }
    };

    const mouseUpHandler = () => {
      menu.value.style.cursor = "grab";
      menu.value.style.removeProperty("user-select");
    };

    // display selected trip
    const selectedTrip = ref(null);

    const displayTrip = (arg) => {
      selectedTrip.value = arg;
    };

    return {
      displayTrip,
      selectedTrip,
      documents,
      menu,
      user,
      mouseDownHandler,
      mouseMoveHandler,
      mouseUpHandler,
    };
  },
};
</script>
