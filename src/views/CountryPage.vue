<template>
  <div id="countrypage" class="countrypage">
    <div
      class="countryimage card card-body container-fluid border-0"
      :style="{ backgroundImage: 'url(' + returnURl + ')' }"
      style="
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <!-- <h1>Country Name here {{ name }}</h1> -->
      <!-- <img
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
      </div> -->
      <div
        class="justify-content-center align-self-center"
        style="margin-top: 8rem; opacity: 0.9"
      >
        <div class="card card-body">
          <h1>
            <span class="me-3">{{ countryName }}</span
            ><img
              :src="countryDetails.flags.svg"
              alt=""
              class="float-end"
              style="width: 3rem"
            />
          </h1>
          <hr />
          <!-- <span>Information of prop is {{ props }}</span> -->
          <!-- <p>{{ countryDetails.latlng }}</p> -->
          <!-- <h3>Country Information</h3> -->
          <!-- {{ countryDetails }} -->
          <span v-if="typeof countryDetails.capital == 'array'"
            >Capital: {{ countryDetails.capital[0] }}</span
          >
          <span v-else>Capital: {{ countryDetails.capital }}</span>

          <hr />
          <span>
            Languages:
            <!-- {{ countryDetails.languages }}
            {{ typeof countryDetails.languages }} -->
            <template v-if="typeof countryDetails.languages.length > 1">
              <template
                v-for="(kind, index) of countryDetails.languages"
                :key="index"
              >
                <span
                  v-for="(kind, index) of countryDetails.languages"
                  :key="index"
                  class="badge badge-pill badge-info m-1"
                  style="background-color: #094067"
                  v-if="kind.name"
                >
                  {{ kind.name }}
                </span>
                <span
                  class="badge badge-pill badge-info m-1"
                  style="background-color: #094067"
                  v-else
                >
                  {{ kind }}
                </span>
              </template>
            </template>
            <template v-else>
              <!-- <template> -->
              <span
                v-for="kind of countryDetails.languages"
                :key="kind"
                class="badge badge-pill badge-info m-1"
                style="background-color: #094067"
              >
                {{ kind.name }}
              </span>
              <!-- </template> -->
            </template>
          </span>
          <hr />
          <!-- {{ countryDetails }} -->
          <!-- <p>Translations: {{ countryDetails.translations }}</p> -->
          <!-- <hr />
              <p>Currencies: {{ countryDetails.currencies }}</p> -->
          <!-- <hr /> -->
          <!-- <p>Area: {{ countryDetails.area }}</p>
            <hr /> -->
          <!-- <p>LatLong : {{ countryDetails.latlng }}</p> -->
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
    </div>

    <section class="destinations">
      <div class="row">
        <div class="col-md-6 order-md-first col-12 order-md-first">
          <h2 class="mt-3 text-white">Destinations</h2>
          <DestinationList
            @selectedFromList="getSelection"
            @modalInfo="updateDestInfo"
            :list="countryDestinations"
            :page="pageNumber"
            :countryDetails="countryPacket"
          />
        </div>
        <div class="col-md-6 col-12">
          <!-- {{ selectedInfo }} -->
          <h2 class="mt-3 text-white">Hotels and Accomodation</h2>
          <span v-if="getAccom || firstDestination">
            <span v-if="getAccom">
              <!-- {{getAccom}} -->
              <AccommodationList
                @modalInfo="updateAccomInfo"
                :accomDetails="selectedInfo"
                :countryDetails="countryPacket"
              />
            </span>
            <span v-else>
              <!-- {{ firstDestination }} -->
              <AccommodationList
                @modalInfo="updateAccomInfo"
                :accomDetails="firstDestination"
                :countryDetails="countryPacket"
              />
            </span>
          </span>
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
    v-if="user"
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

.countryimage {
  height: 600px;
}
</style>

<script>
import { Loader } from "@googlemaps/js-api-loader";
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
    onMounted(() => {
      console.log("MOUNTED, SCROLLING NOW", window.scrollTo(0, 0));
      document.body.scrollTop = 0;
    });
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
        userName: user.value.displayName,
        shareStatus: false,
      });
      if (error.value == null) {
        // alert(`You're one step closer to ${countryName.value}!`);
      } else alert(error.value);
    };

    const router = useRouter();

    // selection stuff
    const selectedInfo = ref(null);
    const getAccom = ref(null);

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
