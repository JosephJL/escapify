<template>
  <div class="card p-3 text-center">
    <form @submit.prevent="handleSubmit">
      <slot name="close"></slot>
      <div class="mb-3">
        <span class="fs-5 fw-bold">Log In</span>
        <hr style="margin: 15px -20px 20px" />
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          required
          placeholder="Enter Email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          placeholder="Enter Passcode"
          v-model="password"
        />
        <div class="error">
          {{ error }}
        </div>
      </div>
      <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary btn-lg">Log In</button>
      </div>
    </form>
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../composables/useLogin";

export default {
  setup(props, context) {
    const email = ref("");
    const password = ref("");

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        context.emit("login");
        window.location.reload();
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>
