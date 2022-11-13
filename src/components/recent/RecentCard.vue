<template>
  <div
    @click="getCountry()"
    v-if="details"
    class="card bg-transparent border-0"
    style="cursor: pointer"
  >
    <img
      id="recentImage"
      v-if="imageLoading"
      :src="returnURl"
      class="card-img-top rounded"
      alt="image here"
      style="width: 100%"
    />
    <div v-else id="recentImage" class="d-flex" style="width: 100%">
      <div
        class="spinner-grow text-light mx-auto align-self-center"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card-body text-white">
      <h5 class="card-title">{{ countryName }}</h5>
      <p class="card-text">{{ details.region }}</p>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
  height: 18rem;
}
.card {
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  margin-bottom: 10px;
}
.card:hover {
  transform: scale(1.05);
}

@media (min-width: 767px) {
  #recentImage {
    height: 14rem;
  }
}
@media (max-width: 767px) {
  #recentImage {
    height: 10rem;
  }
}
</style>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import getPlacePhoto from "../../composables/image/getPhotos.js";
import { Timestamp } from "@firebase/firestore";
import getUser from "../../composables/getUser";
import useCollection from "../../composables/collection/useCollection";

export default {
  props: { details: Object },
  setup(props) {
    let image = ref(null);
    let countryDetails = JSON.parse(JSON.stringify(props.details));

    const countryName = ref(null);

    const { imageLoading, returnURl, load } = getPlacePhoto();

    console.log(returnURl);

    if (typeof countryDetails.name == "object") {
      console.log("this is a JSON", countryDetails);
      countryDetails.name.official;
      countryName.value = countryDetails.name.official;
      load(countryDetails.name.official);
    } else {
      countryName.value = countryDetails.name;
      load(countryDetails.name);
      console.log("image is now", returnURl);
    }

    console.log("country details is", JSON.stringify(props.details));

    const router = useRouter();

    const { user } = getUser();

    const { addClick } = useCollection();

    const getCountry = () => {
      console.log("Getting country", props.details);
      var countryInfo = props.details;
      countryInfo.createdAt = Timestamp.now().toDate();
      if (user.value) {
        countryInfo.userId = user.value.uid;
        addClick(countryInfo, countryName.value, user.value.uid);
      }
      console.log("CountryInfo is", countryInfo);
      router.push({
        name: "Country",
        params: {
          name: countryDetails["name"],
        },
        query: {
          details: JSON.stringify(props.details),
        },
      });
    };

    return { returnURl, imageLoading, getCountry, countryName };
  },
};
</script>
