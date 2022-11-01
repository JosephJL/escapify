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
        />
        <div v-else class="d-flex" style="height: 18rem; width: 100%">
          <div
            class="spinner-grow text-light mx-auto align-self-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <h1>{{ countryName }}</h1>
        <!-- <span>Information of prop is {{ props }}</span> -->
        <p>{{ countryDetails.latlng }}</p>
        <h3>Country Information</h3>
        <p>{{ countryDetails }}</p>
        <button
          v-if="user"
          data-bs-toggle="modal"
          data-bs-target="#TripForm"
          class="btn btn-info"
        >
          Add to Trip
        </button>
      </div>
    </section>
    <section class="hotelSection">
      <!-- <AccommodationList /> -->
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
        <div class="modal-content">
          <h2>Name your new trip!</h2>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import AccommodationList from "../components/accommodation/AccommodationList.vue";
import getPlacePhoto from "../composables/image/getPhotos.js";

// Current user
import getUser from "../composables/getUser";

// Collection
import useCollection from "../composables/collection/useCollection";

export default {
  components: { AccommodationList, TripModal },
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
      countryDetails.name.official;
      countryName.value = countryDetails.name.official;
      load(countryName.value);
    } else {
      countryName.value = countryDetails.value.name;
      load(countryName.value);
    }

    const { addDocument, error } = useCollection();

    const addNewTrip = () => {
      addDocument({
        name: countryName.value,
        capital: countryDetails.value.capital,
        userId: user.value.uid,
      });
      if (error.value == null) {
        alert("Country added to trips!");
      } else alert(error.value);
    };

    return {
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
