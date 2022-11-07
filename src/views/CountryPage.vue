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
          <button
            v-if="user"
            data-bs-toggle="modal"
            data-bs-target="#TripForm"
            class="btn btn-info float-end"
          >
            Add to Your Trips
          </button>
          <h1>{{ countryName }}</h1>
          <!-- {{ countryDetails }} -->
          <!-- <span>Information of prop is {{ props }}</span> -->
          <!-- <p>{{ countryDetails.latlng }}</p> -->
          <!-- <h3>Country Information</h3> -->
          <!-- {{ countryDetails }} -->
          <p>Capital: {{ countryDetails.capital }}</p>
          <p>Population: {{ countryDetails.population }}</p>
        </div>
      </div>
    </section>

    <!-- datepicker -->

    <section class="destinations">
      <div class="row">
        <div class="col-md-4 order-md-first col-12 order-last order-md-first">
          <DestinationList
            @selectedFromList="getSelection"
            :list="countryDestinations"
            :page="pageNumber"
          />
        </div>
        <div class="col-md-8">
          <div>Dummy Destination Section</div>
          {{ selectedInfo }}
          <div v-if="getAccom">
            {{ getAccom }}<AccommodationList :accomDetails="selectedInfo" />
          </div>
        </div>
      </div>
    </section>
    <section>Country Information</section>
    <section class="destinations"></section>

    <section class="hotelSection"></section>
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
          <h2>Name your new trip!</h2>
          <input
            type="text"
            v-model="tripName"
            class="form-control"
            id="newTrip"
            style="cursor: pointer"
          />
          {{ tripName }}
          <button
            @click="addNewTrip"
            data-bs-dismiss="modal"
            class="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>

<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import AccommodationList from "../components/accommodation/AccommodationList.vue";
import DestinationList from "../components/destination/DestinationList.vue";
import getDestination from "../composables/destination/getDestination.js";
import getPlacePhoto from "../composables/image/getPhotos.js";
import { useRouter } from "vue-router";

// Current user
import getUser from "../composables/getUser";

// Collection
import useCollection from "../composables/collection/useCollection";

export default {
  components: { AccommodationList, DestinationList },
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

    const { imageLoading, returnURl, load } = getPlacePhoto();

    if (typeof countryDetails.value.name == "object") {
      countryDetails.value.name.official;
      countryName.value = countryDetails.value.name.official;
      load(countryName.value);
    } else {
      countryName.value = countryDetails.value.name;
      load(countryDetails.value.capital);
    }

    console.log(countryDetails.value.latlng["0"]);

    const { addDocument, error } = useCollection();

    //destination pagination
    const pageNumber = ref(0);

    //get country destinations
    const { loadCountryDestination, countryError, countryDestinations } =
      getDestination();
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
        alert("Country added to trips!");
      } else alert(error.value);
    };

    const router = useRouter();

    // selection stuff
    const selectedInfo = ref(null);
    const getAccom = ref(false);

    const getSelection = (arg) => {
      selectedInfo.value = arg;
      console.log("ITS HEREEEEEEEE", selectedInfo.value);
      // console.log("name is, ", typeof selectedInfo.value.name);
      getAccom.value = true;
    };

    return {
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
    };
  },
};
</script>
