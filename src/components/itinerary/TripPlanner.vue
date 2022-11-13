<template>
  <div
    class="card card-body bg-dark mb-2 mt-3 rounded-3"
    style="--bs-bg-opacity: 0.5"
    :key="componentKey"
  >
    <div class="card-body">
      <h1><strong class="text-white p-2">Plan your trip here</strong></h1>
      <div class="mt-3">
        <span class="d-flex justify-content-center"
          ><strong
            class="text-white p-2 rounded-3 flex-wrap justify-content-center"
            >Select your travel dates to generate the calendar!</strong
          ></span
        >
      </div>
      <div class="row">
        <div class="d-none d-md-block col-3"></div>
        <div class="text-white p-2 col-md-6">
          Select your start date:
          <DatePicker
            :readonly="true"
            format="MMM/D/YYYY"
            width="100%"
            name="date"
            @selectedDate="toggleStart"
          />
        </div>
        <div class="d-none d-md-block col-3"></div>
      </div>

      <div class="row">
        <div class="d-none d-md-block col-3"></div>
        <div class="text-white p-2 col-md-6">
          Select your end date:
          <DatePicker
            :readonly="true"
            format="MMM/D/YYYY"
            width="100%"
            name="date"
            @selectedDate="toggleEnd"
          />
        </div>
        <div class="d-none d-md-block col-3"></div>
      </div>

      <div>
        <button class="btn btn-warning mx-2" @click="forceRerender">
          Reset
        </button>
      </div>
      <div class="mt-3">
        <span class="d-flex justify-content-center"
          ><strong
            class="text-white p-2 bg-info rounded-3 flex-wrap justify-content-center"
            >Drag and drop your your destinations and hotels into the
            calendar</strong
          ></span
        >
      </div>
    </div>

    <div>
      <div class="row">
        <div class="col-6 col-xl-3 p-2">
          <strong v-if="destinations.length" class="text-white p-2"
            >Here's your destinations</strong
          >
          <div
            class="p-2"
            v-for="(item, index) in destinations"
            :key="item[0]"
            @dragover.prevent=""
            @drop.prevent="drop($event)"
            draggable="true"
            @dragstart="dragStart($event, index)"
            @dragend="dragEnd($event)"
          >
            <div
              class="card card-body"
              style="width: 100%; background-color: lightgreen"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-map"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                  />
                </svg>
              </div>
              <div>{{ item[1].name }}</div>
            </div>
          </div>
        </div>
        <div class="col-6 col-xl-3 p-2">
          <strong v-if="hotels.length" class="text-white p-2"
            >Here's your hotels</strong
          >
          <div
            class="p-2"
            @dragover.prevent=""
            @drop.prevent="drop($event)"
            v-for="(item, index) in hotels"
            :key="item[0]"
            draggable="true"
            @dragstart="dragStart($event, index)"
            @dragend="dragEnd($event)"
          >
            <div
              class="card card-body"
              style="width: 100%; background-color: pink"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house-door"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                  />
                </svg>
              </div>
              <div>{{ item[1].name }}</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-6 p-2">
          <strong v-if="duration.length" class="text-white p-2"
            >Here's your calendar</strong
          >
          <div class="row">
            <template v-for="(item, index) in duration" :key="index">
              <div
                class="col-sm-6 col-md-3 col-lg-4 p-2"
                @dragover.prevent=""
                @drop.prevent="drop($event)"
              >
                <div class="card card-body bg-info">{{ item }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background-color: #3498db;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}

.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
}
</style>

<script>
import { ref, watch } from "vue";
import MyComponent from "./MyComponent.vue";
import DatePicker from "../datepicker/DatePicker.vue";

export default {
  components: { MyComponent, DatePicker },
  props: { destinations: Object, hotels: Object },
  setup(props) {
    // const getList = (list) => {
    //   return stories.value.filter((stories) => stories.list == list);
    // };
    const componentKey = ref(0);
    const forceRerender = () => {
      componentKey.value += 1;
      duration.value = [];
      startDate.value = null;
      endDate.value = null;
    };

    const dragged = ref(null);

    const dragStart = (e, ind) => {
      e.dataTransfer.setData("text/plain", ind);
      e.target.style.opacity = 0.5;
      dragged.value = e.target;
    };
    const dragEnd = (e) => {
      e.target.style.opacity = 1;
    };
    const drop = (e) => {
      dragged.value.style.opacity = 1;
      dragged.value.parentNode.removeChild(dragged.value);
      e.target.appendChild(dragged.value);
    };

    const startDate = ref(null);
    const endDate = ref(null);
    const duration = ref([]);

    const toggleStart = (arg) => {
      console.log("CHECK VALUES ", startDate.value, endDate.value);
      startDate.value = arg;
      console.log("start is toggled!", startDate.value);
    };

    const toggleEnd = (arg) => {
      console.log("CHECK VALUES ", startDate.value, endDate.value);
      endDate.value = arg;
      console.log("end is toggled!", endDate.value);
    };

    const destinationList = ref(props.destinations);
    const hotelList = ref(props.hotels);

    watch(
      () => startDate.value,
      () => {
        console.log("startDate has changed!", typeof startDate.value);
        if (startDate.value != null && endDate.value != null) {
          destinationList.value = [];
          hotelList.value = [];
          console.log("dates have been set!", startDate.value, endDate.value);
          getDates(startDate.value, endDate.value);
          destinationList.value = props.destinations;
          hotelList.value = props.hotels;
        }
      }
    );

    watch(
      () => endDate.value,
      () => {
        console.log("endDate has changed!", typeof endDate.value);
        if (startDate.value != null && endDate.value != null) {
          destinationList.value = [];
          hotelList.value = [];
          console.log("dates have been set!", startDate.value, endDate.value);
          getDates(startDate.value, endDate.value);
          destinationList.value = props.destinations;
          hotelList.value = props.hotels;
        }
      }
    );

    const getDates = (startDate, stopDate) => {
      duration.value = [];
      console.log("get dates! start is", startDate, "end is", stopDate);
      let currentDate = startDate;
      while (currentDate <= stopDate) {
        // console.log("current is", currentDate, "type is ", typeof currentDate);
        duration.value.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      console.log("duration is,", duration.value, "type is", typeof duration);
    };

    return {
      dragStart,
      dragEnd,
      drop,
      toggleStart,
      toggleEnd,
      duration,
      forceRerender,
      componentKey,
    };
  },
};
</script>
