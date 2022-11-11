<template>
  <div>
    <h1>Plan your trip here</h1>

    Select your start date:
    <DatePicker
      :readonly="true"
      format="MMM/D/YYYY"
      width="300px"
      name="date"
      @selectedDate="toggleStart"
    />

    Select your end date:
    <DatePicker
      :readonly="true"
      format="MMM/D/YYYY"
      width="300px"
      name="date"
      @selectedDate="toggleEnd"
    />

    <div>
      <div
        @dragover.prevent=""
        @drop.prevent="drop($event)"
        v-for="(item, index) in destinations"
        :key="item[0]"
        draggable="true"
        @dragstart="dragStart($event, index)"
        @dragend="dragEnd($event)"
      >
        <div class="card card-body" style="width: 100%">
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
    <div class="row">
      <template v-for="(item, index) in duration" :key="index">
        <div class="col-3" @dragover.prevent="" @drop.prevent="drop($event)">
          {{ item }}
        </div>
      </template>
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
  setup() {
    // const getList = (list) => {
    //   return stories.value.filter((stories) => stories.list == list);
    // };

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
      startDate.value = arg;
      console.log("start is toggled!", startDate.value);
    };

    const toggleEnd = (arg) => {
      endDate.value = arg;
      console.log("end is toggled!", endDate.value);
    };

    watch(
      () => startDate.value,
      () => {
        console.log("startDate has changed!", typeof startDate.value);
        if (startDate.value != null && endDate.value != null) {
          console.log("dates have been set!");
          getDates(startDate.value, endDate.value);
        }
      }
    );

    watch(
      () => endDate.value,
      () => {
        console.log("endDate has changed!", typeof endDate.value);
        if (startDate.value != null && endDate.value != null) {
          console.log("dates have been set!");
          getDates(startDate.value, endDate.value);
        }
      }
    );

    const getDates = (startDate, stopDate) => {
      console.log("get dates! start is", startDate, "end is", stopDate);
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        console.log("current is", currentDate, "type is ", typeof currentDate);
        duration.value.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      console.log("duration is,", duration.value, "type is", typeof duration);
    };

    return { dragStart, dragEnd, drop, toggleStart, toggleEnd, duration };
  },
};
</script>
