<template>
  <div class="cc-card">
   
  </div>
</template>

<script>
export default {
  props: ["data"],
  setup(props, context) {
    const markDone = () => {
      context.emit("done", props.data);
    };
    return { markDone };
  },
};
</script>
