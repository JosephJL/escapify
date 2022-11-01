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
          <!-- <span>Information of prop is {{ props }}</span> -->
          <p>{{ countryDetails.latlng }}</p>
          <h3>Country Information</h3>
          {{ countryDetails }}
          <p>Capital: {{ countryDetails.capital }}</p>
          <p>Population: {{ countryDetails.population }}</p>
        </div>
      </div>
    </section>
    <section class="destinations">
      <div class="row">
        <div
          class="col"
          style="overflow-x: hidden; overflow-y: auto; height: 800px"
        >
          <div v-for="num in 10" :key="num">
            <div class="card" style="width: 12rem">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8TrKiLe4AdgO-WrPpPB2HyVmZPL9BLMNn2Im2Z8Tdfw&s"
                class="card-img-top"
                alt="..."
                style="width: 10rem; height: 10rem"
              />
              <div class="card-body">
                <h5 class="card-title">Random Destination here!</h5>
                <p class="card-text">Dest info</p>
                <button @click="getDestination()" class="btn btn-info">
                  Go to Destination
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div>Dummy Destination Section</div>
        </div>
      </div>
    </section>
    <section>Country Information</section>
    <section class="destinations">
      <DestinationList />
    </section>

    <section class="hotelSection">
      <AccommodationList />
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

<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import AccommodationList from "../components/accommodation/AccommodationList.vue";
import DestinationList from "../components/destinations/DestinationList.vue";
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

    const { addDocument, error } = useCollection();

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

    const getDestination = () => {
      router.push({
        name: "Destination",
        params: {
          name: "Snoopy Museum",
        },
        // query: {
        //   details: JSON.stringify(props.details),
        // },
      });
    };

    return {
      getDestination,
      tripName,
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
