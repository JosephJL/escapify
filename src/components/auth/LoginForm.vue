<template>
  <div class="card mx-auto text-start p-3 col-md-5 col-lg-4 my-auto">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <h1 class="fw-bold">Sign In</h1>
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
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>
