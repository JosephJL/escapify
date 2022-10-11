<template>
  <div class="container-fluid">
    <h1>Country Name here {{ name }}</h1>
    <span>Information of prop is {{ props }}</span>
  </div>
</template>

<script>
import ref, { toRefs } from "vue";

export default {
  props: {
    name: String,
  },
  setup(props) {
    console.log(props.name);
    const { name } = toRefs(props);

    return { name };
  },
};
</script>
