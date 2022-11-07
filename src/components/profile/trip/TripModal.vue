<template>
  <div
    id="TripModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <h2>Your current trips</h2>
        <ul class="list-group">
          <template v-for="(document, index) in documents" :key="index">
            <li class="list-group-item border-0">
              {{ document[1].tripName }} in {{ document[1].name }}
              <button
                @click="handleDestination(document)"
                class="btn btn-primary float-end"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </li>
          </template>
          <li class="list-group-item border-0">
            <div class="input-group mt-2">
              <input
                type="text"
                class="form-control"
                v-model="tripName"
                placeholder="Add new trip here!"
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
          </li>
        </ul>
        {{ nestedError }}
      </div>
    </div>
  </div>
</template>

<script>
import queryCollectionById from "../../../composables/collection/queryCollection";
import useNestedCollection from "../../../composables/collection/useNestedCollection";
import useCollection from "../../../composables/collection/useCollection";
import getUser from "../../../composables/getUser";
import { ref } from "vue";

export default {
  props: { currDestination: Object, countryDetails: Object },
  setup(props) {
    const { user } = getUser();

    // console.log("received desintatin,", props.currDestination);
    //get current trips of user
    const { documents, error, loadCollection } = queryCollectionById();
    loadCollection("trips", user.value.uid);

    //load in update tripId function
    const { addHotel, addDestination, nestedError } = useNestedCollection();

    //destination data
    const destData = ref(null);
    destData.value = props.currDestination;

    //get current add
    const handleDestination = (trip) => {
      // console.log("tripId selected is ,", trip[0]);
      // console.log("destination i want to add is ", props.currDestination);
      addDestination(trip[0], {
        name: destData.value.properties.name,
        latlng: [
          destData.value.geometry.coordinates["0"],
          destData.value.geometry.coordinates["1"],
        ],

        xid: destData.value.properties.xid,
        kinds: destData.value.properties.kinds,
        type: destData.value.type,
        userId: user.value.uid,
      });
      if (nestedError == null) {
        alert(
          "Destination added to trip name: ",
          props.currDestination.properties.name
        );
      } else alert(nestedError);
    };

    const { addDocument, newTripError } = useCollection();

    const tripName = ref("");

    const addNewTrip = () => {
      console.log("COUNTRY PACKET IS, ", props.countryDetails);
      addDocument({
        name: props.countryDetails.countryName,
        tripName: tripName.value,
        capital: props.countryDetails.capital,
        userId: user.value.uid,
        latlng: props.countryDetails.latlng,
      });
      if (error.value == null) {
        alert(`You're one step closer to ${props.countryDetails.countryName}!`);
      } else alert(error.value);
    };

    return {
      documents,
      error,
      handleDestination,
      nestedError,
      tripName,
      addNewTrip,
    };
  },
};
</script>
