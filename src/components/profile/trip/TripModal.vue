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
              <span>{{ document[1].tripName }} in {{ document[1].name }}</span>
              <button
                @click.prevent="handleDestination(document)"
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
                placeholder="Create a new trip!"
                aria-describedby="button-addon2"
              />
              <button
                @click.prevent="addNewTrip"
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
import queryCollectionById from "../../../composables/collection/queryCollection";
import useNestedCollection from "../../../composables/collection/useNestedCollection";
import useCollection from "../../../composables/collection/useCollection";
import getUser from "../../../composables/getUser";
import { ref, toRef, watch } from "vue";

export default {
  props: { currDestination: Object, countryDetails: Object, type: String },
  setup(props) {
    const { user } = getUser();

    watch(
      () => props.currDestination,
      () => {
        console.log("CURRDESTIONATION UPDATED", props.currDestination);
        destData.value = props.currDestination;
        console.log("destData is NOWWWWW", destData.value);
        if (collectionName.value == "destinations") {
          console.log("destinationData is", destData.value);
          destinationInfo.value = {
            name: destData.value.name,
            latlng: [destData.value.lat, destData.value.lon],
            xid: destData.value.xid,
            kinds: destData.value.kinds,
            userId: user.value.uid,
          };
          console.log("Destination INFO IS", destData.value);
        } else if (collectionName.value == "hotels") {
          destinationInfo.value = {
            name: destData.value.name,
            address: destData.value.address,
            rating: destData.value.rating,
            userId: user.value.uid,
          };
          console.log("Hotel INFO IS", destinationInfo.value);
        }
      }
    );
    watch(
      () => props.type,
      () => {
        console.log("CURRDESTIONATION UPDATED", props.type);
        collectionName.value = props.type;
      }
    );

    console.log("received currDestination,", props.currDestination);
    console.log("received collectionName,", props.type);
    console.log("received countryDetails,", props.countryDetails);

    //get current trips of user
    const { documents, error, loadCollection } = queryCollectionById();
    loadCollection("trips", user.value.uid);

    //load in update tripId function
    const { addHotel, addDestination, nestedError } = useNestedCollection();

    //destination data
    const destData = ref(null);
    destData.value = props.currDestination;
    const collectionName = ref("");
    collectionName.value = props.type;

    const destinationInfo = ref(null);

    console.log("PROPS TYPE IS", props.type);

    if (collectionName.value == "destinations") {
      console.log("destinationData is", destData.value);
      destinationInfo.value = {
        name: destData.value.properties.name,
        latlng: [
          destData.value.geometry.coordinates["0"],
          destData.value.geometry.coordinates["1"],
        ],
        xid: destData.value.properties.xid,
        kinds: destData.value.properties.kinds,
        type: destData.value.type,
        userId: user.value.uid,
      };
      console.log("Destination INFO IS", destData.value);
    } else if (collectionName.value == "hotels") {
      destinationInfo.value = {
        name: props.currDestination[0],
        address: props.currDestination[1],
        rating: props.currDestination[2],
        userId: user.value.uid,
      };
      console.log("Hotel INFO IS", destinationInfo.value);
    }

    //get current add
    const handleDestination = (trip) => {
      // console.log("tripId selected is ,", trip[0]);
      // console.log("destination i want to add is ", props.currDestination);
      if (collectionName.value == "destinations") {
        console.log("entering add Destination");
        addDestination(trip[0], destinationInfo.value);
        if (nestedError == null) {
          // alert(`Destination added to trip name:${trip[1].tripName}`);
        } else alert(nestedError);
      } else {
        console.log("entering add HOtel");
        addHotel(trip[0], destinationInfo.value);
        if (nestedError == null) {
          // alert(`Hotel added to trip name:${trip[1].tripName}`);
        } else alert(nestedError);
      }
    };

    const { addDocument, newTripError } = useCollection();

    const tripName = ref("");

    const capital = ref("");
    if (typeof props.countryDetails.capital != "undefined") {
      capital.value = props.countryDetails.capital;
    }

    const addNewTrip = () => {
      console.log("COUNTRY PACKET IS, ", props.countryDetails);
      addDocument({
        name: props.countryDetails.countryName,
        tripName: tripName.value,
        capital: capital.value,
        userId: user.value.uid,
        latlng: props.countryDetails.latlng,
        userName: user.value.displayName,
        shareStatus: false,
      });
      if (error.value == null) {
        // alert(`You're one step closer to ${props.countryDetails.countryName}!`);
        tripName.value = "";
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
