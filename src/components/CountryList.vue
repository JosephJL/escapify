<template>
  <div v-for="country in list" :key="country">
    <div class="card" style="width: 18rem">
      <img src="" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ country.name }}</h5>
        <p class="card-text">
          {{ country.continent }}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object,
  },
  setup(props) {},
};
</script>
