<template>
  <div class="container-fluid">
    <section>
      <div class="card card-body container-fluid bg-light border-0">
        <!-- <h1>Country Name here {{ name }}</h1> -->
        <img
          v-if="imageLoading"
          :src="returnURl"
          class="card-img-top rounded"
          alt="image here"
          style="object-fit: cover; height: 400px"
        />
        <div v-else class="d-flex" style="height: 18rem; width: 100%">
          <div
            class="spinner-grow text-light mx-auto align-self-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div>
          <h1>{{ countryName }}</h1>
          <hr />
          <!-- <span>Information of prop is {{ props }}</span> -->
          <!-- <p>{{ countryDetails.latlng }}</p> -->
          <!-- <h3>Country Information</h3> -->
          <!-- {{ countryDetails }} -->
          <p>Capital: {{ countryDetails.capital }}</p>
          <hr />
          <p>Population: {{ countryDetails.population }}</p>
          <hr />
          <p>Translations: {{ countryDetails.translations }}</p>
          <hr />
          <p>Currencies: {{ countryDetails.currencies }}</p>
          <hr />
          <p>Area: {{ countryDetails.area }}</p>
          <hr />
          <p>LatLong : {{ countryDetails.latlng }}</p>
          <button
            v-if="user"
            data-bs-toggle="modal"
            data-bs-target="#TripForm"
            class="btn btn-info"
          >
            Create Trip
          </button>
        </div>
      </div>
    </section>

    <!-- datepicker -->

    <section class="destinations">
      <div class="row">
        <div class="col-md-4 order-md-first col-12 order-md-first">
          <h2 class="bg-warning">Destinations</h2>
          <DestinationList
            @selectedFromList="getSelection"
            @modalInfo="updateDestInfo"
            :list="countryDestinations"
            :page="pageNumber"
            :countryDetails="countryPacket"
          />
        </div>
        <div class="col-md-8">
          <!-- {{ selectedInfo }} -->
          <h2 class="bg-info">Hotels / Accomodation</h2>
          <div v-if="getAccom">
            <!-- {{getAccom}} -->
            <AccommodationList
              @modalInfo="updateAccomInfo"
              :accomDetails="selectedInfo"
              :countryDetails="countryPacket"
            />
          </div>
          <div v-else>
            <!-- {{ firstDestination }} -->
            <AccommodationList
              @modalInfo="updateAccomInfo"
              :accomDetails="firstDestination"
              :countryDetails="countryPacket"
            />
          </div>
        </div>
      </div>
    </section>
  </div>

  <Teleport to="body">
    <div
      id="TripForm"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content card card-body">
          <h2>Lets Get Started!</h2>
          <div class="input-group mt-2">
            <input
              type="text"
              class="form-control"
              v-model="tripName"
              placeholder="Enter Trip Name Here!"
              aria-describedby="button-addon2"
            />
            <button
              @click="addNewTrip"
              data-bs-dismiss="modal"
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Done
            </button>
          </div>
          <label class="form-text"
            >Can't wait to see where you're going next!</label
          >
        </div>
      </div>
    </div>
  </Teleport>
  <TripModal
    :currDestination="modalInfo"
    :countryDetails="countryPacket"
    :type="typeLocation"
  />
</template>

<style scoped>
.modal {
  text-align: center;
  padding: 0 !important;
}
.modal:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -4px;
}
.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
</style>

<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import AccommodationList from "../components/accommodation/AccommodationList.vue";
import DestinationList from "../components/destination/DestinationList.vue";
import getDestination from "../composables/destination/getDestination.js";
import getPlacePhoto from "../composables/image/getPhotos.js";
import { useRouter } from "vue-router";
import TripModal from "../components/profile/trip/TripModal.vue";

// Current user
import getUser from "../composables/getUser";

// Collection
import useCollection from "../composables/collection/useCollection";

export default {
  components: { AccommodationList, DestinationList, TripModal },
  props: {
    details: String,
  },
  setup(props) {
    // get current user
    const { user } = getUser();
    console.log("countryPage user is", user);

    // console.log("props list is ,", props.details);
    const countryDetails = ref(JSON.parse(props.details));
    const countryName = ref(null);

    // load main image
    const { imageLoading, returnURl, load } = getPlacePhoto();
    if (typeof countryDetails.value.name == "object") {
      countryDetails.value.name.official;
      countryName.value = countryDetails.value.name.official;
      load(countryName.value);
    } else {
      countryName.value = countryDetails.value.name;
      load(countryDetails.value.name);
    }
    console.log(countryDetails.value.latlng["0"]);

    // countrypacket for destinationcard
    const countryPacket = ref({
      capital: countryDetails.value.capital,
      countryName: countryName.value,
      latlng: [
        countryDetails.value.latlng["0"],
        countryDetails.value.latlng["1"],
      ],
    });

    console.log("BEGIN COUNTRYPACKET HERE", countryPacket.value);

    const { addDocument, error } = useCollection();

    //destination pagination
    const pageNumber = ref(0);

    //get country destinations
    const {
      loadCountryDestination,
      countryError,
      countryDestinations,
      firstDestination,
    } = getDestination();

    loadCountryDestination(
      countryDetails.value.latlng["0"],
      countryDetails.value.latlng["1"],
      countryDetails.value.area
    );

    //adding a new trip
    const tripName = ref("");

    const addNewTrip = () => {
      addDocument({
        name: countryName.value,
        tripName: tripName.value,
        capital: countryDetails.value.capital,
        userId: user.value.uid,
      });
      if (error.value == null) {
        alert(`You're one step closer to ${countryName.value}!`);
      } else alert(error.value);
    };

    const router = useRouter();

    // selection stuff
    const selectedInfo = ref(null);
    const getAccom = ref(false);

    const getSelection = (arg) => {
      getAccom.value = false;
      selectedInfo.value = arg;
      console.log("ITS HEREEEEEEEE", selectedInfo.value);
      // console.log("name is, ", typeof selectedInfo.value.name);
      getAccom.value = true;
    };

    const modalInfo = ref(null);
    const typeLocation = ref(null);
    // modal info
    const updateDestInfo = (arg) => {
      // console.log("received at country", arg);
      modalInfo.value = arg;
      typeLocation.value = "destinations";
    };

    const updateAccomInfo = (arg) => {
      // console.log("received at country", arg);
      modalInfo.value = arg;
      typeLocation.value = "hotels";
    };

    return {
      updateAccomInfo,
      typeLocation,
      modalInfo,
      updateDestInfo,
      countryPacket,
      getAccom,
      getSelection,
      selectedInfo,
      tripName,
      pageNumber,
      countryDestinations,
      countryDetails,
      countryName,
      user,
      imageLoading,
      returnURl,
      addNewTrip,
      firstDestination,
    };
  },
};
</script>
